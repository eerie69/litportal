// src/app/genres/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Search, Star, Users } from 'lucide-react';
import { loadAndValidateData } from '@/lib/validation';
import { BooksArraySchema } from '@/lib/validation';
import { siteConfig } from '@/config/site';
import { Book } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GenreSearch } from '@/components/catalog/GenreSearch';
import { 
  Gamepad2, TrendingUp, Wand2, DoorOpen, 
  Atom, Building2, Radiation, Rocket, 
  RefreshCw, Clock, Laugh, Drama 
} from 'lucide-react';

// SEO метаданные
export const metadata: Metadata = {
  title: 'Жанры книг | Каталог: LitRPG, Progression, Fantasy, Isekai',
  description: 'Найдите книги по любимому жанру: LitRPG, Progression Fantasy, Portal Fantasy, Cultivation, Urban Fantasy и другие. Эксклюзивные главы в Telegram.',
  keywords: [
    'жанры книг',
    'litrpg книги',
    'progression fantasy',
    'isekai книги',
    'cultivation novels',
    'urban fantasy телеграм',
    'фэнтези книги',
    'приключенческие книги',
    'книги про систему',
    'попаданцы книги',
    'книги с прокачкой',
    'веб-новеллы жанры',
    'royal road жанры',
    'эксклюзивные главы по жанрам',
  ].join(', '),
  alternates: {
    canonical: `${siteConfig.url}/genres`,
  },
  openGraph: {
    title: 'Жанры книг | Найдите свою историю',
    description: 'LitRPG, Progression, Fantasy, Isekai и другие жанры. Эксклюзивные главы в Telegram.',
    type: 'website',
    url: `${siteConfig.url}/genres`,
    siteName: siteConfig.name,
    locale: 'ru_RU',
  },
};

// JSON-LD для SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Жанры книг',
  description: 'Каталог книг по жанрам: LitRPG, Progression Fantasy, Portal Fantasy и другие',
  url: `${siteConfig.url}/genres`,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

// Данные жанров с иконками и описаниями
const GENRE_DATA: Record<string, { 
  name: string; 
  description: string; 
  icon: React.ReactNode;
  color: string;
  keywords: string[];
}> = {
  'LitRPG': {
    name: 'LitRPG',
    description: 'Игровые механики, уровни, статы и прокачка в литературной форме',
    icon: <Gamepad2 className="h-8 w-8" />, 
    color: 'from-violet-600/20 to-purple-600/20',
    keywords: ['litrpg', 'игровая система', 'статы', 'прокачка', 'скиллы', 'инвентарь'],
  },
  'Progression': {
    name: 'Progression Fantasy',
    description: 'Герой становится сильнее: от слабого к могущественному',
    icon: <TrendingUp className="h-8 w-8" />, 
    color: 'from-emerald-600/20 to-teal-600/20',
    keywords: ['progression', 'слабый в сильного', 'рост силы', 'тренировки', 'мастерство'],
  },
  'Fantasy': {
    name: 'Fantasy',
    description: 'Магия, драконы, эльфы и эпические приключения',
    icon: <Wand2 className="h-8 w-8" />, 
    color: 'from-amber-600/20 to-orange-600/20',
    keywords: ['фэнтези', 'магия', 'драконы', 'эльфы', 'эпик'],
  },
  'Portal Fantasy / Isekai': {
    name: 'Portal Fantasy / Isekai',
    description: 'Попаданцы в другие миры: от Земли в фэнтези-реальность',
    icon: <DoorOpen className="h-8 w-8" />, 
    color: 'from-blue-600/20 to-cyan-600/20',
    keywords: ['isekai', 'попаданцы', 'другой мир', 'перенос'],
  },
  'Cultivation': {
    name: 'Cultivation',
    description: 'Восточная магия, бессмертие, секты и путь к божественности',
    icon: <Atom className="h-8 w-8" />, 
    color: 'from-red-600/20 to-rose-600/20',
    keywords: ['cultivation', 'сянься', 'уся', 'бессмертие', 'ци', 'дао'],
  },
  'Urban Fantasy': {
    name: 'Urban Fantasy',
    description: 'Магия в современном мире: скрытые общества и тайные войны',
    icon: <Building2 className="h-8 w-8" />, 
    color: 'from-slate-600/20 to-gray-600/20',
    keywords: ['urban fantasy', 'современное фэнтези', 'магия в городе'],
  },
  'Post Apocalyptic': {
    name: 'Post Apocalyptic',
    description: 'Выживание после конца света: мутанты, системы и новые правила',
     icon: <Radiation className="h-8 w-8" />, 
    color: 'from-yellow-600/20 to-amber-600/20',
    keywords: ['постапокалипсис', 'выживание', 'апокалипсис', 'мутанты'],
  },
  'Sci-fi': {
    name: 'Sci-fi',
    description: 'Научная фантастика: космос, технологии и будущее',
    icon: <Rocket className="h-8 w-8" />, 
    color: 'from-indigo-600/20 to-blue-600/20',
    keywords: ['sci-fi', 'космос', 'технологии', 'будущее', 'киберпанк'],
  },
  'Reincarnation': {
    name: 'Reincarnation',
    description: 'Второй шанс: перерождение в новом теле или мире',
    icon: <RefreshCw className="h-8 w-8" />, 
    color: 'from-pink-600/20 to-fuchsia-600/20',
    keywords: ['реинкарнация', 'перерождение', 'вторая жизнь'],
  },
  'Time Loop': {
    name: 'Time Loop',
    description: 'Петли времени: повторяющиеся дни и шанс исправить ошибки',
    icon: <Clock className="h-8 w-8" />, 
    color: 'from-purple-600/20 to-violet-600/20',
    keywords: ['time loop', 'петля времени', 'повтор'],
  },
  'Comedy': {
    name: 'Comedy',
    description: 'Юмор и сатира: смех сквозь приключения и магию',
    icon: <Laugh className="h-8 w-8" />, 
    color: 'from-yellow-400/20 to-amber-400/20',
    keywords: ['комедия', 'юмор', 'сатира', 'пародия'],
  },
  'Anti-Hero Lead': {
    name: 'Anti-Hero Lead',
    description: 'Серые герои: морально сложные персонажи без чёрно-белых решений',
    icon: <Drama className="h-8 w-8" />, 
    color: 'from-zinc-600/20 to-neutral-600/20',
    keywords: ['антигерой', 'серая мораль', 'сложный персонаж'],
  },
};

