// scripts/import-royalroad-api.ts
// 🟢 Импорт данных через @fsoc/royalroadl-api — полная версия с поддержкой username/numeric ID
// ⚠️ Библиотека парсит HTML — может потребовать обновления при изменении вёрстки Royal Road

import fs from 'fs/promises';
import path from 'path';
import { RoyalRoadAPI } from '@fsoc/royalroadl-api';

// 🔧 Конфигурация
const CONFIG = {
  telegramChannel: 'https://t.me//mirror_book', // 🔴 ЗАМЕНИТЕ НА СВОЙ КАНАЛ!
  outputDir: path.join(process.cwd(), 'src', 'data'),
  
  // === Авторы: можно указывать username (строка) ИЛИ numeric userId (число) ===
  authorIdentifiers: [
    85685, 200905, 74010, 121895, 109198, 32350, 359502, 202232, 190997,
    235018, 111987, 31470, 111728, 103835, 105290, 107213, 97247, 219867,
    73941, 173018, 338123, 118286, 119940, 226235, 382599, 306974, 87585,
    4890, 37256, 122394, 142450, 27392, 85974, 112402, 21353, 249346, 215525,
    252322, 204860, 100060, 16306, 194299, 162646, 26826, 147723, 91269,
    303818, 120381, 275654, 729989, 127166, 200074, 251991, 241535, 136581,
    174565, 149198, 110187, 209637, 184977, 120679, 261544, 685913, 792999,
    208505, 279837, 769495, 69730, 97397, 265819, 453784, 139407, 266235,
    264030, 61287, 132647, 274840, 100596, 364686, 251640, 213771, 821238,
    372027, 346443, 472916, 188373, 326727, 104895, 260397, 122588, 89460,
    228839, 122908, 65412, 292180, 413099, 125973, 311978, 278660, 252421,
    166514, 24376, 298966, 88969, 146597, 133341, 532463, 818365, 623895,
    237857, 293473, 494135, 109299, 143496, 27879, 551280, 499524, 625426,
    342415, 412962, 269336, 545832, 95278, 73031, 498119, 296737, 244859,
    121716, 54442, 94286, 285139, 307197, 349732, 270595, 81107, 394190,
    148343, 190733, 180638, 303906, 57063, 68516, 100454, 329325, 333987,
    194525, 444650, 185072, 21586, 856228, 307227, 22762, 319309, 411129,
    239534, 88935, 364313, 353985, 133934
  ],
  
  // === Fiction IDs для прямого доступа к книгам ===
  fictionIds: [
    10000, 101411, 104434, 105968, 106111, 107125, 107917, 109544, 110463,
    111304, 11209, 11371, 115949, 116137, 118891, 12024, 121319, 122502,
    122588, 125973, 127166, 127826, 132647, 133341, 133934, 136581, 138567,
    138714, 139212, 139407, 143496, 146597, 147723, 148343, 149198, 149866,
    156215, 159163, 162646, 164615, 166224, 166226, 166227, 166255, 173018,
    174565, 180638, 184977, 185072, 188373, 190733, 190997, 19250, 194299,
    194525, 200074, 200905, 202232, 204860, 208505, 209637, 213771, 215525,
    21586, 219867, 22518, 226235, 22762, 228839, 235018, 237857, 239534,
    241535, 24376, 244859, 249346, 251640, 251991, 252322, 252421, 260397,
    261544, 26294, 264030, 265819, 266235, 26826, 269336, 270595, 27325,
    274840, 275654, 278660, 27879, 279837, 285139, 292180, 293473, 296737,
    298966, 30321, 303818, 303906, 306974, 307197, 307227, 311978, 31470,
    319309, 32350, 326727, 329325, 33024, 333987, 338123, 342415, 346443,
    349732, 353985, 35669, 359502, 36049, 364313, 364686, 372027, 37256,
    37438, 37934, 37951, 382599, 39408, 394190, 39751, 40786, 411129, 412962,
    413099, 41521, 41656, 42226, 43938, 43947, 444650, 45370, 45384, 453784,
    47038, 472916, 47982, 48893, 4890, 48969, 494135, 498119, 499524, 50553,
    51358, 52083, 52889, 532463, 53765, 54442, 545832, 551280, 5701, 57063,
    58187, 59663, 59967, 60277, 60284, 61244, 61287, 623895, 625426, 62881,
    63759, 65058, 65226, 65412, 66318, 66455, 67742, 68516, 685913, 68679,
    69497, 69730, 69923, 70234, 73031, 73095, 73452, 73941, 74010, 75798,
    76288, 76677, 769495, 78912, 79094, 792999, 79738, 80821, 81002, 81107,
    818365, 81952, 821238, 83080, 856228, 85685, 85769, 85974, 86047, 87585,
    87760, 88935, 88969, 89034, 89228, 89460, 89859, 91269, 92144, 94286,
    94957, 94966, 95097, 95278, 97247, 97397
  ],
  
  // ⚙️ Настройки запросов
  delayMs: 3000,        // Задержка между запросами (уважайте сервер!)
  retryAttempts: 3,     // Количество попыток при ошибке
};

