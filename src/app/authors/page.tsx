// src/app/authors/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, BookOpen } from 'lucide-react';
import { AuthorCard } from '@/components/catalog/AuthorCard';
import { loadAndValidateData } from '@/lib/validation';
import { AuthorsArraySchema, BooksArraySchema } from '@/lib/validation';
import { siteConfig } from '@/config/site';
import type { Author, Book } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Все авторы | Каталог книг Royal Road',
  description: 'Полный список авторов с книгами в каталоге. Найди своего любимого автора и читай главы.',
  openGraph: {
    title: 'Все авторы | Каталог книг Royal Road',
    description: 'Полный список авторов с книгами в каталоге',
    url: `${siteConfig.url}/authors`,
  },
};

export default async function AuthorsPage() {
  // Загружаем данные
  const [{ data: authors }, { data: books }] = await Promise.all([
    loadAndValidateData('authors.json', AuthorsArraySchema),
    loadAndValidateData('books.json', BooksArraySchema),
  ]);

  // Сортируем авторов по имени
  const sortedAuthors = [...authors].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  // Считаем количество книг для каждого автора
  const booksCountByAuthor = books.reduce((acc, book: Book) => {
    acc[book.authorSlug] = (acc[book.authorSlug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Считаем авторов с книгами и без
  const authorsWithBooks = sortedAuthors.filter(a => booksCountByAuthor[a.slug] > 0).length;
  const authorsWithoutBooks = sortedAuthors.length - authorsWithBooks;

  return (
    <div className="space-y-10">
      {/* Хедер */}
      <header className="space-y-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          На главную
        </Link>
        
        <div className="space-y-3">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Все авторы
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <p className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-lg">{sortedAuthors.length}</span>
              <span className="text-sm">
                {sortedAuthors.length === 1 ? 'автор' : sortedAuthors.length < 5 ? 'автора' : 'авторов'} в каталоге
              </span>
            </p>
            {authorsWithBooks > 0 && (
              <span className="hidden md:inline text-border">|</span>
            )}
            {authorsWithBooks > 0 && (
              <p className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-lg">{authorsWithBooks}</span>
                <span className="text-sm">с книгами на сайте</span>
              </p>
            )}
            {authorsWithoutBooks > 0 && (
              <>
                <span className="hidden md:inline text-border">|</span>
                <p className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-accent" />
                  <span className="text-sm">Более {authorsWithoutBooks + 469} книг только в Telegram</span>
                </p>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Сетка авторов */}
      {sortedAuthors.length === 0 ? (
        <div className="vintage-card p-12 text-center space-y-4">
          <Users className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground text-lg">Авторы пока не добавлены</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться на главную
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedAuthors.map((author: Author) => (
            <AuthorCard
              key={author.id}
              author={author}
              booksCount={booksCountByAuthor[author.slug] || 0}
              variant="compact"
              telegramChannel={siteConfig.telegramChannel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Импортируем иконку Send
import { Send } from 'lucide-react';