import { Award, MapPin, X } from 'lucide-react';
import { REGION_BADGE_STYLES, REGIONS } from '../data/destinations';
import type { Destination, RegionKey, RegionName } from '../types/destination';

interface MissionBannerProps {
  onOpenRegionalModal: () => void;
}

export function MissionBanner({ onOpenRegionalModal }: MissionBannerProps) {
  return (
    <section className="w-full bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white rounded-[28px] p-6 md:p-9 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
      <div className="flex flex-col gap-2 max-w-xl z-10">
        <span className="font-mono text-[11px] font-bold tracking-wider text-[#dbe1ff]">
          SEASON 1 · KOREA HERITAGE CHALLENGE
        </span>
        <h2 className="text-[24px] sm:text-[30px] leading-tight font-extrabold text-white">
          전국 6대 권역 스탬프를 모두 모아보세요
        </h2>
        <p className="text-[14px] text-[#dbe1ff] leading-relaxed">
          수도권부터 제주권까지 전국의 대표 명소에 발도장 스탬프를 찍고 나만의
          대한민국 여행 아카이브를 완성해보세요.
        </p>
      </div>

      <div className="z-10 shrink-0">
        <button
          type="button"
          onClick={onOpenRegionalModal}
          className="px-6 py-3.5 rounded-full bg-[#fea619] text-[#2a1700] font-bold text-[15px] hover:brightness-105 transition-all shadow-md flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Award className="w-5 h-5" aria-hidden="true" />
          <span>권역별 수집 현황 보기</span>
        </button>
      </div>

      <div
        className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full border-8 border-white/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-20 -bottom-16 w-40 h-40 rounded-full border-4 border-white/10 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

interface RegionalProgressModalProps {
  isOpen: boolean;
  destinations: Destination[];
  collectedIds: string[];
  onClose: () => void;
  onSelectRegion: (region: RegionKey) => void;
}

export function RegionalProgressModal({
  isOpen,
  destinations,
  collectedIds,
  onClose,
  onSelectRegion,
}: RegionalProgressModalProps) {
  if (!isOpen) return null;

  const regionalItems = REGIONS.filter((r) => r.key !== 'all').map((r) => {
    const items = destinations.filter((d) => d.regionKey === r.key);
    const collected = items.filter((d) => collectedIds.includes(d.id)).length;
    const pct = items.length > 0 ? Math.round((collected / items.length) * 100) : 0;
    return {
      key: r.key,
      name: r.label as RegionName,
      total: items.length,
      collected,
      pct,
    };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263143]/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="regional-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-[28px] shadow-2xl p-6 sm:p-7 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              id="regional-modal-title"
              className="text-[20px] font-bold text-[#111c2d]"
            >
              권역별 스탬프 수집 현황
            </h3>
            <p className="text-[13px] text-[#434655] mt-0.5">
              권역을 클릭하면 해당 지역의 여행지 목록으로 바로 이동합니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="현황 창 닫기"
            className="w-9 h-9 rounded-full bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#434655] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {regionalItems.map((reg) => {
            const style = REGION_BADGE_STYLES[reg.name];
            return (
              <button
                key={reg.key}
                type="button"
                onClick={() => {
                  onSelectRegion(reg.key);
                  onClose();
                }}
                className="w-full p-3.5 rounded-2xl bg-[#f0f3ff] hover:bg-[#e7eeff] transition-colors flex flex-col gap-2 text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${style.bg} ${style.text}`}
                    >
                      {reg.name}
                    </span>
                    <span className="text-[13px] font-semibold text-[#111c2d] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#737686]" aria-hidden="true" />
                      {reg.collected} / {reg.total}곳 수집
                    </span>
                  </div>
                  <span className="font-mono text-[13px] font-bold text-[#004ac6] tabular-nums">
                    {reg.pct}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#dee8ff] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#004ac6] transition-all duration-300"
                    style={{ width: `${reg.pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