// 📦 Типы данных (полностью независимые от библиотеки)
export interface RoyalRoadFiction {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorSlug: string;
  description: string;
  coverUrl?: string;
  genres: string[];
  tags: string[];
  status: 'ongoing' | 'completed' | 'hiatus' | 'dropped';
  royalRoadUrl: string;
  lastUpdate: string;
  stats: {
    views: number;
    followers: number;
    rating: number;
    reviews: number;
    pages: number;
  };
}

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  bookSlug: string;
  number?: number;
  contentPreview: string;
  isPremium: boolean;
  telegramUrl: string;
  publishedAt: string;
  wordCount?: number;
  royalRoadUrl?: string;
}

export interface RoyalRoadAuthor {
  id: string;
  slug: string;
  name: string;
  bio: string;
  avatarUrl: string;
  royalRoadUrl: string;
  stats: {
    followers: number;
    following: number;
    fictionsCount: number;
  };
  fictions: string[]; // массив slug'ов книг этого автора
}

// ============================================================================
// 🔐 Утилиты для безопасной работы с unknown (обход строгих типов библиотеки)
// ============================================================================

function getSafe(obj: unknown, path: string, fallback: unknown = null): unknown {
  try {
    // @ts-ignore - динамический доступ к вложенным свойствам
    return path.split('.').reduce((acc: any, key) => acc?.[key], obj) ?? fallback;
  } catch {
    return fallback;
  }
}

function toStr(val: unknown, fallback = ''): string {
  const v = val ?? fallback;
  return typeof v === 'string' ? v : String(v);
}

function toNum(val: unknown, fallback = 0): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
}

function toArr(val: unknown): unknown[] {
  return Array.isArray(val) ? val : [];
}

// ✅ Mapper для .map() — принимает только один параметр (совместимость с Array.map)
const mapToStr = (arr: unknown[]): string[] => arr.map((v: unknown) => toStr(v));

// ============================================================================
// 🔄 Инициализация API и вспомогательные функции
// ============================================================================

function createAPI(): RoyalRoadAPI {
  // @ts-ignore - библиотека может иметь строгий конструктор
  return new RoyalRoadAPI();
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 🔄 Retry с экспоненциальным бэк-оффом
async function withRetry<T>(fn: () => Promise<T>, attempts = CONFIG.retryAttempts): Promise<T | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err: any) {
      const msg = err?.message || String(err);
      
      // 404 — ресурс не найден, не повторяем
      if (msg.includes('404') || msg.includes('Not Found')) {
        console.warn(`⚠️ 404 (${i + 1}/${attempts})`);
        return null;
      }
      
      // 429 — rate limit, ждём и повторяем
      if (msg.includes('429') && i < attempts - 1) {
        const wait = CONFIG.delayMs * Math.pow(2, i);
        console.warn(`⚠️ Rate limit, жду ${wait}мс...`);
        await sleep(wait);
        continue;
      }
      
      // Последняя попытка — логируем ошибку
      if (i === attempts - 1) {
        console.error(`❌ Ошибка после ${attempts} попыток:`, msg);
        return null;
      }
      
      await sleep(CONFIG.delayMs);
    }
  }
  return null;
}

