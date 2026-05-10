import { cn } from '@/lib/utils';

export function VintageDivider({ className }: { className?: string }) {
  return (
    <div className={cn('vintage-divider', className)} />
  );
}

export function VintageFrame({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('gramophone-frame', className)}>
      {children}
    </div>
  );
}

export function VintageBadge({ 
  children, 
  variant = 'default',
  className 
}: { 
  children: React.ReactNode;
  variant?: 'default' | 'premium' | 'new';
  className?: string;
}) {
  const variants = {
    default: 'bg-muted border-border text-muted-foreground',
    premium: 'vintage-badge',
    new: 'bg-emerald-900/40 text-emerald-400 border-emerald-800',
  };

  return (
    <span className={cn('px-2 py-1 rounded-sm text-[0.6rem] uppercase tracking-wider border', variants[variant], className)}>
      {children}
    </span>
  );
}

export function VintageButton({ 
  children, 
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={cn('vintage-btn px-6 py-3 rounded-sm', className)}
      {...props}
    >
      {children}
    </button>
  );
}