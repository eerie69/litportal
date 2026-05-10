// src/app/books/page.tsx
import { Suspense } from 'react';
import BooksContent from './BooksContent';

export default function BooksPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Загрузка...</div>}>
      <BooksContent />
    </Suspense>
  );
}