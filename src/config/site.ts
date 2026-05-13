// src/config/site.ts
export const siteConfig = {
  name: "LitPortal",
  description: "Каталог книг с эксклюзивными главами в Telegram",
  url: process.env.SITE_URL || "https://litportal.vercel.app",
  telegramChannel: process.env.TELEGRAM_CHANNEL_URL || "https://t.me/mirror_book",
  author: {
    name: "LitPortal Team",
    url: "https://t.me/mirror_book",
  },
  keywords: ["книги", "фантастика", "литрпг", "авторские книги", "телеграм канал"],
  ogImage: "/og-image.png",
  twitterHandle: "@your_handle",
};

export const seoDefaults = {
  titleTemplate: "%s | " + siteConfig.name,
  defaultTitle: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
  },
} as const;