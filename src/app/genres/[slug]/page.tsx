// src/app/genres/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Search, Star, Users } from 'lucide-react';
import { loadAndValidateData } from '@/lib/validation';
import { BooksArraySchema } from '@/lib/validation';
import { BookCard } from '@/components/catalog/BookCard';
import { siteConfig } from '@/config/site';
import { Book } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GenreSortSelect } from '@/components/catalog/GenreSortSelect';
import { 
  Gamepad2, TrendingUp, Wand2, DoorOpen, 
  Atom, Building2, Radiation, Rocket, 
  RefreshCw, Clock, Laugh, Drama 
} from 'lucide-react';

// Данные жанров (дублируем для SSR)
const GENRE_DATA: Record<string, { 
  name: string; 
  description: string; 
  icon: React.ReactNode;
  color: string;
  keywords: string[];
  seoTitle: string;       
  seoDescription: string; 
}> = {
  'LitRPG': {
    name: 'LitRPG',
    description: 'Игровые механики, уровни, статы и прокачка в литературной форме',
    icon: <Gamepad2 className="h-8 w-8" />, 
    color: 'from-violet-600/20 to-purple-600/20',
    keywords: ['litrpg', 'игровая система', 'статы', 'прокачка', 'скиллы', 'инвентарь'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',  
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Progression': {
    name: 'Progression Fantasy',
    description: 'Герой становится сильнее: от слабого к могущественному',
    icon: <TrendingUp className="h-8 w-8" />, 
    color: 'from-emerald-600/20 to-teal-600/20',
    keywords: ['progression', 'слабый в сильного', 'рост силы', 'тренировки', 'мастерство'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Fantasy': {
    name: 'Fantasy',
    description: 'Магия, драконы, эльфы и эпические приключения',
    icon: <Wand2 className="h-8 w-8" />, 
    color: 'from-amber-600/20 to-orange-600/20',
    keywords: ['фэнтези', 'магия', 'драконы', 'эльфы', 'эпик'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram', 
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Portal Fantasy / Isekai': {
    name: 'Portal Fantasy / Isekai',
    description: 'Попаданцы в другие миры: от Земли в фэнтези-реальность',
    icon: <DoorOpen className="h-8 w-8" />, 
    color: 'from-blue-600/20 to-cyan-600/20',
    keywords: ['isekai', 'попаданцы', 'другой мир', 'перенос'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram', 
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Cultivation': {
    name: 'Cultivation',
    description: 'Восточная магия, бессмертие, секты и путь к божественности',
    icon: <Atom className="h-8 w-8" />, 
    color: 'from-red-600/20 to-rose-600/20',
    keywords: ['cultivation', 'сянься', 'уся', 'бессмертие', 'ци', 'дао'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Urban Fantasy': {
    name: 'Urban Fantasy',
    description: 'Магия в современном мире: скрытые общества и тайные войны',
    icon: <Building2 className="h-8 w-8" />, 
    color: 'from-slate-600/20 to-gray-600/20',
    keywords: ['urban fantasy', 'современное фэнтези', 'магия в городе'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram', 
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Post Apocalyptic': {
    name: 'Post Apocalyptic',
    description: 'Выживание после конца света: мутанты, системы и новые правила',
     icon: <Radiation className="h-8 w-8" />, 
    color: 'from-yellow-600/20 to-amber-600/20',
    keywords: ['постапокалипсис', 'выживание', 'апокалипсис', 'мутанты'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Sci-fi': {
    name: 'Sci-fi',
    description: 'Научная фантастика: космос, технологии и будущее',
    icon: <Rocket className="h-8 w-8" />, 
    color: 'from-indigo-600/20 to-blue-600/20',
    keywords: ['sci-fi', 'космос', 'технологии', 'будущее', 'киберпанк'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram', 
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Reincarnation': {
    name: 'Reincarnation',
    description: 'Второй шанс: перерождение в новом теле или мире',
    icon: <RefreshCw className="h-8 w-8" />, 
    color: 'from-pink-600/20 to-fuchsia-600/20',
    keywords: ['реинкарнация', 'перерождение', 'вторая жизнь'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',  
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Time Loop': {
    name: 'Time Loop',
    description: 'Петли времени: повторяющиеся дни и шанс исправить ошибки',
    icon: <Clock className="h-8 w-8" />, 
    color: 'from-purple-600/20 to-violet-600/20',
    keywords: ['time loop', 'петля времени', 'повтор'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',         
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Comedy': {
    name: 'Comedy',
    description: 'Юмор и сатира: смех сквозь приключения и магию',
    icon: <Laugh className="h-8 w-8" />, 
    color: 'from-yellow-400/20 to-amber-400/20',
    keywords: ['комедия', 'юмор', 'сатира', 'пародия'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',          
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
  'Anti-Hero Lead': {
    name: 'Anti-Hero Lead',
    description: 'Серые герои: морально сложные персонажи без чёрно-белых решений',
    icon: <Drama className="h-8 w-8" />,
    color: 'from-zinc-600/20 to-neutral-600/20',
    keywords: ['антигерой', 'серая мораль', 'сложный персонаж'],
    seoTitle: 'LitRPG книги | Эксклюзивные главы в Telegram',          
    seoDescription: 'Лучшие LitRPG книги с системой, уровнями и прокачкой. Читайте продвинутые главы в Telegram.',
  },
};

// Генерация статических путей
export async function generateStaticParams() {
  const { data: books } = await loadAndValidateData('books.json', BooksArraySchema);
  const genres = new Set(books.flatMap(b => b.genres || []));
  return Array.from(genres).map(genre => ({ slug: encodeURIComponent(genre) }));
}

// Динамические метаданные
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const genre = decodeURIComponent(slug);
  const data = GENRE_DATA[genre];
  
  if (!data) {
    return {
      title: 'Жанр не найден',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    keywords: data.name + ', ' + data.description + ', книги, эксклюзивные главы, telegram',
    alternates: {
      canonical: `${siteConfig.url}/genres/${slug}`,
    },
    openGraph: {
      title: `${data.icon} ${data.seoTitle}`,
      description: data.seoDescription,
      type: 'website',
      url: `${siteConfig.url}/genres/${slug}`,
      siteName: siteConfig.name,
    },
  };
}

// Страница жанра
export default async function GenrePage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
    const { slug } = await params;
    const genre = decodeURIComponent(slug);
    const { sort } = await searchParams;
    const sortType = sort || 'rating';
  
  const { data: books } = await loadAndValidateData('books.json', BooksArraySchema);
  const genreBooks = books.filter(book => book.genres?.includes(genre));
  
  const genreInfo = GENRE_DATA[genre];
  if (!genreInfo || genreBooks.length === 0) notFound();

  // Сортировка: по рейтингу, потом по дате
  const sortedBooks = [...genreBooks].sort((a, b) => {
    if (sortType === 'rating') {
      const ratingDiff = (b.stats?.rating || 0) - (a.stats?.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
    } else if (sortType === 'newest') {
      return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
    } else if (sortType === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  
    
   

  // Статистика
  const avgRating = genreBooks.reduce((sum, b) => sum + (b.stats?.rating || 0), 0) / genreBooks.length;
  const uniqueAuthors = new Set(genreBooks.map(b => b.author));

  return (
    <article className="space-y-8">
      {/* Хедер жанра */}
      <header className="vintage-card p-6 md:p-8 space-y-6">
        <Link 
          href="/genres" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Все жанры
        </Link>

        <div className="flex items-start gap-4">
          <span className="text-5xl">{genreInfo.icon}</span>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {genreInfo.name}
            </h1>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {genreInfo.description}
            </p>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <StatBox label="Книг" value={genreBooks.length.toString()} />
          <StatBox label="Авторов" value={uniqueAuthors.size.toString()} />
          <StatBox label="Средний рейтинг" value={avgRating > 0 ? avgRating.toFixed(1) : '—'} highlight={avgRating >= 4.5} />
          <StatBox label="Последнее обновление" value={new Date(Math.max(...genreBooks.map(b => new Date(b.lastUpdate).getTime()))).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} />
        </div>

        {/* CTA Telegram */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-border">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Хотите читать продвинутые главы {genreInfo.name.toLowerCase()} раньше всех?
            </p>
          </div>
          <a
            href={siteConfig.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="vintage-btn inline-flex items-center gap-2 px-6 py-3 rounded-sm"
          >
            
            <span>Эксклюзивы в Telegram</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Фильтры и сортировка */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Показано <span className="text-foreground font-medium">{sortedBooks.length}</span> из <span className="text-foreground font-medium">{books.length}</span> книг
        </p>
        
        <GenreSortSelect currentSort={sortType} />
      </div>

      {/* Сетка книг */}
      {sortedBooks.length === 0 ? (
        <div className="vintage-card p-12 text-center space-y-4">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground text-lg">Книги в этом жанре пока не добавлены</p>
          <Link href="/genres" className="text-primary hover:underline">Вернуться к жанрам →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedBooks.map((book: Book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              variant="grid"
              showPremiumBadge
              premiumChaptersCount={0}
            />
          ))}
        </div>
      )}

      {/* Связанные жанры */}
      {genreBooks.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-bold">Похожие жанры</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(GENRE_DATA)
              .filter(([g]) => g !== genre && genreBooks.some(b => b.genres?.includes(g)))
              .slice(0, 5)
              .map(([g, data]) => (
                <Link
                  key={g}
                  href={`/genres/${encodeURIComponent(g)}`}
                  className="px-4 py-2 text-sm bg-muted/50 border border-border rounded-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{data.icon}</span>
                  {data.name}
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Навигация */}
      <nav className="flex justify-between pt-6 border-t border-border">
        <Link href="/genres" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors group inline-flex items-center gap-2">
          ← <span className="group-hover:-translate-x-1 transition-transform">Все жанры</span>
        </Link>
        <Link href="/books" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors group inline-flex items-center gap-2">
          <span className="group-hover:translate-x-1 transition-transform">Все книги</span> →
        </Link>
      </nav>
    </article>
  );
}

// Вспомогательный компонент статистики
function StatBox({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn(
      'p-4 rounded-sm border border-border text-center space-y-1',
      highlight ? 'bg-primary/5 border-primary/30' : 'bg-muted/30'
    )}>
      <div className={cn('text-lg font-bold', highlight ? 'text-primary' : 'text-foreground')}>{value}</div>
      <div className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}