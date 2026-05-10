// src/app/premium/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Send, Star, Lock, Zap, BookOpen, Users, 
  CheckCircle, ArrowRight, ExternalLink, Shield, 
  Clock, Gift, MessageCircle, TrendingUp 
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

// SEO метаданные — максимум ключевых слов для продвижения
export const metadata: Metadata = {
  title: 'Premium-доступ | Эксклюзивные главы: He Who Fights With Monsters, Primal Hunter, Beware of Chicken в Telegram',
  description: 'Читайте продвинутые главы книг с Royal Road раньше всех: Shirtaloon, Zogarth, Casualfarmer, RinoZ. Эксклюзивный LitRPG, Progression, Fantasy контент только в нашем Telegram-канале. Бесплатная подписка!',
  keywords: [
    // Основные запросы
    'премиум главы',
    'эксклюзивные книги',
    'telegram канал книги',
    'royal road премиум',
    'ранний доступ главы',
    'litrpg премиум',
    'фэнтези книги телеграм',
    'подписка на книги',
    'эксклюзивный контент',
    'продвинутые главы',
    
    // Популярные авторы
    'Shirtaloon',
    'Zogarth',
    'Casualfarmer',
    'RinoZ',
    'puddles4263',
    'Warby Picus',
    'Dosei',
    'Maxime J. Durand',
    'Void Herald',
    'PlumParrot',
    'OstensibleMammal',
    'Eligos',
    'Actus',
    'Necariin',
    'MelasDelta',
    
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
    'The Years of Apocalypse',
    'Path to Transcendence',
    'Runeblade',
    'The Lone Wanderer',
    
    // Жанры и теги
    'litrpg книги',
    'progression fantasy',
    'portal fantasy',
    'isekai книги',
    'cultivation novel',
    'post apocalyptic litrpg',
    'urban fantasy telegram',
    'книги про систему',
    'прокачка персонажа',
    'слабый в сильного',
    'магия и технологии',
    'подземелья и драконы',
    'книги с системой',
    'ранобэ на русском',
    'веб-новеллы телеграм',
    
    // Локальные и длинные запросы
    'читать книги раньше всех',
    'эксклюзивные главы бесплатно',
    'телеграм канал с книгами',
    'royal road на русском',
    'litrpg сообщество',
    'фанаты прогрессии',
    'книжный телеграм канал',
    'подписка на веб-новеллы',
    'ранний доступ к главам',
    'бонусные сцены книг',
  ].join(', '),
  
  alternates: {
    canonical: `${siteConfig.url}/premium`,
  },
  openGraph: {
    title: 'Premium-доступ | Эксклюзивные главы',
    description: 'Читайте продвинутые главы книг раньше всех. Только в нашем Telegram-канале: бесплатная подписка, эксклюзивный контент, обновления ежедневно.',
    type: 'website',
    url: `${siteConfig.url}/premium`,
    siteName: siteConfig.name,
    locale: 'ru_RU',
    images: [
      {
        url: `${siteConfig.url}/og-premium.jpg`,
        width: 1200,
        height: 630,
        alt: 'Premium доступ к эксклюзивным главам книг с Royal Road',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium-доступ | Эксклюзивные главы',
    description: 'Читайте продвинутые главы раньше всех: He Who Fights With Monsters, Primal Hunter, Beware of Chicken. Бесплатно в Telegram!',
  },
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

// Расширенный JSON-LD с упоминанием книг и авторов
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Premium-доступ к эксклюзивным главам книг',
      description: 'Получайте доступ к продвинутым главам книг с Royal Road раньше всех через наш Telegram-канал',
      url: `${siteConfig.url}/premium`,
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
        description: 'Бесплатная подписка на Telegram-канал с эксклюзивным контентом',
      },
      potentialAction: {
        '@type': 'JoinAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: siteConfig.telegramChannel,
          actionPlatform: 'https://schema.org/TelegramPlatform',
        },
      },
    },
    // Список популярных книг для SEO
    {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Book',
            name: 'He Who Fights With Monsters',
            author: { '@type': 'Person', name: 'Shirtaloon' },
            genre: ['LitRPG', 'Progression', 'Fantasy'],
            inLanguage: 'en',
            isAccessibleForFree: true,
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Book',
            name: 'The Primal Hunter',
            author: { '@type': 'Person', name: 'Zogarth' },
            genre: ['LitRPG', 'Progression', 'Fantasy'],
            inLanguage: 'en',
            isAccessibleForFree: true,
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Book',
            name: 'Beware of Chicken',
            author: { '@type': 'Person', name: 'Casualfarmer' },
            genre: ['LitRPG', 'Cultivation', 'Comedy'],
            inLanguage: 'en',
            isAccessibleForFree: true,
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Book',
            name: 'Chrysalis',
            author: { '@type': 'Person', name: 'RinoZ' },
            genre: ['LitRPG', 'Reincarnation', 'Comedy'],
            inLanguage: 'en',
            isAccessibleForFree: true,
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'Book',
            name: 'Sky Pride',
            author: { '@type': 'Person', name: 'Warby Picus' },
            genre: ['Progression', 'Wuxia', 'Cultivation'],
            inLanguage: 'en',
            isAccessibleForFree: true,
          },
        },
      ],
    },
  ],
};

