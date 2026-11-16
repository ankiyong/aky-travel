import { Compass, MapPinOff, RotateCcw } from 'lucide-react';
import type { Destination, SortOrder, ViewMode } from '../types/destination';
import { DexCard } from './DexCard';

interface DexGridProps {
  destinations: Destination[];
  viewMode: ViewMode;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  isCollected: (id: string) => boolean;
  onToggleCollect: (id: string) => void;
  onSelectDestination: (destination: Destination) => void;
  onResetFilters: () => void;
  onSwitchToAll: () => void;
  totalCollectedCount: number;
}

export function DexGrid({
  destinations,
  viewMode,
  sortOrder,
  onSortOrderChange,
  isCollected,
  onToggleCollect,
  onSelectDestination,
  onResetFilters,
  onSwitchToAll,
  totalCollectedCount,
}: DexGridProps) {
  const isMyDexEmpty = viewMode === 'my' && totalCollectedCount === 0;

  return (
    <section
      id="dex-catalog-section"
      className="w-full flex flex-col gap-5 scroll-mt-24"
      aria-label="지역별 수집 도감 목록"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[20px] font-bold text-[#111c2d]">
            {viewMode === 'my' ? '내가 수집한 도감 목록' : '지역별 수집 도감 목록'}
          </h2>
          <span className="font-mono text-[11px] font-bold text-[#004ac6] bg-[#dee8ff] px-2.5 py-0.5 rounded-full">
            CATALOG
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-1 p-1 bg-[#f0f3ff] rounded-full text-[12px]"
            role="group"
            aria-label="정렬 기준"
          >
            <button
              type="button"
              onClick={() => onSortOrderChange('dex')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                sortOrder === 'dex'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#434655] hover:text-[#111c2d]'
              }`}
            >
              도감 번호순
            </button>
            <button
              type="button"
              onClick={() => onSortOrderChange('popular')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                sortOrder === 'popular'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#434655] hover:text-[#111c2d]'
              }`}
            >
              인기 스탬프순
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[#434655] text-[12px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ae0010]" />
              <span>수집완료 도감</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d8e3fb]" />
              <span>미수집 탐험지</span>
            </span>
          </div>
        </div>
      </div>

      {destinations.length === 0 ? (
        <div className="w-full bg-white rounded-[28px] py-16 px-6 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#f0f3ff] text-[#004ac6] flex items-center justify-center mb-4">
            {isMyDexEmpty ? (
              <Compass className="w-8 h-8" aria-hidden="true" />
            ) : (
              <MapPinOff className="w-8 h-8" aria-hidden="true" />
            )}
          </div>

          <h3 className="text-[18px] font-bold text-[#111c2d] mb-2">
            {isMyDexEmpty
              ? '아직 수집한 여행지가 없어요'
              : '조건에 맞는 여행지가 도감에 없습니다'}
          </h3>
          <p className="text-[14px] text-[#434655] max-w-md mb-6 leading-relaxed">
            {isMyDexEmpty
              ? '마음에 드는 여행지 카드 우측 상단의 스탬프 버튼을 눌러 나만의 대한민국 여행 도감을 채워보세요!'
              : '선택한 권역이나 테마 조건을 완화하거나 검색어를 변경해 다른 보물 명소를 찾아보세요.'}
          </p>

          {isMyDexEmpty ? (
            <button
              type="button"
              onClick={onSwitchToAll}
              className="px-5 py-2.5 rounded-full bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#003ea8] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>전체 도감 둘러보기</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-full bg-[#004ac6] text-white text-[13px] font-semibold hover:bg-[#003ea8] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>모든 필터 초기화</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest) => (
            <DexCard
              key={dest.id}
              destination={dest}
              collected={isCollected(dest.id)}
              onToggleCollect={onToggleCollect}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      )}
    </section>
  );
}
