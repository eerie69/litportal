// src/app/author/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Book, ExternalLink, Send, BookOpen, 
  ArrowLeft, ArrowRight, Star 
} from 'lucide-react';
import { loadAndValidateData } from '@/lib/validation';
import { AuthorsArraySchema, BooksArraySchema } from '@/lib/validation';
import { generateAuthorJsonLd } from '@/lib/seo-utils';
import { BookCard } from '@/components/catalog/BookCard';
import { siteConfig } from '@/config/site';
import type { Author, Book as BookType } from '@/lib/types';
import { AuthorAvatar } from '@/components/catalog/AuthorAvatar';

// DiceBear URL — стабильнее работает
const getDiceBearAvatar = (seed: string) => {
  const cleanSeed = seed
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${cleanSeed}&backgroundColor=2d2420,3d342f&scale=90`;
};

// Генерация статических путей (SSG)
export async function generateStaticParams() {
  const { data: authors } = await loadAndValidateData('authors.json', AuthorsArraySchema);
  return authors.map((author: Author) => ({ slug: author.slug }));
}

// Динамические метаданные для SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: authors } = await loadAndValidateData('authors.json', AuthorsArraySchema);
  const author = authors.find((a: Author) => a.slug === slug);
  
  if (!author) {
    return {
      title: 'Автор не найден',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${author.name} — книги и главы`,
    description: author.bio || `Все книги автора ${author.name} в одном каталоге`,
    alternates: {
      canonical: `${siteConfig.url}/author/${author.slug}`,
    },
    openGraph: {
      title: `${author.name} | ${siteConfig.name}`,
      description: author.bio,
      type: 'profile',
    },
  };
}

// Страница автора
export default async function AuthorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // Исправлено: сначала получаем результаты, потом извлекаем .data
  const [authorsRes, booksRes] = await Promise.all([
    loadAndValidateData('authors.json', AuthorsArraySchema),
    loadAndValidateData('books.json', BooksArraySchema),
  ]);
  
  const authors = authorsRes.data;
  const books = booksRes.data;
  
  const author = authors.find((a: Author) => a.slug === slug);
  if (!author) notFound();

  const authorBooks = books.filter((b: BookType) => b.authorSlug === slug);
  const jsonLd = generateAuthorJsonLd(author, authorBooks);
  const hasBooks = authorBooks.length > 0;
  
  // Определяем аватар
  const showDiceBear = !author.avatarUrl;
  const diceBearUrl = getDiceBearAvatar(author.name || author.slug);
  
  // Встроенный SVG-fallback для серверного рендеринга
  const initial = (author.name || '?').charAt(0).toUpperCase();
  const fallbackSvg = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#2d2420"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="serif" font-size="32" font-weight="bold" fill="#c9a961">
        ${initial}
      </text>
    </svg>`
  )}`;

  return (
    <article className="space-y-10">
      {/* JSON-LD для поисковиков */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Хедер автора */}
      <header className="vintage-card p-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          
          {/* Аватар */}
          <div className="relative flex-shrink-0">
           <AuthorAvatar 
    name={author.name || author.slug} 
    avatarUrl={author.avatarUrl} 
    size={96} 
  />
  
  {!hasBooks && (
    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full border-2 border-card flex items-center justify-center shadow-lg">
      <Send className="h-4 w-4 text-white" />
    </div>
  )}
            
            {/* Бейдж "Только в Telegram" если нет книг */}
            {!hasBooks && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full border-2 border-card flex items-center justify-center shadow-lg">
                <Send className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          {/* Инфо об авторе */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {author.name}
              </h1>
              {author.royalRoadUrl && (
                <a
                  href={author.royalRoadUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  RoyalRoad
                </a>
              )}
            </div>
            
            {author.bio && author.bio !== 'Автор на Royal Road' && (
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                {author.bio}
              </p>
            )}
            
            {/* Статистика */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-muted/30 border border-border">
                <Book className="h-4 w-4 text-primary" />
                <span className="font-medium">{authorBooks.length}</span>
                <span className="text-muted-foreground">
                  {authorBooks.length === 1 ? 'книга' : authorBooks.length < 5 ? 'книги' : 'книг'}
                </span>
              </div>
              {!hasBooks && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-accent/10 border border-accent/30">
                  <Send className="h-4 w-4 text-accent" />
                  <span className="text-accent font-medium">Только в Telegram</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA для Telegram если у автора нет книг на сайте */}
        {!hasBooks && (
          <div className="pt-6 border-t border-border">
            <div className="vintage-card p-6 space-y-4 bg-gradient-to-r from-accent/10 to-transparent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Send className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Книги этого автора доступны в Telegram
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Хотя на сайте пока нет книг {author.name}, вы можете найти их в нашем Telegram-канале. 
                    Подписывайтесь, чтобы читать эксклюзивные главы!
                  </p>
                </div>
              </div>
              <a
                href={siteConfig.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="vintage-btn inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-sm"
              >
                <Send className="h-4 w-4" />
                <span>Перейти в Telegram</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Список книг автора */}
      {hasBooks && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              Книги автора
            </h2>
            <span className="text-sm text-muted-foreground px-3 py-1 rounded-sm bg-muted/30 border border-border">
              {authorBooks.length} {authorBooks.length === 1 ? 'книга' : authorBooks.length < 5 ? 'книги' : 'книг'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorBooks.map((book: BookType) => (
              <BookCard 
                key={book.id} 
                book={book} 
                showPremiumBadge 
                premiumChaptersCount={0} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Навигация */}
      <nav className="flex justify-between pt-6 border-t border-border">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          На главную
        </Link>
        <Link 
          href="/authors" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
        >
          Все авторы
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>
    </article>
  );
}