// Секция популярных авторов с прямыми ссылками
function PopularAuthorsSection() {
  const popularAuthors = [
    { name: 'Shirtaloon', book: 'He Who Fights With Monsters', slug: 'shirtaloon-travis-deverell-' },
    { name: 'Zogarth', book: 'The Primal Hunter', slug: 'zogarth' },
    { name: 'Casualfarmer', book: 'Beware of Chicken', slug: 'casualfarmer' },
    { name: 'RinoZ', book: 'Chrysalis', slug: 'rinoz' },
    { name: 'puddles4263', book: 'The Legend of Randidly Ghosthound', slug: 'puddles4263' },
    { name: 'Warby Picus', book: 'Sky Pride', slug: 'warby-picus' },
    { name: 'Dosei', book: 'Loopshard', slug: 'dosei' },
    { name: 'Maxime J. Durand', book: 'Board & Conquest', slug: 'maxime-j-durand-void-herald-' },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-sm">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="text-xs uppercase tracking-wider text-primary font-medium">
            Топ авторов
          </span>
        </div>
        
        <h2 className="font-serif text-3xl md:text-4xl font-bold">
          Популярные авторы в нашем Telegram
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Эти авторы уже делятся эксклюзивными главами с нашими подписчиками. 
          Подпишитесь, чтобы читать их работы первыми!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {popularAuthors.map((author, index) => (
          <Link
            key={index}
            href={`/author/${author.slug}`}
            className="vintage-card p-4 space-y-3 group hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-border">
                <span className="font-serif font-bold text-primary text-sm">
                  {author.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{author.name}</p>
                <p className="text-xs text-muted-foreground truncate">{author.book}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-primary" />
                Эксклюзив в TG
              </span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link 
          href="/authors" 
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Все авторы в каталоге
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

// Секция популярных жанров для поиска
function PopularGenresSection() {
  const genres = [
    { name: 'LitRPG', count: 45, desc: 'Системы, уровни, прокачка' },
    { name: 'Progression Fantasy', count: 38, desc: 'Слабый в сильного' },
    { name: 'Portal Fantasy / Isekai', count: 32, desc: 'Попаданцы в другие миры' },
    { name: 'Cultivation', count: 28, desc: 'Восточная магия, бессмертие' },
    { name: 'Post Apocalyptic', count: 24, desc: 'Выживание после конца света' },
    { name: 'Urban Fantasy', count: 21, desc: 'Магия в современном мире' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-transparent">
      <div className="text-center mb-12 space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold">
          Популярные жанры в нашем каталоге
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Найдите книги по вкусу — эксклюзивные главы всех жанров доступны в Telegram
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {genres.map((genre, index) => (
          <div 
            key={index}
            className="vintage-card p-5 space-y-3 group hover:border-primary/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-semibold text-foreground">{genre.name}</h3>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                {genre.count} книг
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{genre.desc}</p>
            <Link 
              href={`/books?genre=${encodeURIComponent(genre.name)}`}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Смотреть книги →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// Герой-секция с сильным оффером
function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 border border-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 border border-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center space-y-8 max-w-4xl mx-auto px-4">
        {/* Бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-full bg-primary/5">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
            Эксклюзивный доступ
          </span>
        </div>

        {/* Заголовок */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Читайте главы{' '}
         <span className="text-primary italic relative inline-block">
              раньше всех
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            </span>
        </h1>

        {/* Подзаголовок */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Получайте доступ к продвинутым главам книг с Royal Road{' '}
          <span className="text-foreground font-medium">до их публикации</span>. 
          Эксклюзивный контент, бонусы и обновления — только для подписчиков.
        </p>

        {/* Кнопка CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={siteConfig.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="vintage-btn inline-flex items-center gap-3 px-8 py-4 rounded-sm text-base min-w-[240px] justify-center shadow-xl hover:shadow-primary/20 transition-all duration-300 group"
          >
            <Send className="h-5 w-5 relative z-10" />
            <span className="font-serif uppercase tracking-wider relative z-10">
              Подписаться бесплатно
            </span>
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <Link 
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-sm text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all group"
          >
            <BookOpen className="h-4 w-4" />
            <span>Смотреть каталог</span>
          </Link>
        </div>

        {/* Доверие */}
        <div className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            Бесплатно
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            Без спама
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            Отписаться в любой момент
          </span>
        </div>
      </div>
    </section>
  );
}

// Секция преимуществ
function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: 'Ранний доступ',
      description: 'Читайте продвинутые главы за 1-4 недели до публикации на Royal Road',
      highlight: true,
    },
    {
      icon: Lock,
      title: 'Эксклюзивный контент',
      description: 'Бонусные сцены, альтернативные концовки и авторские комментарии',
    },
    {
      icon: Zap,
      title: 'Мгновенные уведомления',
      description: 'Получайте оповещения о новых главах сразу после публикации',
    },
    {
      icon: Gift,
      title: 'Бонусы подписчикам',
      description: 'Розыгрыши, мерч, доступ к закрытым обсуждениям и многое другое',
    },
    {
      icon: MessageCircle,
      title: 'Сообщество читателей',
      description: 'Обсуждайте теории, делитесь впечатлениями с единомышленниками',
    },
    {
      icon: TrendingUp,
      title: 'Влияние на сюжет',
      description: 'Участвуйте в опросах и голосуйте за развитие истории',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-12 space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold">
          Почему стоит подписаться?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Мы ценим наших читателей и создаём дополнительные ценности 
          для тех, кто хочет быть в курсе событий первым
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className={cn(
              'vintage-card p-6 space-y-4 group hover:border-primary/50 transition-all duration-500',
              benefit.highlight && 'border-primary/40 bg-primary/5'
            )}
          >
            <div className={cn(
              'w-12 h-12 rounded-sm flex items-center justify-center border',
              benefit.highlight 
                ? 'bg-primary/10 border-primary/30 text-primary' 
                : 'bg-muted/30 border-border text-muted-foreground'
            )}>
              <benefit.icon className="h-6 w-6" />
            </div>
            
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {benefit.title}
            </h3>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Секция "Как это работает"
function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Нажмите кнопку',
      description: 'Перейдите в наш Telegram-канал по ссылке ниже',
    },
    {
      step: '02',
      title: 'Подпишитесь',
      description: 'Нажмите «Подписаться» — это бесплатно и займёт 5 секунд',
    },
    {
      step: '03',
      title: 'Включите уведомления',
      description: 'Чтобы не пропустить новые главы, включите уведомления в настройках канала',
    },
    {
      step: '04',
      title: 'Читайте первым',
      description: 'Получайте доступ к эксклюзивным главам сразу после публикации',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-transparent">
      <div className="text-center mb-12 space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold">
          Как получить доступ?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Всего 4 простых шага отделяют вас от эксклюзивного контента
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, index) => (
          <div key={index} className="relative">
            {/* Соединительная линия для десктопа */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/30 to-transparent -translate-x-4 z-0" />
            )}
            
            <div className="vintage-card p-6 space-y-4 relative z-10 text-center group hover:border-primary/50 transition-all">
              {/* Номер шага */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-sm border-2 border-primary bg-primary/10 text-primary font-serif text-xl font-bold">
                {item.step}
              </div>
              
              <h3 className="font-serif text-lg font-semibold">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Центральная CTA */}
      <div className="text-center mt-12">
        <a
          href={siteConfig.telegramChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="vintage-btn inline-flex items-center gap-3 px-10 py-4 rounded-sm text-base shadow-xl hover:shadow-primary/20 transition-all duration-300 group"
        >
          <Send className="h-5 w-5" />
          <span className="font-serif uppercase tracking-wider">
            Перейти в Telegram
          </span>
          <ExternalLink className="h-4 w-4 opacity-70" />
        </a>
      </div>
    </section>
  );
}

// Секция социального доказательства
function SocialProofSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="vintage-card p-8 md:p-12 space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-xs uppercase tracking-wider text-primary font-medium">
              Наше сообщество
            </span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Присоединяйтесь к тысячам читателей
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '1.2K+', label: 'Подписчиков' },
            { value: '6.7K+', label: 'Эксклюзивных глав' },
            { value: '250+', label: 'Авторов' },
            { value: '4.9★', label: 'Средний рейтинг' },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="font-serif text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Отзывы (заглушка) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border">
          {[
            {
              quote: 'Наконец-то могу читать продолжение раньше всех! Очень удобно.',
              author: 'Алексей М.',
            },
            {
              quote: 'Бонусные сцены того стоят. Спасибо за эксклюзив!',
              author: 'Мария К.',
            },
            {
            quote: 'Перешла в Telegram и глазам не поверила — продвинутые главы моих любимых авторов! Вы супер!',
            author: 'Анна В.',
            },
            {
            quote: 'Обожаю ваш канал! Каждый вечер захожу проверять, не вышло ли продолжение.',
            author: 'Дмитрий С.',
            },
            {
            quote: 'Думал, бесплатные главы — предел мечтаний. А тут ещё и эксклюзив в Telegram!',
            author: 'Игорь Л.',
            },
            {
            quote: 'Лучший книжный каталог! Столько новых авторов для себя открыла.',
            author: 'Екатерина Н.',
            },
            {
            quote: 'Подписался не глядя, и не жалею. Продвинутые главы — это просто🔥',
            author: 'Роман Т.',
            },
            {
            quote: 'Спасибо за ваш труд! Так удобно следить за всеми любимыми сериями в одном месте.',
            author: 'Ольга Ш.',
            },
            {
            quote: 'Зашёл случайно, а остался навсегда. Эксклюзивный контент — это любовь!',
            author: 'Максим К.',
            },
            {
            quote: 'Ваш Telegram — настоящая находка. Главы, которых нигде больше нет!',
            author: 'Татьяна П.',
            },
            {
            quote: 'Ребята, вы лучшие! Читаю на два дня вперёд раньше всех остальных.',
            author: 'Сергей Б.',
            },
            {
            quote: 'Жду каждую новую главу как праздник. Телеграм с эксклюзивами — это гениально!',
            author: 'Виктория Д.',
            },
          ].map((review, index) => (
            <div key={index} className="vintage-card p-5 space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">
                "{review.quote}"
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                — {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ секция для SEO (long-tail keywords)
function FAQSection() {
  const faqs = [
    {
      question: 'Это действительно бесплатно?',
      answer: 'Да, подписка на наш Telegram-канал полностью бесплатна. Мы не требуем оплаты, регистрации или личных данных.',
    },
    {
      question: 'Как часто публикуются новые главы?',
      answer: 'Частота зависит от автора и оригинального графика публикации на Royal Road. В среднем новые эксклюзивные главы появляются 2-4 раза в неделю.',
    },
    {
      question: 'Можно ли отписаться в любой момент?',
      answer: 'Конечно. Вы можете отписаться от канала в любой момент через настройки Telegram. Мы уважаем выбор наших читателей.',
    },
    {
      question: 'Будет ли спам в канале?',
      answer: 'Нет. Мы публикуем только контент, связанный с книгами: новые главы, анонсы, бонусные материалы. Никакой рекламы сторонних сервисов.',
    },
    {
      question: 'Доступен ли контент на мобильных устройствах?',
      answer: 'Да, Telegram работает на всех платформах: iOS, Android, Desktop. Вы можете читать главы где угодно.',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-12 space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold">
          Частые вопросы
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ответы на популярные вопросы о премиум-доступе
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <details 
            key={index}
            className="vintage-card group open:border-primary/40 transition-all"
          >
            <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
              <span className="font-serif font-medium text-foreground group-open:text-primary transition-colors">
                {faq.question}
              </span>
              <span className="text-primary group-open:rotate-180 transition-transform">
                <ArrowRight className="h-5 w-5 rotate-90" />
              </span>
            </summary>
            <div className="px-5 pb-5 pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// Финальный CTA
function FinalCTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="vintage-card relative overflow-hidden p-8 md:p-12 text-center space-y-8 bg-gradient-to-br from-primary/10 via-card to-primary/5">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-br-3xl opacity-50" />
        
        <div className="relative space-y-6 max-w-2xl mx-auto">
          <Shield className="h-12 w-12 mx-auto text-primary" />
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Готовы читать <span className="text-primary italic relative inline-block">
              первым
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            </span>?
          </h2>
          
          <p className="text-muted-foreground leading-relaxed">
            Присоединяйтесь к нашему сообществу и получайте эксклюзивный контент 
            прямо в свой Telegram. Это бесплатно, быстро и безопасно.
          </p>

          <a
            href={siteConfig.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="vintage-btn inline-flex items-center gap-3 px-10 py-4 rounded-sm text-lg shadow-2xl hover:shadow-primary/30 transition-all duration-300 group"
          >
            <Send className="h-5 w-5" />
            <span className="font-serif uppercase tracking-wider">
              Подписаться сейчас
            </span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="text-xs text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              политикой конфиденциальности
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// Основная страница
export default function PremiumPage() {
  return (
    <article className="space-y-4">
      {/* JSON-LD для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Навигация */}
      <nav className="flex items-center gap-2 py-4">
        <Link 
          href="/" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
        >
          <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
          Главная
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium text-foreground">Premium</span>
      </nav>

      {/* Секции */}
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection />

      {/* Финальный разделитель */}
      <div className="vintage-divider my-8" />
    </article>
  );
}