//src/components/catalog/GenreSortSelect.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface GenreSortSelectProps {
  currentSort: string;
}

export function GenreSortSelect({ currentSort }: GenreSortSelectProps) {
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const url = new URL(window.location.href);
    if (value === 'rating') {
      url.searchParams.delete('sort'); // рейтинг — по умолчанию, без параметра
    } else {
      url.searchParams.set('sort', value);
    }
    router.push(url.pathname + url.search);
  };

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <select 
        className="px-3 py-2 rounded-sm border border-border bg-card text-sm focus:outline-none vintage-focus"
        defaultValue={currentSort}
        onChange={handleChange}
      >
        <option value="rating">По рейтингу</option>
        <option value="newest">По дате</option>
        <option value="title">По названию</option>
      </select>
    </div>
  );
}