import { Compass, Search, X } from 'lucide-react';
import type { RefObject } from 'react';
import type { ViewMode } from '../types/destination';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  collectedCount: number;
  totalCount: number;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onLogoClick: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  collectedCount,
  totalCount,
  searchInputRef,
  onLogoClick,
}: HeaderProps) {
  const completionPct =
    totalCount > 0 ? Math.round((collectedCount / totalCount) * 100) : 0;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/92 backdrop-blur-xl shadow-[0_1px_8px_rgba(17,28,45,0.05)]">
      <div className="h-20 max-w-[1240px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-3 text-left shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004ac6] rounded-xl py-1 pr-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#004ac6] flex items-center justify-center text-white shadow-sm shrink-0">
            <Compass className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] sm:text-[18px] font-bold text-[#111c2d] tracking-tight leading-tight whitespace-nowrap">
              대한민국 여행도감
            </span>
            <span className="text-[11px] font-semibold text-[#434655] tracking-wide whitespace-nowrap">
              Korea Travel Dex
            </span>
          </div>
        </button>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center w-full">
            <Search
              className="w-4 h-4 absolute left-4 text-[#737686] pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="여행지, 도시명, 테마 검색..."
              aria-label="여행지 검색"
              className="w-full pl-11 pr-16 py-2.5 bg-[#f0f3ff] rounded-full text-[13px] text-[#111c2d] placeholder:text-[#737686] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]/25 transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="검색어 지우기"
                className="absolute right-3 p-1 rounded-full text-[#737686] hover:text-[#111c2d] hover:bg-[#dee8ff] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="absolute right-3 px-2 py-0.5 rounded bg-[#dee8ff] text-[#434655] font-mono text-[11px] font-bold pointer-events-none">
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        <nav
          aria-label="도감 보기 모드"
          className="flex items-center p-1 bg-[#f0f3ff] rounded-full gap-1 shrink-0"
        >
          <button
            type="button"
            onClick={() => onViewModeChange('all')}
            aria-current={viewMode === 'all' ? 'page' : undefined}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === 'all'
                ? 'bg-[#004ac6] text-white shadow-sm'
                : 'text-[#434655] hover:text-[#111c2d] hover:bg-[#e7eeff]'
            }`}
          >
            전체 도감
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('my')}
            aria-current={viewMode === 'my' ? 'page' : undefined}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-[13px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === 'my'
                ? 'bg-[#004ac6] text-white shadow-sm'
                : 'text-[#434655] hover:text-[#111c2d] hover:bg-[#e7eeff]'
            }`}
          >
            <span>내 도감</span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold tabular-nums ${
                viewMode === 'my'
                  ? 'bg-[#fea619] text-[#2a1700]'
                  : 'bg-[#ffddb8] text-[#653e00]'
              }`}
            >
              {completionPct}%
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
