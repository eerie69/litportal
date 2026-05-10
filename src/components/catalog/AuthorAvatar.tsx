//src/components/catalog/AuthorAvatar.tsx:
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AuthorAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: number;
}

const getDiceBear = (seed: string) =>
  `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(seed.trim().replace(/[^a-zA-Z0-9]/g, '-'))}&backgroundColor=c0aede,d1d4f9&scale=90`;

export function AuthorAvatar({ name, avatarUrl, size = 96 }: AuthorAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showDiceBear = !avatarUrl || imageError;

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-muted/30 border-2 border-border bg-gradient-to-br from-primary/10 to-primary/5">
      {showDiceBear ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getDiceBear(name)}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={avatarUrl}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}