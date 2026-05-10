// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Search, Moon, Sun, Menu, X, Disc } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { MobileSearchModal } from '@/components/ui/MobileSearchModal';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); 
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Монтирование и скролл
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Автофокус при открытии поиска
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Обработка поиска
  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    
    setIsSearchOpen(false);
    window.location.href = `/books?search=${encodeURIComponent(query)}`;
  }, [searchQuery]);

  // Обработка нажатия Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Переключение темы
  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Открытие/закрытие поиска
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  // Закрытие поиска при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Блокировка скролла при открытом модальном окне
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSearchOpen]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-lg' 
          : 'bg-transparent border-b border-border/50'
      }`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Disc className="h-8 w-8 text-primary transition-transform duration-700 group-hover:rotate-180" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-foreground tracking-wider">
                {siteConfig.name}
              </span>
              <span className="text-[0.6rem] text-primary uppercase tracking-[0.3em] -mt-1">
                Est. 2026
              </span>
            </div>
          </Link>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-8">
            {['Авторы', 'Книги', 'Жанры', 'Premium'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase() === 'авторы' ? 'authors' : item.toLowerCase() === 'книги' ? 'books' : item.toLowerCase() === 'жанры' ? 'genres' : 'premium'}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group uppercase tracking-wider text-[0.7rem]"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Поиск + действия */}
          <div className="flex items-center gap-4">
            {/* Десктопный раскрывающийся поиск */}
            <div className="hidden sm:flex items-center">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm placeholder:text-muted-foreground/50"
                    autoComplete="off"
                  />
                </form>
              ) : (
                <button
                  aria-label="Поиск"
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                  onClick={toggleSearch}
                >
                  <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              )}
            </div>

            {/* Переключение темы */}
            {mounted && (
              <button
                aria-label="Переключить тему"
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-600" />
                )}
              </button>
            )}

            {/* Telegram кнопка */}
            <a
              href={siteConfig.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 vintage-btn rounded-sm"
            >
              <span>Telegram</span>
            </a>

            {/* ✅ Мобильная кнопка поиска - открывает красивое модальное окно */}
            <button
              aria-label="Поиск"
              className="sm:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors group"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            {/* Мобильное меню */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col gap-4">
                {['Авторы', 'Книги', 'Жанры', 'Premium'].map((item) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase() === 'авторы' ? 'authors' : item.toLowerCase() === 'книги' ? 'books' : item.toLowerCase() === 'жанры' ? 'genres' : 'premium'}`}
                    className="text-base font-serif font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <div className="pt-4 border-t border-border">
                <a
                  href={siteConfig.telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-3 vintage-btn rounded-sm"
                >
                  Подписаться на канал
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Мобильное модальное окно поиска */}
      <MobileSearchModal 
        isOpen={isMobileSearchOpen} 
        onClose={() => setIsMobileSearchOpen(false)} 
      />
    </>
  );
}