'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import { BookCard } from '@/components/catalog/BookCard';
import type { Book } from '@/lib/types';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Статусы для фильтрации
const statusOptions = [
  { value: 'all', label: 'Все' },
  { value: 'ongoing', label: 'Продолжается' },
  { value: 'completed', label: 'Завершена' },
  { value: 'hiatus', label: 'На паузе' },
  { value: 'dropped', label: 'Заморожена' },
];

export default function BooksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  
  // Состояния для данных и фильтрации
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // загрузка данных через API вместо прямой функции
  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  // Фильтрация при изменении фильтров или данных
  useEffect(() => {
    let filtered = [...books];

    // Фильтр по поиску
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(book =>
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

  // Синхронизация searchTerm с URL при загрузке
  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);

  // Обновление URL при изменении поиска
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.push(`/books?${params.toString()}`);
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setGenreFilter('all');
    router.push('/books');
  };

  // Сортируем книги
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const aHasPremium = (a as any).premiumCount || 0;
    const bHasPremium = (b as any).premiumCount || 0;
    if (aHasPremium !== bHasPremium) return bHasPremium - aHasPremium;
    return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
  });

  // Собираем все уникальные жанры
  const allGenres = Array.from(
    new Set(books.flatMap(book => book.genres || []))
  ).sort();

  // Индикатор загрузки
  if (loading) {
    return (
      <div className="space-y-8">
        <header className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Все книги</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Загрузка...
            </p>
          </div>
        </header>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Загрузка книг...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Хедер */}
      <header className="space-y-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>
        
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Все книги
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {books.length} {books.length === 1 ? 'книга' : books.length < 5 ? 'книги' : 'книг'} в каталоге
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Поиск по названию, автору или жанру..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
              onClick={resetFilters}
              className="px-3 py-2 rounded-lg border bg-muted text-sm hover:bg-muted/80 transition-colors"
            >
              Сбросить
            </button>
          </div>
        </div>

        {/* Индикатор результатов поиска */}
        {(searchTerm || statusFilter !== 'all' || genreFilter !== 'all') && (
          <div className="text-sm text-muted-foreground">
            Найдено {sortedBooks.length} книг
            {searchTerm && ` по запросу "${searchTerm}"`}
          </div>
        )}
      </header>

      {/* Сетка книг */}
      {sortedBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Книги не найдены</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-primary hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedBooks.map((book: Book) => (
              <BookCard
                key={book.id}
                book={book}
                variant="grid"
              />
            ))}
          </div>
          
          <div className="text-center text-sm text-muted-foreground pt-4">
            Показано {sortedBooks.length} из {books.length} книг
          </div>
        </>
      )}

      {/* Навигация */}
      <nav className="flex justify-between pt-6 border-t">
        <Link 
          href="/" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          ← На главную
        </Link>
        <Link 
          href="/authors" 
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Все авторы →
        </Link>
      </nav>
    </div>
  );
}