// 🔍 Резолвер: username → numeric userId (через RSS-поиск книг автора)
async function resolveUsernameToId(username: string): Promise<number | null> {
  try {
    // Ищем книги автора через RSS (быстро и не требует авторизации)
    const rssUrl = `https://www.royalroad.com/fiction/search/rss?keyword=${encodeURIComponent(username)}&author=${username}`;
    const res = await fetch(rssUrl, { 
      headers: { 'User-Agent': 'LitPortal/1.0 (educational project)' }
    });
    if (!res.ok) return null;
    
    const xml = await res.text();
    // Ищем ссылку на профиль в формате /profile/123456
    const match = xml.match(/https:\/\/www\.royalroad\.com\/profile\/(\d+)/);
    if (match?.[1]) {
      console.log(`🔗 Resolved @${username} → userId ${match[1]}`);
      return parseInt(match[1], 10);
    }
    return null;
  } catch (e) {
    console.warn(`⚠️ Не удалось резолвить ${username}:`, e);
    return null;
  }
}

// 🏗️ Сборка объекта автора из сырых данных API
function buildAuthorObject(data: unknown, originalId: string | number, numericId: number | null): RoyalRoadAuthor {
  // @ts-ignore - безопасный доступ к полям
  const name = toStr(getSafe(data, 'name') || getSafe(data, 'username') || getSafe(data, 'displayName') || originalId);
  const slug = toStr(getSafe(data, 'slug') || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
  // @ts-ignore
  const stats = getSafe(data, 'stats') || {};
  
  return {
    id: `auth-${slug}`,
    slug,
    name,
    bio: toStr(getSafe(data, 'bio') || getSafe(data, 'description'), `Автор на Royal Road`)
      .replace(/<[^>]*>/g, '').slice(0, 1000),
    avatarUrl: toStr(getSafe(data, 'avatar') || getSafe(data, 'avatarUrl') || getSafe(data, 'image')) || 
               `https://via.placeholder.com/150/6366f1/ffffff?text=${name.charAt(0).toUpperCase()}`,
    royalRoadUrl: numericId 
      ? `https://www.royalroad.com/profile/${numericId}` 
      : `https://www.royalroad.com/profile/${originalId}`,
    stats: {
      followers: toNum(getSafe(stats, 'followers')),
      following: toNum(getSafe(stats, 'following')),
      fictionsCount: toNum(getSafe(stats, 'fictions') || getSafe(stats, 'fictionsCount')),
    },
    fictions: [],
  };
}

// ============================================================================
// 🔄 Функции получения данных
// ============================================================================

// 🔄 Профиль автора — принимает username (string) ИЛИ numeric userId (number)
async function fetchAuthorProfile(api: RoyalRoadAPI, identifier: string | number): Promise<RoyalRoadAuthor | null> {
  return withRetry(async () => {
    const isNumeric = typeof identifier === 'number' || /^\d+$/.test(String(identifier));
    const label = isNumeric ? `#${identifier}` : `@${identifier}`;
    console.log(`👤 Профиль: ${label}`);
    
    // @ts-ignore - библиотека может принимать string или number
    const res = await api.profile.getProfile(identifier);
    
    const data = (res as { success?: boolean; data?: unknown })?.success 
      ? (res as { data?: unknown }).data 
      : null;
    
    // Если не получилось и был username — пробуем резолвить в numeric ID
    if (!data && !isNumeric) {
      const userId = await resolveUsernameToId(String(identifier));
      if (userId) {
        console.log(`🔄 Повторный запрос с userId=${userId}`);
        // @ts-ignore
        const res2 = await api.profile.getProfile(userId);
        const data2 = (res2 as { success?: boolean; data?: unknown })?.success 
          ? (res2 as { data?: unknown }).data 
          : null;
        if (data2) return buildAuthorObject(data2, identifier, userId);
      }
      return null;
    }
    
    if (!data) return null;
    return buildAuthorObject(data, identifier, isNumeric ? Number(identifier) : null);
  });
}

// 🔄 Книга по Fiction ID
async function fetchFictionById(api: RoyalRoadAPI, fictionId: number): Promise<RoyalRoadFiction | null> {
  return withRetry(async () => {
    console.log(`📚 Книга: #${fictionId}`);
    
    // @ts-ignore - обход строгих типов библиотеки
    const res = await api.fiction.getFiction(fictionId);
    const data = (res as { success?: boolean; data?: unknown })?.success 
      ? (res as { data?: unknown }).data 
      : null;
    
    if (!data) return null;
    
    // @ts-ignore - безопасное извлечение полей
    const title = toStr(getSafe(data, 'title'), `Fiction #${fictionId}`);
    const slug = toStr(getSafe(data, 'slug'), title).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80);
    
    // @ts-ignore
    const authorObj = getSafe(data, 'author') || {};
    const authorName = toStr(getSafe(authorObj, 'name') || getSafe(authorObj, 'username') || getSafe(authorObj, 'displayName'), 'Unknown');
    const authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
    
    // @ts-ignore
    const stats = getSafe(data, 'stats') || {};
    // @ts-ignore
    const score = getSafe(stats, 'score') || {};
    
    // Рейтинг: пробуем несколько источников
    const ratingVal = toNum(
      getSafe(score, 'average') || getSafe(score, 'value') || getSafe(stats, 'rating') || 
      (getSafe(stats, 'ratings') ? 4.5 : 0)
    );
    
    // Статус: маппинг из API
    const rawStatus = toStr(getSafe(data, 'status')).toUpperCase();
    const statusMap: Record<string, RoyalRoadFiction['status']> = {
      'ONGOING': 'ongoing', 'COMPLETED': 'completed', 'HIATUS': 'hiatus', 'DROPPED': 'dropped'
    };
    const status = statusMap[rawStatus] || 'ongoing';
    
    // Обложка
    // @ts-ignore
    const coverUrl = toStr(getSafe(data, 'image') || getSafe(data, 'coverUrl') || getSafe(data, 'cover')) || undefined;
    
    // Жанры и теги
    // @ts-ignore
    const genres = mapToStr(toArr(getSafe(data, 'genres') || getSafe(data, 'tags'))).slice(0, 3);
    // @ts-ignore
    const tags = mapToStr(toArr(getSafe(data, 'tags')));
    
    // Дата последнего обновления
    // @ts-ignore
    const chapters = toArr(getSafe(data, 'chapters'));
    const lastCh = chapters[0];
    // @ts-ignore
    const lastUpdate = toStr(
      getSafe(lastCh, 'publishedAt') || getSafe(lastCh, 'date') || 
      getSafe(data, 'publishedAt') || getSafe(data, 'updatedAt') || 
      new Date().toISOString()
    );
    
    // Просмотры
    // @ts-ignore
    const viewsObj = getSafe(stats, 'views') || {};
    const totalViews = toNum(getSafe(viewsObj, 'total') || getSafe(viewsObj, 'all') || getSafe(stats, 'views'));
    
    return {
      id: String(fictionId),
      slug,
      title,
      author: authorName,
      authorSlug,
      description: toStr(getSafe(data, 'description'), '').replace(/<[^>]*>/g, '').slice(0, 2000),
      coverUrl,
      genres,
      tags,
      status,
      royalRoadUrl: `https://www.royalroad.com/fiction/${fictionId}/${slug}`,
      lastUpdate,
      stats: {
        views: totalViews,
        followers: toNum(getSafe(stats, 'followers')),
        rating: ratingVal,
        reviews: toNum(getSafe(stats, 'ratings')),
        pages: toNum(getSafe(stats, 'pages')),
      },
    };
  });
}

