// src/lib/validation.ts — улучшенная версия
import { z } from 'zod';
import { AuthorSchema, BookSchema, ChapterSchema } from './types';
import path from 'path';
import fs from 'fs/promises';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

export type ValidationResult<T> = {
  data: T[];
  errors: string[];
};

// Флаг для определения окружения
const isDev = process.env.NODE_ENV === 'development';

async function readJsonFile<T>(filename: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, filename);
  
  // Логи только в разработке
  if (isDev) console.log(`[DataLoader] Чтение: ${filePath}`);
  
  try {
    await fs.access(filePath);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(fileContent) as T[];
    
    // Логи только в разработке
    if (isDev) console.log(`[DataLoader] ✅ Загружено ${parsed.length} записей из ${filename}`);
    return parsed;
  } catch (err: any) {
    // ❌ Ошибки логируем всегда (важно для отладки в проде)
    console.error(`[DataLoader] ❌ Ошибка чтения ${filename}:`, {
      path: filePath,
      error: err.message,
      code: err.code,
    });
    return [];
  }
}

export async function loadAndValidateData<T>(
  filename: string,
  schema: z.ZodSchema<T[]>
): Promise<ValidationResult<T>> {
  const errors: string[] = [];
  
  // Логи только в разработке
  if (isDev) console.log(`[Validation] Начало валидации: ${filename}`);
  
  const rawData = await readJsonFile<T>(filename);
  
  if (rawData.length === 0) {
    errors.push(`Файл пуст или не прочитан: ${filename}`);
    return { data: [], errors };
  }
  
  const result = schema.safeParse(rawData);
  
  if (!result.success) {
    const issueMessages = result.error.issues.map(e => {
      const path = e.path.join('.') || 'root';
      let details = '';
      
      if ('received' in e) {
        details = ` (получено: ${JSON.stringify((e as any).received)?.slice(0, 100)})`;
      } else if ('expected' in e) {
        details = ` (ожидалось: ${(e as any).expected})`;
      }
      
      return `[${path}] ${e.message}${details}`;
    });
    errors.push(...issueMessages);
    // Ошибки валидации логируем всегда
    console.error(`[Validation] ❌ Ошибки в ${filename}:`, issueMessages);
    return { data: [], errors };
  }
  
  // Логи только в разработке
  if (isDev) console.log(`[Validation] ✅ Валидация пройдена: ${filename} (${result.data.length} записей)`);
  return { data: result.data, errors: [] };
}

export const AuthorsArraySchema = z.array(AuthorSchema);
export const BooksArraySchema = z.array(BookSchema);
export const ChaptersArraySchema = z.array(ChapterSchema);

export async function getValidatedData<T>(
  filename: string,
  schema: z.ZodSchema<T[]>,
  fallback: T[] = []
): Promise<T[]> {
  const result = await loadAndValidateData(filename, schema);
  
  if (result.errors.length > 0) {
    // Предупреждения только в разработке
    if (isDev) {
      console.warn(`[Validation] ${filename} имеет ошибки (используется fallback):`, result.errors);
    }
    return fallback;
  }
  
  return result.data;
}