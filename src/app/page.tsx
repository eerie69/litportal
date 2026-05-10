// src/app/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Search, BookOpen, Users, Lock, Send, Disc, Star, TrendingUp } from 'lucide-react';
import { loadAndValidateData } from '@/lib/validation';
import { AuthorsArraySchema, BooksArraySchema } from '@/lib/validation';
import { AuthorCard } from '@/components/catalog/AuthorCard';
import { BookCard } from '@/components/catalog/BookCard';
import { TelegramCTA } from '@/components/seo/TelegramCTA';
import { SearchBar } from '@/components/ui/SearchBar';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  // Основные мета-теги
  title: {
    default: 'LitPortal | Эксклюзивные главы книг Royal Road в Telegram',
    template: '%s | LitPortal',
  },
  description: '📚 Каталог авторов и книг с Royal Road. Читайте бесплатные главы на сайте, а продвинутые/премиум главы — эксклюзивно в нашем Telegram-канале. ЛитРПГ, фэнтези, прогрессия, исекай и другие жанры.',
  
  // Ключевые слова для поиска (100+ запросов)
  keywords: [
    // Основные запросы
    'royal road книги',
    'litrpg книги',
    'прогрессия фэнтези',
    'исекай книги',
    'эксклюзивные главы',
    'премиум главы телеграм',
    'читать книги онлайн',
    'веб-новеллы на русском',
    
    // Популярные авторы
    'Shirtaloon',
    'Zogarth',
    'Casualfarmer',
    'RinoZ',
    'puddles4263',
    'Void Herald',
    'PlumParrot',
    'OstensibleMammal',
    'Eligos',
    'Actus',
    
    // Популярные книги
    'He Who Fights With Monsters',
    'The Primal Hunter',
    'Beware of Chicken',
    'Chrysalis',
    'The Legend of Randidly Ghosthound',
    'Sky Pride',
    'Loopshard',
    'Salvos',
    'Godclads',
    'Jackal Among Snakes',
    
    // Жанры и теги
    'litrpg',
    'progression fantasy',
    'portal fantasy',
    'isekai',
    'cultivation',
    'urban fantasy',
    'post apocalyptic',
    'sci-fi litrpg',
    'time loop',
    'reincarnation',
    'anti-hero',
    'female lead',
    'male lead',
    'magic system',
    'dungeon crawler',
    
    // Локальные и длинные запросы
    'royal road на русском',
    'каталог веб-новелл',
    'эксклюзивные главы бесплатно',
    'подписка на книги телеграм',
    'читать раньше всех',
    'продвинутые главы',
    'бонусные сцены',
    'авторские комментарии',
  ].join(', '),
  
  // Канонический URL
  alternates: {
    canonical: siteConfig.url,
  },
  
  // Open Graph для соцсетей
  openGraph: {
    title: 'LitPortal | Эксклюзивные главы книг Royal Road',
    description: 'Каталог авторов и книг с Royal Road. Бесплатные главы на сайте, премиум — в Telegram. LitRPG, фэнтези, прогрессия и другие жанры.',
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'ru_RU',
    images: [
      {
        url: `${siteConfig.url}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: 'PATEPHONE — эксклюзивные главы книг в Telegram',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'PATEPHONE | Эксклюзивные главы книг',
    description: 'Каталог авторов Royal Road. Бесплатные главы + премиум в Telegram.',
    creator: siteConfig.twitterHandle,
  },
  
  // Настройки для поисковых роботов
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};


// JSON-LD структурированные данные для главной страницы
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
      description: 'Каталог книг с эксклюзивными главами в Telegram',
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`,
        },
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/books?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Популярные книги',
      description: 'Топ книг по просмотрам и рейтингу',
      itemListElement: [
        {
          '@type': 'Book',
          name: 'He Who Fights With Monsters',
          author: { '@type': 'Person', name: 'Shirtaloon' },
          genre: ['LitRPG', 'Progression', 'Fantasy'],
          inLanguage: 'en',
          isAccessibleForFree: true,
        },
        {
          '@type': 'Book',
          name: 'The Primal Hunter',
          author: { '@type': 'Person', name: 'Zogarth' },
          genre: ['LitRPG', 'Progression', 'Fantasy'],
          inLanguage: 'en',
          isAccessibleForFree: true,
        },
        {
          '@type': 'Book',
          name: 'Beware of Chicken',
          author: { '@type': 'Person', name: 'Casualfarmer' },
          genre: ['LitRPG', 'Cultivation', 'Comedy'],
          inLanguage: 'en',
          isAccessibleForFree: true,
        },
      ],
    },
  ],
};


