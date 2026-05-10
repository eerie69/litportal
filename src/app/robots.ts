// src/app/robots.ts
import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Не блокируем премиум-страницы! Они нужны для SEO.
        // Контент защищён на уровне UI, а не robots.txt
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        // Разрешаем индексацию изображений для OG-карточек
        crawlDelay: 0,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
    // Хост для Яндекс.Вебмастера (опционально)
    host: baseUrl,
  };
}