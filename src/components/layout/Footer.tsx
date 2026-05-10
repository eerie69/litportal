// src/components/layout/Footer.tsx
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Disc, BookOpen, Send, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-secondary/20 mt-20">
      {/* Декоративная линия сверху */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Бренд */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <Disc className="h-10 w-10 text-primary transition-transform duration-700 group-hover:rotate-180" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground tracking-wider">
                  {siteConfig.name}
                </span>
                <span className="text-[0.6rem] text-primary uppercase tracking-[0.3em] -mt-0.5">
                  Est. {currentYear}
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Каталог книг с эксклюзивными главами в Telegram. 
              Читайте бесплатно или подписывайтесь на ранний доступ.
            </p>

            {/* Социальные иконки */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                aria-label="Telegram"
              >
                <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <div className="h-px flex-1 bg-border/50" />
            </div>
          </div>

          {/* Навигация */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Навигация
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/authors', label: 'Авторы' },
                { href: '/books', label: 'Книги' },
                { href: '/genres', label: 'Жанры' },
                { href: '/premium', label: 'Premium-главы' },
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors relative inline-block group uppercase tracking-wider text-[0.7rem]"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Информация */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-foreground uppercase tracking-[0.2em]">
              О проекте
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">❧</span>
                <span>Бесплатные главы на сайте</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">❧</span>
                <span>Эксклюзив в Telegram</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">❧</span>
                <span>Поддержка авторов</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">❧</span>
                <span>Регулярные обновления</span>
              </li>
            </ul>
          </div>

          {/* Telegram CTA */}
          <div className="space-y-4 lg:col-span-1">
            <h4 className="font-serif text-sm font-bold text-foreground uppercase tracking-[0.2em]">
              Эксклюзивный контент
            </h4>
            <div className="vintage-card p-5 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Продвинутые главы доступны только в нашем канале
              </p>
              
              <a
                href={siteConfig.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="vintage-btn inline-flex items-center justify-center w-full gap-2 px-4 py-3 rounded-sm"
              >
                <Send className="h-4 w-4" />
                <span>Перейти в Telegram</span>
                <span className="text-lg leading-none">→</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <Heart className="h-3 w-3 text-primary fill-primary" />
                <span>1.2К+ подписчиков</span>
              </div>
            </div>
          </div>
        </div>

        {/* Винтажный разделитель */}
        <div className="vintage-divider my-10" />

        {/* Копирайт */}
        <div className="text-center space-y-3">
          <p className="font-serif text-sm text-muted-foreground">
            © {currentYear} <span className="text-primary">{siteConfig.name}</span>. 
            Все права принадлежат авторам книг.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Данные собраны вручную с</span>
            <a 
              href="https://royalroad.com" 
              target="_blank" 
              rel="noopener noreferrer nofollow" 
              className="text-primary hover:underline uppercase tracking-wider"
            >
              RoyalRoad
            </a>
          </div>
          
          <p className="text-[0.65rem] text-muted-foreground/60 uppercase tracking-wider">
            Сайт не размещает пиратский контент
          </p>
        </div>

        {/* Декоративный элемент внизу */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-3 opacity-20">
            <div className="h-px w-16 bg-primary" />
            <Disc className="h-5 w-5 text-primary" />
            <div className="h-px w-16 bg-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}