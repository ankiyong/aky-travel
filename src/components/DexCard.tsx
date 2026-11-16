import { ArrowUpRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { REGION_BADGE_STYLES } from '../data/destinations';
import type { Destination } from '../types/destination';
import { DestinationImage } from './DestinationImage';

interface DexCardProps {
  destination: Destination;
  collected: boolean;
  onToggleCollect: (id: string) => void;
  onSelect: (destination: Destination) => void;
}

export function DexCard({
  destination,
  collected,
  onToggleCollect,
  onSelect,
}: DexCardProps) {
  const badgeStyle = REGION_BADGE_STYLES[destination.region];

  return (
    <article
      onClick={() => onSelect(destination)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(destination);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${destination.name} 상세 정보 보기`}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004ac6]"
    >
      <div className="flex flex-col gap-3">
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#e7eeff]">
          <DestinationImage
            src={destination.imageUrl}
            alt={destination.name}
            region={destination.region}
            city={destination.city}
            name={destination.name}
            dexNumber={destination.dexNumber}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/92 backdrop-blur-sm text-[#111c2d] font-mono text-[11px] font-bold shadow-sm tabular-nums">
            No.{destination.dexNumber}
          </div>

          {collected && (
            <div className="animate-stamp-pop absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-[#ae0010] text-white font-mono text-[11px] font-bold tracking-widest shadow-md flex items-center gap-1 ring-2 ring-[#d52022]/30">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>수집완료</span>
            </div>
          )}

          <motion.button
            type="button"
            whileTap={{ scale: 0.82 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollect(destination.id);
            }}
            aria-label={
              collected
                ? `${destination.name} 도감 스탬프 해제`
                : `${destination.name} 도감 스탬프 수집`
            }
            aria-pressed={collected}
            title={collected ? '도감 수집됨' : '도감 스탬프 수집'}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/92 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
              collected
                ? 'text-[#ae0010]'
                : 'text-[#737686] hover:text-[#ae0010]'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${collected ? 'fill-current' : ''}`}
            />
          </motion.button>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${badgeStyle.bg} ${badgeStyle.text}`}
            >
              {destination.region} · {destination.city}
            </span>
            <span className="font-mono text-[11px] text-[#737686] tabular-nums">
              #{destination.dexNumber}
            </span>
          </div>

          <h3 className="text-[17px] font-bold text-[#111c2d] group-hover:text-[#004ac6] transition-colors truncate pt-0.5">
            {destination.name}
          </h3>
          <p className="text-[13px] text-[#434655] line-clamp-1">
            {destination.summary}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#f0f3ff]">
        <div className="flex flex-wrap gap-1.5">
          {destination.theme.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-[#e7eeff] text-[#434655] text-[11px] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
        <ArrowUpRight
          className="w-4 h-4 text-[#737686] group-hover:text-[#004ac6] transition-colors shrink-0"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
