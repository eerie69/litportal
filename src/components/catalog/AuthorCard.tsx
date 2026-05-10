// src/components/catalog/AuthorCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book, ArrowRight, Send } from 'lucide-react';
import { Author } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AuthorCardProps {
  author: Author;
  booksCount?: number;
  variant?: 'default' | 'compact';
  className?: string;
  telegramChannel?: string;
}

const getDiceBearAvatar = (seed: string) => {
  const cleanSeed = encodeURIComponent(seed.trim().replace(/[^a-zA-Z0-9]/g, '-'));
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${cleanSeed}&backgroundColor=c0aede,d1d4f9&scale=90`;
};

export function AuthorCard({ 
  author, 
  booksCount = 0, 
  variant = 'default',
  className,
  telegramChannel 
}: AuthorCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasBooks = booksCount > 0;
  const showDiceBear = !author.avatarUrl || imageError;
  const diceBearUrl = getDiceBearAvatar(author.name || author.slug);

  // Fallback-аватар если всё не загрузилось
  const LetterAvatar = ({ name, size }: { name: string; size: number }) => (
    <div 
      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5"
      style={{ fontSize: `${size / 3}px` }}
    >
      <span className="font-serif font-bold text-primary">
        {(name || '?').charAt(0).toUpperCase()}
      </span>
    </div>
  );

  if (variant === 'compact') {
    return (
      <Link
        href={`/author/${author.slug}`}
        className={cn(
          'vintage-card p-5 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden',
          className
        )}
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500" />
        
        <div className="flex items-center gap-4 relative">
          <div className="relative flex-shrink-0">
            {showDiceBear ? (
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors bg-gradient-to-br from-primary/10 to-primary/5">
                <img
                  src={diceBearUrl}
                  alt={author.name}
                  width={56}
                  height={56}
                  className="object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5';
                      fallback.innerHTML = `<span class="font-serif text-lg font-bold text-primary">${(author.name || '?').charAt(0).toUpperCase()}</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            ) : (
              <Image
                src={author.avatarUrl}
                alt={author.name}
                width={56}
                height={56}
                className="rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            )}
            {!hasBooks && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-card flex items-center justify-center">
                <Send className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-serif font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {author.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {hasBooks ? (
                <div className="flex items-center gap-1.5">
                  <Book className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {booksCount} {booksCount === 1 ? 'книга' : booksCount < 5 ? 'книги' : 'книг'}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-accent uppercase tracking-wider font-medium flex items-center gap-1">
                  <Send className="h-3 w-3" />
                  Только в Telegram
                </span>
              )}
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <article className={cn('vintage-card group hover:border-primary/50 transition-all duration-500 relative overflow-hidden', className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />
      
      <Link href={`/author/${author.slug}`} className="block p-6 space-y-4 relative">
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            {showDiceBear ? (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors bg-gradient-to-br from-primary/10 to-primary/5 ring-4 ring-muted/20">
                <img
                  src={diceBearUrl}
                  alt={author.name}
                  width={80}
                  height={80}
                  className="object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5';
                      fallback.innerHTML = `<span class="font-serif text-2xl font-bold text-primary">${(author.name || '?').charAt(0).toUpperCase()}</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            ) : (
              <Image
                src={author.avatarUrl}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors ring-4 ring-muted/20"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            )}
            {!hasBooks && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent rounded-full border-2 border-card flex items-center justify-center shadow-lg">
                <Send className="h-3.5 w-3.5 text-white" />
              </div>
            )}
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xl font-semibold truncate group-hover:text-primary transition-colors">
              {author.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {hasBooks ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Book className="h-4 w-4 text-primary" />
                  <span className="uppercase tracking-wider text-[0.7rem]">
                    {booksCount} {booksCount === 1 ? 'книга' : booksCount < 5 ? 'книги' : 'книг'}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-accent uppercase tracking-wider font-medium flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Эксклюзив в Telegram
                </span>
              )}
            </div>
          </div>
        </div>

        {author.bio && author.bio !== 'Автор на Royal Road' && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {author.bio}
          </p>
        )}

        <div className="pt-4 border-t border-border/50">
          {!hasBooks && telegramChannel ? (
            <a
              href={telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 vintage-btn rounded-sm text-xs w-full justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Send className="h-3.5 w-3.5" />
              <span>Книги в Telegram</span>
            </a>
          ) : author.royalRoadUrl ? (
            <span className="inline-flex items-center text-xs text-primary/80 hover:text-primary transition-colors uppercase tracking-wider group/link">
              Открыть профиль автора →
            </span>
          ) : null}
        </div>
      </Link>
    </article>
  );
}