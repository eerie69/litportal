// src/components/catalog/BooksFilter.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react'; 
import { Book } from '@/lib/types';
import { BookCard } from './BookCard';

interface BooksFilterProps {
  books: Book[];
}

export function BooksFilter({ books }: BooksFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Получаем все уникальные жанры
  const allGenres = Array.from(
    new Set(books.flatMap(book => book.genres || []))
  ).sort();

  useEffect(() => {
    let filtered = [...books];

    // Фильтр по поиску
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.genres?.some(g => g.toLowerCase().includes(term))
      );
    }

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter(book => book.status === statusFilter);
    }

    // Фильтр по жанру
    if (genreFilter !== 'all') {
      filtered = filtered.filter(book => book.genres?.includes(genreFilter));
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, statusFilter, genreFilter]);

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Поиск по названию, автору или жанру..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Все статусы</option>
            <option value="ongoing">Продолжается</option>
            <option value="completed">Завершена</option>
            <option value="hiatus">На паузе</option>
            <option value="dropped">Заморожена</option>
          </select>
          
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Все жанры</option>
            {allGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setGenreFilter('all');
            }}
            className="px-3 py-2 rounded-lg border bg-muted text-sm hover:bg-muted/80 transition-colors"
          >
            Сбросить
          </button>
        </div>
      </div>

      {/* Результаты */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Книги не найдены</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} variant="grid" />
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Показано {filteredBooks.length} из {books.length} книг
          </div>
        </>
      )}
    </div>
  );
}