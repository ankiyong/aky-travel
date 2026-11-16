import { ArrowRight, Award } from 'lucide-react';
import type { ViewMode } from '../types/destination';

interface CollectionDashboardProps {
  collectedCount: number;
  totalCount: number;
  viewMode: ViewMode;
  onSwitchViewMode: (mode: ViewMode) => void;
}

function getExplorerTier(collected: number, total: number) {
  if (collected >= total && total > 0) {
    return { level: 'LEVEL 4 마스터', nextRemaining: 0 };
  }
  if (collected >= 9) {
    return { level: 'LEVEL 3 수집가', nextRemaining: total - collected };
  }
  if (collected >= 3) {
    return { level: 'LEVEL 2 탐험가', nextRemaining: 9 - collected };
  }
  return { level: 'LEVEL 1 입문자', nextRemaining: 3 - collected };
}

export function CollectionDashboard({
  collectedCount,
  totalCount,
  viewMode,
  onSwitchViewMode,
}: CollectionDashboardProps) {
  const pct = totalCount > 0 ? (collectedCount / totalCount) * 100 : 0;
  const pctFormatted = pct.toFixed(1);
  const tier = getExplorerTier(collectedCount, totalCount);

  return (
    <section className="w-full bg-white rounded-[28px] p-6 md:p-9 shadow-sm relative overflow-hidden">
      <div
        className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#dee8ff]/45 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-[#fea619]/12 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-[#434655]">
            <span className="font-mono font-bold text-[#004ac6] tracking-wider">
              KOREA TRAVEL DEX
            </span>
            <span aria-hidden="true">·</span>
            <span>전국 6대 권역 큐레이션</span>
          </div>

          <h1 className="text-[26px] sm:text-[32px] leading-[1.28] font-extrabold text-[#111c2d] tracking-tight text-balance">
            {viewMode === 'my' ? (
              <>
                내가 수집한{' '}
                <span className="text-[#004ac6] underline decoration-[#fea619] decoration-4 underline-offset-4">
                  대한민국 여행 스탬프
                </span>
                를 확인하세요
              </>
            ) : (
              <>
                오늘 떠나고 싶은 곳을{' '}
                <span className="text-[#004ac6] underline decoration-[#fea619] decoration-4 underline-offset-4">
                  도감에 수집
                </span>
                해보세요
              </>
            )}
          </h1>

          <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#434655] font-medium">
            {viewMode === 'my' ? (
              <>
                전체{' '}
                <strong className="text-[#111c2d] font-bold">
                  {totalCount}곳
                </strong>
                의 추천 명소 중 지금까지{' '}
                <strong className="text-[#004ac6] font-bold tabular-nums">
                  {collectedCount}곳
                </strong>
                의 도감 스탬프를 모았습니다. 카드를 클릭해 상세 여행 포인트를
                확인하세요.
              </>
            ) : (
              <>
                전국에 등록된{' '}
                <strong className="text-[#111c2d] font-bold">
                  {totalCount}곳의 대표 명소
                </strong>
                를 권역과 테마별로 간편하게 탐색하고, 가고 싶은 곳에 발도장
                스탬프를 찍어보세요.
              </>
            )}
          </p>
        </div>

        <div className="bg-[#f0f3ff] rounded-2xl p-5 md:p-6 flex flex-col gap-3 min-w-[280px] sm:min-w-[330px] shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#004ac6]" aria-hidden="true" />
              <span className="text-[16px] font-bold text-[#111c2d]">
                나의 수집 달성률
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#004ac6] font-bold px-2.5 py-0.5 bg-[#dbe1ff] rounded-full whitespace-nowrap">
              {tier.level}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[32px] leading-none text-[#004ac6] font-extrabold font-mono tabular-nums">
                {collectedCount}
              </span>
              <span className="text-[14px] text-[#434655] font-medium tabular-nums">
                / {totalCount}곳 완료
              </span>
            </div>
            <span className="font-mono text-[18px] text-[#855300] font-bold tabular-nums">
              {pctFormatted}%
            </span>
          </div>

          <div
            className="w-full h-3 rounded-full bg-[#dee8ff] overflow-hidden p-[2px]"
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="여행 도감 수집 달성률"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#004ac6] to-[#fea619] transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[#434655] text-[12px] pt-0.5">
            <span>
              {tier.nextRemaining > 0
                ? `다음 칭호까지 ${tier.nextRemaining}곳 남음`
                : '모든 지역 도감을 완성했어요!'}
            </span>
            <button
              type="button"
              onClick={() =>
                onSwitchViewMode(viewMode === 'my' ? 'all' : 'my')
              }
              className="text-[#004ac6] font-semibold hover:underline cursor-pointer flex items-center gap-1 whitespace-nowrap"
            >
              <span>
                {viewMode === 'my' ? '전체 도감 보기' : '내 도감 보기'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