// 🔄 Главы книги — ✅ Гарантированный возврат массива
async function fetchChapters(api: RoyalRoadAPI, fictionId: number, fictionSlug: string): Promise<Chapter[]> {
  const result = await withRetry(async (): Promise<Chapter[]> => {
    console.log(`📄 Главы: #${fictionId}`);
    
    // @ts-ignore - пробуем разные методы получения глав
    let res: unknown;
    if (typeof (api as any).fiction?.getChapters === 'function') {
      // @ts-ignore
      res = await (api as any).fiction.getChapters(fictionId);
    } else if (typeof (api as any).chapter?.getChaptersForFiction === 'function') {
      // @ts-ignore
      res = await (api as any).chapter.getChaptersForFiction(fictionId);
    } else {
      console.warn(`⚠️ Нет метода для получения глав #${fictionId}`);
      return [];
    }
    
    const success = (res as { success?: boolean })?.success;
    if (!success) return [];
    
    // @ts-ignore - извлекаем массив глав
    const rawData = (res as { data?: unknown })?.data;
    const chapters = Array.isArray(rawData) ? rawData : 
                    Array.isArray((rawData as { chapters?: unknown[] })?.chapters) ? 
                    (rawData as { chapters: unknown[] }).chapters : [];
    
    return chapters.map((ch: unknown, idx: number): Chapter => {
      const chTitle = toStr(getSafe(ch, 'title') || getSafe(ch, 'name'), `Chapter ${idx + 1}`);
      // @ts-ignore
      const pubDate = toStr(getSafe(ch, 'publishedAt') || getSafe(ch, 'date') || getSafe(ch, 'createdAt'), new Date().toISOString());
      
      const rawContent = toStr(getSafe(ch, 'content') || getSafe(ch, 'description') || getSafe(ch, 'excerpt'));
      const preview = rawContent.replace(/<[^>]*>/g, '').trim().slice(0, 300) + (rawContent.length > 300 ? '...' : '');
      
      const numMatch = chTitle.match(/(?:Chapter|Глава)\s*(\d+(?:\.\d+)?)/i);
      const chapterNum = numMatch ? parseFloat(numMatch[1]) : undefined;
      
      const isPremium = Boolean(getSafe(ch, 'isPremium') || getSafe(ch, 'isPaid') || getSafe(ch, 'isLocked'));
      const chSlug = `${fictionSlug}-ch-${chapterNum || idx + 1}${isPremium ? '-premium' : ''}`;
      
      return {
        id: `${fictionSlug}-chapter-${idx + 1}`,
        slug: chSlug,
        title: chTitle,
        bookSlug: fictionSlug,
        number: chapterNum,
        contentPreview: preview || `Превью: "${chTitle}"`,
        isPremium,
        telegramUrl: `${CONFIG.telegramChannel}/${fictionSlug}-${chapterNum || idx + 1}`,
        publishedAt: pubDate,
        wordCount: toNum(getSafe(ch, 'wordCount')) || undefined,
        royalRoadUrl: toStr(getSafe(ch, 'url')) || `https://www.royalroad.com/fiction/${fictionId}/chapter/${getSafe(ch, 'id') || idx + 1}`,
      };
    });
  });
  
  // ✅ Гарантируем возврат массива, даже если withRetry вернул null
  return result ?? [];
}

