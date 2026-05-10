// src/components/seo/TelegramCTA.tsx
'use client';

import { Send, Lock, BookOpen, Users } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export type TelegramCTAVariant = 'hero' | 'inline' | 'footer' | 'compact';

interface TelegramCTAProps {
  variant?: TelegramCTAVariant;
  authorName?: string;
  bookTitle?: string;
  premiumCount?: number;
  className?: string;
  hideIcon?: boolean;
}

export function TelegramCTA({
  variant = 'inline',
  authorName,
  bookTitle,
  premiumCount,
  className,
  hideIcon = false,
}: TelegramCTAProps) {
  const handleClick = () => {
    // Опционально: аналитика клика
    console.log('[Analytics] Telegram CTA click', { variant, authorName, bookTitle });
  };

  // 🔹 Hero-вариант: для главной страницы
  if (variant === 'hero') {
    return (
      <section className={cn(
        'relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 md:p-8',
        className
      )}>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Lock className="h-4 w-4" />
              <span>Эксклюзивный контент</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold">
              Читайте главы {authorName ? `автора "${authorName}"` : 'раньше всех'}
            </h3>
            <p className="text-muted-foreground max-w-lg">
              Подпишитесь на наш Telegram-канал и получайте доступ к продвинутым главам, 
              бонусным материалам и обновлениям без задержек.
            </p>
            <ul className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Без рекламы
              </li>
              <li className="flex items-center gap-1">
                <Lock className="h-4 w-4" />
                Ранний доступ
              </li>
              <li className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {siteConfig.name} сообщество
              </li>
            </ul>
          </div>
          
          <div className="flex-shrink-0">
            <a
              href={siteConfig.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#229ED9] hover:bg-[#1b8fc4] text-white rounded-xl font-semibold transition-colors shadow-lg shadow-[#229ED9]/25"
            >
              {!hideIcon && <Send className="h-5 w-5" />}
              <span>Подписаться в Telegram</span>
            </a>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Бесплатно • Отмена в любой момент
            </p>
          </div>
        </div>
        
        {/* Декоративный фон */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#229ED9]/10 rounded-full blur-3xl" />
      </section>
    );
  }

  // 🔹 Inline-вариант: для страниц книг/авторов
  if (variant === 'inline') {
    return (
      <div className={cn(
        'flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-xl bg-muted/30',
        className
      )}>
        <div className="flex-shrink-0 p-2 bg-[#229ED9]/10 rounded-lg">
          <Send className="h-5 w-5 text-[#229ED9]" />
        </div>
        
        <div className="flex-1 min-w-0 space-y-1">
          <p className="font-medium text-sm">
            {premiumCount 
              ? `🔒 ${premiumCount} продвинутых глав доступно в Telegram`
              : authorName 
                ? `Эксклюзивные главы "${authorName}" — только в канале`
                : bookTitle
                  ? `Продолжение "${bookTitle}" уже в Telegram`
                  : 'Подпишитесь на канал для доступа к эксклюзивным главам'
            }
          </p>
          <p className="text-xs text-muted-foreground">
            Без рекламы • Ранний доступ • Бонусные материалы
          </p>
        </div>
        
        <a
          href={siteConfig.telegramChannel}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#229ED9] hover:bg-[#1b8fc4] text-white rounded-lg font-medium text-sm transition-colors"
        >
          <Send className="h-4 w-4" />
          <span>Перейти</span>
        </a>
      </div>
    );
  }

  // 🔹 Footer-вариант: для подвала сайта — винтажный стиль
  if (variant === 'footer') {
    return (
      <div className={cn(
        'vintage-card relative overflow-hidden',
        'bg-gradient-to-br from-secondary/80 via-card to-secondary/60',
        'border border-primary/20',
        'p-6 md:p-8 rounded-sm',
        className
      )}>
        {/* Декоративные элементы фона */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary rounded-br-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/10 rounded-full" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Левая часть: иконка + текст */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Винтажная иконка в рамке */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-sm blur-md animate-pulse" />
              <div className="relative p-3 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-sm">
                <Send className="h-6 w-6 text-primary" />
              </div>
              {/* Декоративные уголки */}
              <span className="absolute -top-1 -left-1 text-[0.5rem] text-primary/60">❧</span>
              <span className="absolute -bottom-1 -right-1 text-[0.5rem] text-primary/60">❧</span>
            </div>

            {/* Текст */}
            <div className="space-y-1">
              <p className="font-serif text-lg md:text-xl font-semibold text-foreground tracking-tight">
                Не пропустите новые главы
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Подпишитесь на уведомления в Telegram —{' '}
                <span className="text-primary font-medium">эксклюзивный контент</span> первым
              </p>
            </div>
          </div>

          {/* Правая часть: кнопка + бонус */}
          <div className="flex flex-col items-center md:items-end gap-3">
            
            {/* Кнопка в винтажном стиле */}
            <a
              href={siteConfig.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className={cn(
                'vintage-btn relative group',
                'inline-flex items-center gap-2.5 px-6 py-3 rounded-sm',
                'min-w-[180px] justify-center',
                'shadow-lg hover:shadow-primary/10 transition-all duration-300'
              )}
            >
              {/* Эффект блика при наведении */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <Send className="h-4.5 w-4.5 relative z-10" />
              <span className="font-serif text-sm uppercase tracking-wider relative z-10">
                Подписаться
              </span>
              <span className="text-lg leading-none relative z-10 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </a>

            {/* Бонус-подсказка */}
            <div className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="uppercase tracking-wider">
               Ранний доступ для подписчиков
              </span>
            </div>
          </div>
        </div>

        {/* Нижняя декоративная линия */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    );
  }

  // 🔹 Compact-вариант: для карточек, сайдбаров
  return (
    <a
      href={siteConfig.telegramChannel}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 bg-[#229ED9] hover:bg-[#1b8fc4] text-white rounded-lg font-medium text-sm transition-colors',
        className
      )}
    >
      {!hideIcon && <Send className="h-4 w-4" />}
      <span>Telegram</span>
      {premiumCount !== undefined && premiumCount > 0 && (
        <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
          +{premiumCount}
        </span>
      )}
    </a>
  );
}