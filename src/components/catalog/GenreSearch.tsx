'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { KeyboardEvent } from 'react';

interface GenreData {
  genre: string;
  keywords?: string[];
}

interface GenreSearchProps {
  genres: GenreData[];
}

export function GenreSearch({ genres }: GenreSearchProps) {
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value.toLowerCase();
      const match = genres.find(g => 
        g.genre.toLowerCase().includes(query) || 
        g.keywords?.some(k => k.includes(query))
      );
      if (match) {
        router.push(`/genres/${encodeURIComponent(match.genre)}`);
      }
    }
  };

  return (
    <div className="max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Поиск жанра: LitRPG, Fantasy, Isekai..."
          className="w-full pl-11 pr-4 py-3 rounded-sm border border-border bg-card/50 focus:outline-none vintage-focus transition-all"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}