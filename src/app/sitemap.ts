// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { loadAndValidateData } from '@/lib/validation';
import { AuthorsArraySchema, BooksArraySchema, ChaptersArraySchema } from '@/lib/validation';
import { siteConfig } from '@/config/site';
import type { Author, Book, Chapter } from '@/lib/types';

// Приоритеты для разных типов страниц
const PRIORITY = {
  HOME: 1.0,
  AUTHOR: 0.9,
  BOOK: 0.8,
  CHAPTER_FREE: 0.7,
  CHAPTER_PREMIUM: 0.6, // Немного ниже, но всё равно индексируем!
} as const;

// Частота обновления
const CHANGE_FREQ: Record<string, MetadataRoute.Sitemap[0]['changeFrequency']> = {
  HOME: 'daily',
  AUTHOR: 'weekly',
  BOOK: 'weekly',
  CHAPTER: 'daily',
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Правильная деструктуризация: извлекаем data из каждого результата
  const [
    { data: authors },
    { data: books },
    { data: chapters }
  ] = await Promise.all([
    loadAndValidateData('authors.json', AuthorsArraySchema),
    loadAndValidateData('books.json', BooksArraySchema),
    loadAndValidateData('chapters.json', ChaptersArraySchema),
  ]);

  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  // Базовые страницы
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.HOME,
      priority: PRIORITY.HOME,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.AUTHOR,
      priority: PRIORITY.AUTHOR,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.BOOK,
      priority: PRIORITY.BOOK,
    },
    {
      url: `${baseUrl}/premium`,
      lastModified: now,
      changeFrequency: CHANGE_FREQ.CHAPTER,
      priority: PRIORITY.CHAPTER_PREMIUM,
    },
  ];

  // Страницы авторов
  const authorPages: MetadataRoute.Sitemap = authors.map((author: Author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: now,
    changeFrequency: CHANGE_FREQ.AUTHOR,
    priority: PRIORITY.AUTHOR,
  }));

  // Страницы книг
  const bookPages: MetadataRoute.Sitemap = books.map((book: Book) => ({
    url: `${baseUrl}/book/${book.slug}`,
    lastModified: now,
    changeFrequency: CHANGE_FREQ.BOOK,
    priority: PRIORITY.BOOK,
  }));

  // Страницы глав (все, включая премиум!)
  const chapterPages: MetadataRoute.Sitemap = chapters.map((chapter: Chapter) => ({
    url: `${baseUrl}/chapter/${chapter.slug}`,
    lastModified: chapter.publishedAt,
    changeFrequency: CHANGE_FREQ.CHAPTER,
    priority: chapter.isPremium ? PRIORITY.CHAPTER_PREMIUM : PRIORITY.CHAPTER_FREE,
  }));

  return [...staticPages, ...authorPages, ...bookPages, ...chapterPages];
}