async function getData() {
  const [{ data: authors }, { data: books }] = await Promise.all([
    loadAndValidateData('authors.json', AuthorsArraySchema),
    loadAndValidateData('books.json', BooksArraySchema),
  ]);
  
  return { authors, books };
}

export default async function HomePage() {
  const { authors, books } = await getData();
  
  const booksWithPremium = books
    .filter(book => book.stats?.followers && book.stats.followers > 0)
    .sort((a, b) => (b.stats?.followers || 0) - (a.stats?.followers || 0))
    .slice(0, 6);

  // Сортируем авторов по количеству книг
  const booksCountByAuthor = books.reduce((acc, book) => {
    acc[book.authorSlug] = (acc[book.authorSlug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const popularAuthors = [...authors]
    .sort((a, b) => (booksCountByAuthor[b.slug] || 0) - (booksCountByAuthor[a.slug] || 0))
    .slice(0, 6);

  // Функция для обработки поиска
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const encodedQuery = encodeURIComponent(query.trim());
    // Перенаправляем на страницу книг с параметром поиска
    window.location.href = `/books?search=${encodedQuery}`;
  };

  return (
    <div className="space-y-16">
      {/* JSON-LD для поисковиков */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero-секция с винтажным стилем */}
      <section className="relative text-center py-16 md:py-24 space-y-8 overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
          <Disc className="w-full h-full text-primary vinyl-spin" style={{ animationDuration: '20s' }} />
        </div>
        
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Библиотека редких изданий</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Читайте книги{' '}
            <span className="text-primary italic relative inline-block">
              раньше всех
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-loose font-light tracking-wide">
            <span className="block">Каталог авторов и книг с Royal Road</span>
            <span className="block">Продвинутые главы — эксклюзивно в нашем Telegram-канале</span>
          </p>
          
          {/* Поиск */}
          <SearchBar />

          <TelegramCTA variant="hero" />
        </div>
      </section>

      {/* Винтажный разделитель */}
      <div className="vintage-divider" />

      {/* Статистика */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Авторов', value: authors.length.toString() },
          { icon: BookOpen, label: 'Книг', value: books.length.toString() },
          { icon: Lock, label: 'Premium-контента', value: 'Более 570 книг' },
          { icon: Send, label: 'Подписчиков', value: '1.2К+' },
        ].map((stat, i) => (
          <div key={i} className="vintage-card p-6 text-center space-y-2 group hover:border-primary/50 transition-all duration-500">
            <stat.icon className="h-6 w-6 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="font-serif text-3xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Популярные авторы */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground">Популярные авторы</h2>
            <p className="text-muted-foreground mt-1 text-sm">Мастера слова нашего времени</p>
          </div>
          <Link href="/authors" className="text-sm font-medium text-primary hover:underline uppercase tracking-wider text-[0.7rem]">
            Все авторы →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.slice(0, 6).map(author => (
            <AuthorCard key={author.id} author={author} variant="default" />
          ))}
        </div>
      </section>

      {/* Книги с премиум-главами */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground flex items-center gap-3">
              Популярные книги
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Лидеры по просмотрам</p>
          </div>
          <Link href="/books" className="text-sm font-medium text-primary hover:underline uppercase tracking-wider text-[0.7rem]">
            Все книги →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {booksWithPremium.map(book => (
            <BookCard key={book.id} book={book} showPremiumBadge variant="grid" />
          ))}
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="py-12 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="relative text-center space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl font-bold">Присоединяйтесь к нашему сообществу</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Получайте доступ к эксклюзивным главам, обсуждениям и новинкам раньше других
          </p>
          <TelegramCTA variant="footer" />
        </div>
      </section>
    </div>
  );
}