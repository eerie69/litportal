// src/components/ui/MobileSearchModal.tsx
'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/books?search=${encodeURIComponent(query.trim())}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col h-full">
        {/* Хедер модалки */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-serif text-lg font-semibold text-foreground">Поиск</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Форма поиска */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по авторам, книгам или жанрам..."
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground/50 text-base"
              autoComplete="off"
            />
          </div>
          
          <button
            type="submit"
            className="w-full mt-4 vintage-btn py-3 rounded-lg"
          >
            Найти
          </button>
        </form>

        {/* Популярные запросы */}
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground mb-3">Популярные запросы:</p>
          <div className="flex flex-wrap gap-2">
            {['LitRPG', 'Shirtaloon', 'Fantasy', 'Progression', 'He Who Fights'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  setTimeout(() => {
                    if (inputRef.current) {
                      const event = new Event('submit', { bubbles: true });
                      inputRef.current.form?.dispatchEvent(event);
                    }
                  }, 100);
                }}
                className="px-3 py-1.5 text-xs border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}