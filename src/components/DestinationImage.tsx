import { useState } from 'react';
import { REGION_BADGE_STYLES } from '../data/destinations';
import type { RegionName } from '../types/destination';

interface DestinationImageProps {
  src: string;
  alt: string;
  region: RegionName;
  city: string;
  name: string;
  dexNumber: string;
  className?: string;
}

export function DestinationImage({
  src,
  alt,
  region,
  city,
  name,
  dexNumber,
  className = 'w-full h-full object-cover',
}: DestinationImageProps) {
  const [hasError, setHasError] = useState(false);
  const style = REGION_BADGE_STYLES[region];

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${style.gradient} flex flex-col justify-between p-4 select-none`}
        role="img"
        aria-label={alt}
      >
        <div className="flex items-center justify-between text-xs font-mono font-bold text-[#434655]">
          <span>No.{dexNumber}</span>
          <span>{region}</span>
        </div>
        <div className="my-auto text-center px-2">
          <p className="text-[11px] font-semibold tracking-wider text-[#434655] mb-1">
            {city}
          </p>
          <p className="text-lg font-extrabold tracking-tight text-[#111c2d] leading-snug">
            {name}
          </p>
        </div>
        <div className="text-[11px] text-center font-medium text-[#737686]">
          Korea Travel Dex
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