// ============================================================================
// 💾 Утилиты сохранения
// ============================================================================

async function saveJson(filename: string, data: unknown): Promise<void> {
  const filepath = path.join(CONFIG.outputDir, filename);
  await fs.mkdir(CONFIG.outputDir, { recursive: true });
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filepath, json, 'utf-8');
  console.log(`💾 Сохранено: ${filename} (${Buffer.byteLength(json, 'utf-8')} байт)`);
}

// ============================================================================
// 🚀 Главная функция
// ============================================================================

async function main() {
  console.log('🚀 Импорт данных из RoyalRoad через @fsoc/royalroadl-api...\n');
  
  // Устанавливаем fetch глобально для совместимости с библиотекой
  // @ts-ignore
  if (typeof global.fetch === 'undefined') {
    global.fetch = fetch;
  }
  
  const api = createAPI();
  const authorsMap = new Map<string, RoyalRoadAuthor>();
  const books: RoyalRoadFiction[] = [];
  const chapters: Chapter[] = [];
  
  // === ШАГ 1: Загрузка профилей авторов ===
  console.log(`📋 Этап 1: Авторы (${CONFIG.authorIdentifiers.length})`);
  
  for (const identifier of CONFIG.authorIdentifiers) {
    const author = await fetchAuthorProfile(api, identifier);
    
    if (author) {
      authorsMap.set(author.slug, author);
      console.log(`✅ ${identifier} → ${author.name}`);
    } else {
      console.warn(`⚠️ Пропущено: ${identifier}`);
    }
    
    await sleep(CONFIG.delayMs);
  }
  
  // === ШАГ 2: Загрузка книг по Fiction IDs ===
  console.log(`\n📋 Этап 2: Книги (${CONFIG.fictionIds.length} ID)`);
  
  for (const fid of CONFIG.fictionIds) {
    const fiction = await fetchFictionById(api, fid);
    
    if (!fiction) {
      console.warn(`⚠️ Пропущено: #${fid}`);
      continue;
    }
    
    // Связываем книгу с автором
    const existing = authorsMap.get(fiction.authorSlug);
    if (existing && !existing.fictions.includes(fiction.slug)) {
      existing.fictions.push(fiction.slug);
    } else if (!existing) {
      // Создаём "заглушку" автора, если не нашли в списке
      authorsMap.set(fiction.authorSlug, {
        id: `auth-${fiction.authorSlug}`,
        slug: fiction.authorSlug,
        name: fiction.author,
        bio: `Автор книги "${fiction.title}"`,
        avatarUrl: `https://via.placeholder.com/150/8b5cf6/ffffff?text=${fiction.author.charAt(0).toUpperCase()}`,
        royalRoadUrl: `https://www.royalroad.com/profile/${fiction.authorSlug}`,
        stats: { followers: 0, following: 0, fictionsCount: 1 },
        fictions: [fiction.slug],
      });
    }
    
    books.push(fiction);
    console.log(`✅ "${fiction.title}" (#${fid})`);
    
    // === ШАГ 3: Загрузка глав для этой книги ===
    const bookChapters = await fetchChapters(api, fid, fiction.slug);
    chapters.push(...bookChapters);
    
    await sleep(CONFIG.delayMs);
  }
  
  // === ФИНАЛ: Подготовка и сохранение данных ===
  const authors = Array.from(authorsMap.values());
  const premiumCount = chapters.filter(c => c.isPremium).length;
  
  console.log(`\n📊 Итоговая статистика:`);
  console.log(`   👤 Авторы: ${authors.length}`);
  console.log(`   📚 Книги: ${books.length}`);
  console.log(`   📄 Главы: ${chapters.length} (${premiumCount} премиум)`);
  console.log(`   🌐 Telegram: ${CONFIG.telegramChannel}`);
  
  // Сохранение файлов
  console.log(`\n💾 Сохранение данных...`);
  await saveJson('authors.json', authors);
  await saveJson('books.json', books);
  await saveJson('chapters.json', chapters);
  
  // Метаданные для фронтенда
  await saveJson('metadata.json', {
    lastSync: new Date().toISOString(),
    source: 'royalroad.com',
    apiLibrary: '@fsoc/royalroadl-api',
    counts: {
      authors: authors.length,
      books: books.length,
      chapters: chapters.length,
      premium: premiumCount,
    },
  });
  
  console.log(`\n🎉 ИМПОРТ ЗАВЕРШЁН!`);
  console.log(`\n🔄 Для применения изменений перезапустите сервер:`);
  console.log(`   npm run dev`);
  console.log(`\n⚠️ Важно:`);
  console.log(`   • Библиотека парсит HTML — следите за обновлениями`);
  console.log(`   • Уважайте rate limits Royal Road (delayMs: ${CONFIG.delayMs}мс)`);
  console.log(`   • Данные предназначены для учебного использования`);
}

// ============================================================================
// 🛡️ Обработка ошибок
// ============================================================================

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
});

main().catch(err => {
  console.error('❌ Критическая ошибка в main():', err);
  process.exit(1);
});