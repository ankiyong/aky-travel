import { ArrowRight, Bookmark, ChevronRight, Star } from 'lucide-react';
import type { Destination } from '../types/destination';
import { DestinationImage } from './DestinationImage';

interface FeaturedBentoProps {
  featured: Destination;
  topRanked: Destination[];
  isCollected: (id: string) => boolean;
  onToggleCollect: (id: string) => void;
  onSelectDestination: (destination: Destination) => void;
  onViewAllRanking: () => void;
}

export function FeaturedBento({
  featured,
  topRanked,
  isCollected,
  onToggleCollect,
  onSelectDestination,
  onViewAllRanking,
}: FeaturedBentoProps) {
  const featuredCollected = isCollected(featured.id);

  return (
    <section
      className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
      aria-label="금주의 추천 여행지 및 인기 랭킹"
    >
      <div className="lg:col-span-8 bg-white rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2 text-[12px]">
            <span className="font-mono font-bold text-[#855300] tracking-wider">
              EDITOR&apos;S CHOICE
            </span>
            <span className="text-[#c3c6d7]" aria-hidden="true">
              ·
            </span>
            <span className="font-medium text-[#737686]">
              이번 주 추천 도감 스팟
            </span>
          </div>
          <span className="font-mono text-[16px] text-[#737686] font-bold tabular-nums">
            No.{featured.dexNumber}
          </span>
        </div>

        <div
          onClick={() => onSelectDestination(featured)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectDestination(featured);
            }
          }}
          className="relative w-full h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004ac6]"
        >
          <DestinationImage
            src={featured.heroImageUrl || featured.imageUrl}
            alt={featured.name}
            region={featured.region}
            city={featured.city}
            name={featured.name}
            dexNumber={featured.dexNumber}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111c2d]/85 via-[#111c2d]/30 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2 text-[12px]">
            <span className="px-3 py-1 rounded-full bg-white/92 backdrop-blur-md text-[#004ac6] font-bold shadow-sm">
              {featured.region} · {featured.city}
            </span>
            {featured.heritageBadge && (
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/92 backdrop-blur-md text-[#111c2d] font-medium shadow-sm">
                {featured.heritageBadge}
              </span>
            )}
          </div>

          {featuredCollected && (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#ae0010] text-white font-mono text-[11px] font-bold tracking-widest rotate-[-10deg] shadow-md">
              수집완료
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 text-white">
            <div className="flex items-center gap-2 text-[12px] text-white/90 font-medium">
              {featured.theme.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
            <h2 className="text-[26px] sm:text-[30px] leading-tight font-extrabold text-white drop-shadow-sm">
              {featured.name}
            </h2>
            <p className="text-[14px] text-white/90 line-clamp-1">
              {featured.summary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-3 text-[13px] text-[#434655]">
            <div className="flex items-center gap-1">
              <Star
                className="w-4 h-4 text-[#fea619] fill-[#fea619]"
                aria-hidden="true"
              />
              <span className="font-bold text-[#111c2d] tabular-nums">
                {featured.rating.toFixed(2)}
              </span>
              <span className="tabular-nums">
                (리뷰 {featured.reviewCount.toLocaleString()}개)
              </span>
            </div>
            <span aria-hidden="true">·</span>
            <span className="text-[#004ac6] font-semibold">
              {featured.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectDestination(featured)}
              className="px-4 py-2.5 rounded-full bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#003ea8] transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <span>도감 상세 카드 보기</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onToggleCollect(featured.id)}
              aria-label={
                featuredCollected ? '도감 스탬프 해제' : '도감 스탬프 수집'
              }
              aria-pressed={featuredCollected}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                featuredCollected
                  ? 'bg-[#ffdad6] text-[#ae0010]'
                  : 'bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#434655]'
              }`}
            >
              <Bookmark
                className={`w-4.5 h-4.5 ${featuredCollected ? 'fill-current' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 bg-white rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-[18px] font-bold text-[#111c2d]">
            도감 수집 TOP 5
          </h2>
          <span className="text-[12px] font-medium text-[#737686]">
            인기 스탬프 순
          </span>
        </div>

        <div className="flex flex-col divide-y divide-[#dee8ff]/60">
          {topRanked.map((item, idx) => {
            const rankNum = String(idx + 1).padStart(2, '0');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectDestination(item)}
                className="py-3 flex items-center justify-between gap-3 group text-left cursor-pointer focus:outline-none focus-visible:bg-[#f0f3ff] rounded-lg px-1 -mx-1 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg font-mono text-[12px] flex items-center justify-center font-bold shrink-0 tabular-nums ${
                      idx === 0
                        ? 'bg-[#004ac6] text-white'
                        : idx < 3
                          ? 'bg-[#dee8ff] text-[#111c2d]'
                          : 'bg-[#f0f3ff] text-[#434655]'
                    }`}
                  >
                    {rankNum}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[15px] font-bold text-[#111c2d] group-hover:text-[#004ac6] transition-colors truncate">
                      {item.name}
                    </span>
                    <span className="text-[12px] text-[#434655] truncate">
                      {item.region} · {item.city}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`font-mono text-[12px] font-bold tabular-nums ${
                      idx < 3 ? 'text-[#004ac6]' : 'text-[#737686]'
                    }`}
                  >
                    {item.stampRate}%
                  </span>
                  <ChevronRight
                    className="w-4 h-4 text-[#737686] group-hover:translate-x-0.5 group-hover:text-[#004ac6] transition-transform"
                    aria-hidden="true"
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-3">
          <button
            type="button"
            onClick={onViewAllRanking}
            className="w-full py-2.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] text-[#111c2d] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>전체 인기순 정렬로 보기</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
