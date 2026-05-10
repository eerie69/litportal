// src/app/book/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, Star, Eye, Heart, MessageSquare, 
  ExternalLink, Send, Calendar, Tag, Bookmark 
} from 'lucide-react';
import { loadAndValidateData } from '@/lib/validation';
import { AuthorsArraySchema, BooksArraySchema } from '@/lib/validation';
import { generateBookJsonLd } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';
import { Book, Author } from '@/lib/types';
import { cn } from '@/lib/utils';
import { BookCover } from '@/components/catalog/BookCover';

// Генерация URL для DiceBear Glass
const getDiceBearGlass = (seed: string) => {
  const cleanSeed = encodeURIComponent(seed.trim().replace(/\s+/g, '-'));
  return `https://api.dicebear.com/9.x/glass/svg?seed=${cleanSeed}&backgroundColor=2d2420,3d342f,5c4a3d&backgroundType=gradientLinear&scale=90&radius=10`;
};

export async function generateStaticParams() {
  const {  data: books } = await loadAndValidateData('books.json', BooksArraySchema);
  return books.map((book: Book) => ({ slug: book.slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const {  data: books } = await loadAndValidateData('books.json', BooksArraySchema);
  const book = books.find((b: Book) => b.slug === slug);
  
  if (!book) return { title: 'Книга не найдена', robots: { index: false } };

  return {
    title: `${book.title} — ${book.author}`,
    description: `${book.description.slice(0, 155)}...`,
    alternates: { canonical: `${siteConfig.url}/book/${book.slug}` },
    openGraph: {
      title: `${book.title} | ${siteConfig.name}`,
      description: book.description,
      type: 'book',
      images: book.coverUrl ? [{ url: book.coverUrl }] : undefined,
    },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [{ data: authors }, { data: books }] = await Promise.all([
    loadAndValidateData('authors.json', AuthorsArraySchema),
    loadAndValidateData('books.json', BooksArraySchema),
  ]);
  
  const book = books.find((b: Book) => b.slug === slug);
  const author = authors.find((a: Author) => a.slug === book?.authorSlug);
  
  if (!book || !author) notFound();

  const jsonLd = generateBookJsonLd(book, author, []);
  const showGlass = !book.coverUrl;
  const glassUrl = getDiceBearGlass(book.title);

  // Форматирование чисел
  const formatNum = (n: number): string => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <article className="space-y-10">
      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      {/* Хедер книги */}
      <header className="vintage-card p-6 md:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Обложка */}
          <div className="relative w-full lg:w-56 aspect-[3/4] rounded-sm overflow-hidden border-2 border-border bg-muted flex-shrink-0">
            <BookCover 
              title={book.title} 
              coverUrl={book.coverUrl} 
              priority 
            />
            
            {/* Статус бейдж */}
            <span className={cn(
              'absolute top-3 left-3 px-3 py-1 rounded-sm text-[0.65rem] uppercase tracking-wider border font-medium',
              book.status === 'ongoing' ? 'bg-emerald-900/50 text-emerald-400 border-emerald-800' :
              book.status === 'completed' ? 'bg-blue-900/50 text-blue-400 border-blue-800' :
              'bg-amber-900/50 text-amber-400 border-amber-800'
            )}>
              {book.status === 'ongoing' ? 'Пишется' : book.status === 'completed' ? '✓ Завершено' : '⏸ На паузе'}
            </span>
          </div>

          {/* Инфо */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Автор */}
            <Link 
              href={`/author/${author.slug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <span className="font-serif">{author.name}</span>
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Заголовок */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {book.title}
            </h1>

            {/* Жанры */}
            {book.genres && book.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.genres.map(g => (
                  <span key={g} className="px-3 py-1 text-[0.7rem] uppercase tracking-wider bg-muted/50 border border-border rounded-sm text-muted-foreground">
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Описание */}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {book.description}
            </p>

            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-border">
              {book.stats?.rating > 0 && (
                <StatBox icon={Star} label="Рейтинг" value={book.stats.rating.toString()} highlight />
              )}
              {book.stats?.views > 0 && (
                <StatBox icon={Eye} label="Просмотры" value={formatNum(book.stats.views)} />
              )}
              {book.stats?.followers > 0 && (
                <StatBox icon={Heart} label="Читатели" value={formatNum(book.stats.followers)} />
              )}
              {book.stats?.reviews > 0 && (
                <StatBox icon={MessageSquare} label="Отзывы" value={book.stats.reviews.toString()} />
              )}
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {book.royalRoadUrl && (
                <a
                  href={book.royalRoadUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-sm text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all group"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Читать бесплатно</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              
              <a
                href={siteConfig.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="vintage-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm"
              >
                <Send className="h-4 w-4" />
                <span>Premium главы в Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Теги */}
      {book.tags && book.tags.length > 0 && (
        <section className="vintage-card p-6 space-y-4">
          <h2 className="font-serif text-xl font-bold flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Теги и метки
          </h2>
          <div className="flex flex-wrap gap-2">
            {book.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1.5 text-[0.7rem] uppercase tracking-wider bg-muted/30 border border-border rounded-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Информация об авторе */}

      {/* Финальный CTA */}
      <section className="vintage-card p-8 text-center space-y-4 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <Bookmark className="h-8 w-8 mx-auto text-primary" />
        <h3 className="font-serif text-xl font-bold">Хотите читать раньше всех?</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Подпишитесь на наш Telegram-канал для доступа к эксклюзивным главам, 
          которые ещё не опубликованы на RoyalRoad.
        </p>
        <a
          href={siteConfig.telegramChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="vintage-btn inline-flex items-center gap-2 px-8 py-3 rounded-sm"
        >
          <Send className="h-4 w-4" />
          <span>Подписаться на канал</span>
        </a>
      </section>

      {/* Навигация */}
      <nav className="flex justify-between pt-6 border-t border-border">
        <Link href={`/author/${author.slug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors group inline-flex items-center gap-2">
          ← <span className="group-hover:-translate-x-1 transition-transform">{author.name}</span>
        </Link>
        <Link href="/books" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors group inline-flex items-center gap-2">
          <span className="group-hover:translate-x-1 transition-transform">Все книги</span> →
        </Link>
      </nav>
    </article>
  );
}

// Вспомогательный компонент статистики
function StatBox({ 
  icon: Icon, 
  label, 
  value, 
  highlight = false 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn(
      'p-3 rounded-sm border border-border text-center space-y-1',
      highlight ? 'bg-primary/5 border-primary/30' : 'bg-muted/30'
    )}>
      <Icon className={cn('h-4 w-4 mx-auto', highlight ? 'text-primary' : 'text-muted-foreground')} />
      <div className={cn('text-lg font-bold', highlight ? 'text-primary' : 'text-foreground')}>{value}</div>
      <div className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}