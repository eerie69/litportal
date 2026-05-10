// src/components/gates/PremiumGateModal.tsx
'use client';

import { createPortal } from 'react-dom';
import { X, Send, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

interface PremiumGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterTitle: string;
  telegramUrl: string;
}

export function PremiumGateModal({
  isOpen,
  onClose,
  chapterTitle,
  telegramUrl,
}: PremiumGateModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Блокируем скролл фона при открытой модалке
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTelegramClick = () => {
    // Опционально: трекинг перехода
    console.log('[Analytics] Telegram gate conversion');
    onClose();
  };

  // Обработка закрытия по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  // Рендерим через portal, чтобы модалка была поверх всего
  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
    >
      {/* Бэкдроп с анимацией */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Контент модалки */}
      <div className="relative w-full max-w-md bg-card border rounded-xl shadow-xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Иконка + заголовок */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 id="gate-title" className="text-lg font-semibold">
            Эксклюзивная глава
          </h2>
        </div>

        {/* Текст */}
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Глава <span className="font-medium text-foreground">"{chapterTitle}"</span> доступна только для подписчиков нашего Telegram-канала.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 pl-4 list-disc">
            <li>Читайте первыми — главы появляются в канале раньше других</li>
            <li>Без рекламы и водяных знаков</li>
            <li>Доступ к архиву всех продвинутых глав</li>
          </ul>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTelegramClick}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>Перейти в Telegram</span>
          </a>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border rounded-lg font-medium text-sm hover:bg-muted transition-colors"
          >
            Остаться на сайте
          </button>
        </div>

        {/* Футер модалки */}
        <p className="text-xs text-center text-muted-foreground pt-2">
          Уже подписано более <span className="font-medium">1 200</span> читателей
        </p>
      </div>
    </div>,
    document.body
  );
}