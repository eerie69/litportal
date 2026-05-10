// src/components/ui/BookCover.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookCoverProps {
  title: string;
  coverUrl?: string | null;
  className?: string;
  priority?: boolean;
}

// Генерация URL для DiceBear Glass (только на клиенте)
const getDiceBearGlass = (seed: string) => {
  // Очищаем seed для безопасного URL
  const cleanSeed = encodeURIComponent(
    seed.trim()
      .replace(/[^a-zA-Zа-яА-Я0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50)
  );
  return `https://api.dicebear.com/9.x/glass/svg?seed=${cleanSeed}&backgroundColor=2d2420,3d342f,5c4a3d&backgroundType=gradientLinear&scale=90&radius=10`;
};

export function BookCover({ title, coverUrl, className, priority = false }: BookCoverProps) {
  const [imgError, setImgError] = useState(false);
  const [glassUrl, setGlassUrl] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  // Генерируем URL только на клиенте
  useEffect(() => {
    setMounted(true);
    setGlassUrl(getDiceBearGlass(title));
  }, [title]);

  const showGlass = !coverUrl || imgError;
  const glassSeed = title || 'book';

  // Пока не смонтировано на клиенте, показываем заглушку
  if (!mounted) {
    return (
      <div className={cn('relative w-full h-full bg-muted animate-pulse', className)}>
        <div className="w-full h-full flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-muted-foreground/30" />
        </div>
      </div>
    );
  }

  if (showGlass) {
    return (
      <div className={cn('relative w-full h-full overflow-hidden bg-gradient-to-br from-muted to-background', className)}>
        <img
          src={glassUrl}
          alt={title}
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
          loading={priority ? 'eager' : 'lazy'}
          onError={(e) => {
            // Если даже DiceBear не загрузился — показываем заглушку
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-background text-muted-foreground';
              fallback.innerHTML = `
                <svg class="h-12 w-12 opacity-30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <span class="text-[0.6rem] uppercase tracking-wider text-center px-2">${title?.slice(0, 15) || 'No Cover'}</span>
              `;
              parent.appendChild(fallback);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full', className)}>
      <Image
        src={coverUrl}
        alt={title}
        fill
        className="object-cover transition-opacity duration-300 hover:opacity-90"
        priority={priority}
        onError={() => setImgError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}