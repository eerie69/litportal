// src/app/api/authors/route.ts
import { NextResponse } from 'next/server';
import { loadAndValidateData } from '@/lib/validation';
import { AuthorsArraySchema } from '@/lib/validation';

export async function GET() {
  try {
    const { data } = await loadAndValidateData('authors.json', AuthorsArraySchema);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load authors' }, { status: 500 });
  }
}