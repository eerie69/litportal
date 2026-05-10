// src/components/ui/SearchBar.tsx
'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/books?search=${encodedQuery}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="max-w-xl mx-auto pt-4">
      <form onSubmit={handleSubmit} className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          id="search-input" // ✅ ID сохранен для обратной совместимости
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск: Shirtaloon, LitRPG, He Who Fights..."
          className="w-full pl-12 pr-4 py-4 rounded-sm border border-border bg-card/50 backdrop-blur-sm focus:outline-none vintage-focus transition-all text-foreground placeholder:text-muted-foreground/50"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <div className="absolute inset-0 border border-primary/0 group-focus-within:border-primary/30 rounded-sm transition-colors pointer-events-none" />
      </form>
      
      {/* Подсказки популярных запросов */}
      <div className="flex flex-wrap justify-center gap-2 mt-3 text-[0.65rem] text-muted-foreground">
        <span>Популярное:</span>
        <button 
          type="button"
          onClick={() => handleSearch('LitRPG')}
          className="text-primary hover:underline transition-colors"
        >
          LitRPG
        </button>
        <button 
          type="button"
          onClick={() => handleSearch('Shirtaloon')}
          className="text-primary hover:underline transition-colors"
        >
          Shirtaloon
        </button>
        <button 
          type="button"
          onClick={() => handleSearch('Progression')}
          className="text-primary hover:underline transition-colors"
        >
          Progression
        </button>
        <button 
          type="button"
          onClick={() => handleSearch('Fantasy')}
          className="text-primary hover:underline transition-colors"
        >
          Fantasy
        </button>
      </div>
    </div>
  );
}