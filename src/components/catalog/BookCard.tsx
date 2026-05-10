// src/components/catalog/BookCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Star, Eye, Heart, MessageSquare, ExternalLink } from 'lucide-react';
import { Book } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
  showPremiumBadge?: boolean;
  premiumChaptersCount?: number;
  variant?: 'default' | 'grid' | 'list';
  className?: string;
  telegramChannel?: string;
}

//  URL для DiceBear Glass
const getDiceBearGlass = (seed: string) => {
  const cleanSeed = encodeURIComponent(seed.trim().replace(/[^a-zA-Z0-9]/g, '-'));
  return `https://api.dicebear.com/9.x/glass/svg?seed=${cleanSeed}&backgroundColor=2d2420,3d342f&scale=90`;
};

// Fallback-заглушка если всё не загрузилось
const FallbackCover = ({ title }: { title: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-background text-muted-foreground">
    <BookOpen className="h-10 w-10 opacity-50 mb-2" />
    <span className="text-[0.65rem] uppercase tracking-wider text-center px-2">
      {title?.slice(0, 20)}{title && title.length > 20 ? '...' : ''}
    </span>
  </div>
);

export function BookCard({ 
  book, 
  showPremiumBadge = false,
  premiumChaptersCount = 0,
  variant = 'default',
  className,
  telegramChannel 
}: BookCardProps) {
  const [coverError, setCoverError] = useState(false);
  
  const showGlass = !book.coverUrl || coverError;
  const glassUrl = getDiceBearGlass(book.title || book.slug);
  
  const statusLabels: Record<Book['status'], string> = {
    ongoing: 'Продолжается',
    completed: 'Завершена',
    hiatus: 'На паузе',
    dropped: 'Заморожена', 
  };

  const statusColors: Record<Book['status'], string> = {
    ongoing: 'bg-emerald-900/40 text-emerald-400 border-emerald-800',
    completed: 'bg-blue-900/40 text-blue-400 border-blue-800',
    hiatus: 'bg-amber-900/40 text-amber-400 border-amber-800',
    dropped: 'bg-red-900/40 text-red-400 border-red-800', 
  };

  if (variant === 'list') {
    return (
      <Link
        href={`/book/${book.slug}`}
        className={cn(
          'vintage-card p-6 group hover:border-primary/50 transition-all duration-500 flex gap-6',
          className
        )}
      >
        {/* Обложка */}
        <div className="relative w-32 h-44 flex-shrink-0 rounded-sm overflow-hidden border border-border bg-muted">
          {showGlass ? (
            <>
              {/* DiceBear: обычный <img> */}
              <img
                src={glassUrl}
                alt={book.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full';
                  fallback.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-background text-muted-foreground"><svg class="h-10 w-10 opacity-50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg><span class="text-[0.65rem] uppercase tracking-wider text-center px-2">${(book.title || '').slice(0, 20)}</span></div>`;
                  (e.target as HTMLImageElement).parentElement?.appendChild(fallback);
                }}
              />
            </>
          ) : (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 128px, 128px"
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
              onError={() => setCoverError(true)}
            />
          )}
          
          <span className={cn(
            'absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[0.6rem] uppercase tracking-wider border',
            statusColors[book.status]
          )}>
            {statusLabels[book.status]}
          </span>
        </div>

        {/* Контент */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{book.author}</p>
            </div>
            {book.stats?.rating > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-muted/30 rounded-sm border border-border">
                <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                <span className="text-sm font-medium">{book.stats.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {book.genres?.slice(0, 4).map(g => (
              <span key={g} className="px-2 py-0.5 text-[0.65rem] uppercase tracking-wider bg-muted/50 border border-border rounded-sm text-muted-foreground">
                {g}
              </span>
            ))}
            {book.genres && book.genres.length > 4 && (
              <span className="text-[0.65rem] text-muted-foreground">+{book.genres.length - 4}</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {book.stats?.views > 0 && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {book.stats.views >= 1000 ? `${(book.stats.views / 1000).toFixed(1)}K` : book.stats.views}
                </span>
              )}
              {book.stats?.followers > 0 && (
                <span className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5" />
                  {book.stats.followers}
                </span>
              )}
            </div>
            <span className="text-xs font-serif text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Подробнее →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant
  return (
    <article className={cn('book-card-vintage group', className)}>
      <Link href={`/book/${book.slug}`} className="block">
        <div className="relative aspect-[3/4] rounded-sm overflow-hidden border-b border-border bg-muted">
          {showGlass ? (
            <img
              src={glassUrl}
              alt={book.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-background text-muted-foreground';
                  fallback.innerHTML = `<svg class="h-12 w-12 opacity-50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg><span class="text-[0.65rem] uppercase tracking-wider text-center px-2">${(book.title || 'No Cover').slice(0, 15)}</span>`;
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
              onError={() => setCoverError(true)}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <span className={cn(
              'px-2 py-0.5 rounded-sm text-[0.6rem] uppercase tracking-wider border',
              statusColors[book.status]
            )}>
              {statusLabels[book.status]}
            </span>
            {showPremiumBadge && premiumChaptersCount > 0 && (
              <span className="vintage-badge flex items-center gap-1">
                {premiumChaptersCount}+
              </span>
            )}
          </div>

          {book.stats?.rating > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-sm border border-border z-10">
              <Star className="h-3 w-3 text-primary fill-primary" />
              <span className="text-xs font-medium">{book.stats.rating}</span>
            </div>
          )}
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-serif text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight min-h-[2.5rem]">
            {book.title}
          </h3>
          
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {book.author}
          </p>
          
          <div className="flex flex-wrap gap-1.5">
            {book.genres?.slice(0, 3).map(g => (
              <span 
                key={g} 
                className="px-2 py-0.5 text-[0.6rem] uppercase tracking-wider bg-muted/50 border border-border rounded-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default"
              >
                {g}
              </span>
            ))}
            {book.genres && book.genres.length > 3 && (
              <span className="px-2 py-0.5 text-[0.6rem] text-muted-foreground">
                +{book.genres.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-border/30">
            {book.stats?.views > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                {book.stats.views >= 1000 ? `${(book.stats.views / 1000).toFixed(1)}K` : book.stats.views}
              </span>
            )}
            {book.stats?.followers > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className="h-3.5 w-3.5" />
                {book.stats.followers}
              </span>
            )}
            {book.stats?.reviews > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                {book.stats.reviews}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">
              {book.status === 'ongoing' ? 'Пишется' : '✓ Завершено'}
            </span>
            <span className="text-sm font-serif font-medium text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              О книге →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}