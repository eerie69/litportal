// src/app/api/books/route.ts
import { NextResponse } from 'next/server';
import { loadAndValidateData } from '@/lib/validation';
import { BooksArraySchema } from '@/lib/validation';

export async function GET() {
  try {
    const { data } = await loadAndValidateData('books.json', BooksArraySchema);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load books' }, { status: 500 });
  }
}