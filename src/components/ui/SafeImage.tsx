'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/assets/products/hot-water-skid.png',
  className,
  ...rest
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={error ? fallbackSrc : imgSrc}
      alt={alt || 'Alkota Industrial Cleaning Equipment'}
      className={className}
      onError={() => {
        if (!error) {
          setError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