// Компонент карточки жанра
function GenreCard({ 
  genre, 
  bookCount, 
  avgRating, 
  topAuthors 
}: { 
  genre: string; 
  bookCount: number; 
  avgRating: number | null; 
  topAuthors: string[];
}) {
  const data = GENRE_DATA[genre] || {
    name: genre,
    description: `Книги в жанре ${genre}`,
    icon: <BookOpen className="h-8 w-8" />, // ← Иконка вместо эмодзи
    color: 'from-muted to-muted',
    keywords: [],
  };
  return (
    <Link
      href={`/genres/${encodeURIComponent(genre)}`}
      className={cn(
        'vintage-card group p-6 space-y-4 hover:border-primary/50 transition-all duration-500',
        'bg-gradient-to-br', data.color
      )}
    >
      {/* Заголовок + иконка */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{data.icon}</span>
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {data.name}
          </h3>
        </div>
        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
          {bookCount} {bookCount === 1 ? 'книга' : bookCount < 5 ? 'книги' : 'книг'}
        </span>
      </div>

      {/* Описание */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {data.description}
      </p>

      {/* Статистика */}
      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/50">
        {avgRating && avgRating > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 text-primary fill-primary" />
            {avgRating.toFixed(1)}
          </span>
        )}
        {topAuthors.length > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            {topAuthors.slice(0, 2).join(', ')}{topAuthors.length > 2 && ` +${topAuthors.length - 2}`}
          </span>
        )}
        <span className="ml-auto text-xs text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Смотреть →
        </span>
      </div>
    </Link>
  );
}

// Основная страница
export default async function GenresPage() {
  // Загружаем данные
  const { data: books } = await loadAndValidateData('books.json', BooksArraySchema);

  // Собираем статистику по жанрам
  const genreStats: Record<string, { 
    count: number; 
    ratings: number[]; 
    authors: Set<string>;
  }> = {};

  for (const book of books) {
    for (const genre of book.genres || []) {
      if (!genreStats[genre]) {
        genreStats[genre] = { count: 0, ratings: [], authors: new Set() };
      }
      genreStats[genre].count++;
      if (book.stats?.rating) genreStats[genre].ratings.push(book.stats.rating);
      genreStats[genre].authors.add(book.author);
    }
  }

  // Сортируем жанры: сначала популярные, потом по алфавиту
  const sortedGenres = Object.entries(genreStats)
    .sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))
    .map(([genre, stats]) => ({
      genre,
      bookCount: stats.count,
      avgRating: stats.ratings.length > 0 
        ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length 
        : null,
      topAuthors: Array.from(stats.authors).slice(0, 5),
    }));

  return (
    <article className="space-y-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Хедер */}
      <header className="space-y-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          На главную
        </Link>
        
        <div className="space-y-3">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Жанры книг
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Найдите идеальную историю: от эпических фэнтези до космических опер. 
            Все книги отсортированы по жанрам для удобного поиска.
          </p>
        </div>

        {/* Поиск по жанрам */}
        <div className="space-y-2">
  <GenreSearch 
    genres={sortedGenres.map(g => ({
      genre: g.genre,
      keywords: GENRE_DATA[g.genre]?.keywords,
    }))} 
  />
  <p className="text-xs text-muted-foreground">
    Популярные: <Link href="/genres/LitRPG" className="text-primary hover:underline">LitRPG</Link>, <Link href="/genres/Progression" className="text-primary hover:underline">Progression</Link>, <Link href="/genres/Portal%20Fantasy%20/%20Isekai" className="text-primary hover:underline">Isekai</Link>
  </p>
</div>
      </header>

      {/* Сетка жанров */}
      {sortedGenres.length === 0 ? (
        <div className="vintage-card p-12 text-center space-y-4">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground text-lg">Жанры пока не добавлены</p>
          <Link href="/" className="text-primary hover:underline">Вернуться на главную →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedGenres.map(({ genre, ...stats }) => (
            <GenreCard key={genre} genre={genre} {...stats} />
          ))}
        </div>
      )}

      {/* Блок с популярными комбинациями жанров */}
      <section className="vintage-card p-6 space-y-4">
        <h2 className="font-serif text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Популярные комбинации
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'LitRPG + Progression',
            'Fantasy + Isekai',
            'Cultivation + Reincarnation',
            'Urban Fantasy + Comedy',
            'Post Apocalyptic + LitRPG',
          ].map((combo) => (
            <Link
              key={combo}
              href={`/books?genres=${encodeURIComponent(combo)}`}
              className="px-4 py-2 text-sm bg-muted/50 border border-border rounded-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              {combo}
            </Link>
          ))}
        </div>
      </section>

      {/* Навигация */}
      <nav className="flex justify-between pt-6 border-t border-border">
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors group inline-flex items-center gap-2">
          ← <span className="group-hover:-translate-x-1 transition-transform">На главную</span>
        </Link>
        <Link href="/books" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors group inline-flex items-center gap-2">
          <span className="group-hover:translate-x-1 transition-transform">Все книги</span> →
        </Link>
      </nav>
    </article>
  );
}