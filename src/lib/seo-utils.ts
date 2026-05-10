// src/lib/seo-utils.ts
import { Author, Book, Chapter, BookWithChapters } from './types';
import { siteConfig } from '@/config/site';

// Типы Schema.org для JSON-LD
type JsonLdType = 'Person' | 'Book' | 'Chapter' | 'CollectionPage' | 'WebPage';

interface JsonLdBase {
  '@context': 'https://schema.org';
  '@type': JsonLdType;
  [key: string]: unknown;
}

// JSON-LD для страницы автора
export function generateAuthorJsonLd(author: Author, books: Book[]): JsonLdBase & {
  name: string;
  description?: string;
  image?: string;
  url: string;
  sameAs?: string[];
  works: Array<{ '@type': 'Book'; name: string; url: string }>;
} {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    image: author.avatarUrl,
    url: `${siteConfig.url}/author/${author.slug}`,
    sameAs: author.royalRoadUrl ? [author.royalRoadUrl] : undefined,
    works: books.map(book => ({
      '@type': 'Book' as const,
      name: book.title,
      url: `${siteConfig.url}/book/${book.slug}`,
    })),
  };
}

// JSON-LD для страницы книги
export function generateBookJsonLd(book: Book, author: Author, chapters: Chapter[]): JsonLdBase & {
  name: string;
  author: { '@type': 'Person'; name: string; url: string };
  description: string;
  image?: string;
  genre: string[];
  inLanguage: 'ru' | 'en';
  isAccessibleForFree: boolean;
  hasPart: Array<{
    '@type': 'Chapter';
    name: string;
    url: string;
    isAccessibleForFree: boolean;
  }>;
  potentialAction?: {
    '@type': 'ReadAction';
    target: string;
  };
} {
  const premiumCount = chapters.filter(c => c.isPremium).length;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: author.name,
      url: `${siteConfig.url}/author/${author.slug}`,
    },
    description: book.description,
    image: book.coverUrl,
    genre: book.genres,
    inLanguage: 'ru',
    isAccessibleForFree: premiumCount === 0,
    hasPart: chapters.map(chapter => ({
      '@type': 'Chapter',
      name: chapter.title,
      url: `${siteConfig.url}/chapter/${chapter.slug}`,
      isAccessibleForFree: !chapter.isPremium,
    })),
    potentialAction: book.telegramUrl ? {
      '@type': 'ReadAction',
      target: book.telegramUrl,
    } : undefined,
  };
}

// JSON-LD для страницы главы (ключевое: обработка premium)
export function generateChapterJsonLd(
  chapter: Chapter,
  book: Book,
  author: Author
): JsonLdBase & {
  name: string;
  isPartOf: { '@type': 'Book'; name: string; author: { name: string } };
  position?: number;
  isAccessibleForFree: boolean;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: 'https://schema.org/InStock';
    url: string;
    eligibleRegion: { '@type': 'Place'; name: 'Worldwide' };
  };
  description?: string;
} {
  const base = {
    '@context': 'https://schema.org' as const,
    '@type': 'Chapter' as const,
    name: chapter.title,
    isPartOf: {
      '@type': 'Book' as const,
      name: book.title,
      author: { name: author.name },
    },
    position: chapter.number,
    isAccessibleForFree: !chapter.isPremium,
    description: chapter.contentPreview,
  };

  // Если глава премиум — добавляем Offer для поисковиков
  if (chapter.isPremium) {
    return {
      ...base,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'XBT', // Условная валюта для "бесплатно по подписке"
        availability: 'https://schema.org/InStock',
        url: chapter.telegramUrl,
        eligibleRegion: {
          '@type': 'Place',
          name: 'Worldwide',
        },
      },
    };
  }

  return base;
}

// Хелпер для генерации <script type="application/ld+json">
export function renderJsonLd<T extends Record<string, unknown>>(data: T): string {
  return `<script type="application/ld+json">
${JSON.stringify(data, null, 2)}
</script>`;
}