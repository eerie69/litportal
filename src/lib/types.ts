// src/lib/types.ts
import { z } from 'zod';

// Автор
export const AuthorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  bio: z.string().optional().default(''),
  avatarUrl: z.union([
    z.string().url(),
    z.literal(''),
    z.string().startsWith('/')
  ]).optional().default(''),
  royalRoadUrl: z.union([
    z.string().url(),
    z.literal('')
  ]).optional().default(''),
  stats: z.object({
    followers: z.number().optional().default(0),
    following: z.number().optional().default(0),
    fictionsCount: z.number().optional().default(0),
  }).optional().default({ followers: 0, following: 0, fictionsCount: 0 }),
  fictions: z.array(z.string()).optional().default([]),
});
export type Author = z.infer<typeof AuthorSchema>;

// Книга
export const BookSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  authorSlug: z.string(),
  description: z.string().optional().default(''),
  coverUrl: z.union([
    z.string().url(),
    z.literal(''),
    z.string().startsWith('/')
  ]).optional().default(''),
  genres: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(['ongoing', 'completed', 'hiatus', 'dropped']).optional().default('ongoing'),
  royalRoadUrl: z.union([
    z.string().url(),
    z.literal('')
  ]).optional().default(''),
  lastUpdate: z.string().optional().default(new Date().toISOString()),
  telegramUrl: z.string().optional().default(''),
  stats: z.object({
    views: z.number().optional().default(0),
    followers: z.number().optional().default(0),
    rating: z.number().optional().default(0),
    reviews: z.number().optional().default(0),
    pages: z.number().optional().default(0),
  }).optional().default({ views: 0, followers: 0, rating: 0, reviews: 0, pages: 0 }),
});
export type Book = z.infer<typeof BookSchema>;

// Глава
export const ChapterSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  bookSlug: z.string(),
  number: z.number().optional(),
  contentPreview: z.string(),
  isPremium: z.boolean().optional().default(false),
  telegramUrl: z.string().optional().default(''),
  publishedAt: z.string(),
  wordCount: z.number().optional(),
  royalRoadUrl: z.union([
    z.string().url(),
    z.literal('')
  ]).optional(),
});
export type Chapter = z.infer<typeof ChapterSchema>;

// Omit для исключения поля author из Book
export type BookWithChapters = Omit<Book, 'author'> & {
  chapters: Chapter[];
  author: Author;
};