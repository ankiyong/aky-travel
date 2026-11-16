import { RotateCcw, Search, Sparkles, X } from 'lucide-react';
import { REGIONS, THEMES } from '../data/destinations';
import type { RegionKey, ThemeName } from '../types/destination';

interface FilterBarProps {
  selectedRegion: RegionKey;
  onSelectRegion: (region: RegionKey) => void;
  selectedThemes: ThemeName[];
  onToggleTheme: (theme: ThemeName) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export function FilterBar({
  selectedRegion,
  onSelectRegion,
  selectedThemes,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  resultCount,
  hasActiveFilters,
  onResetFilters,
}: FilterBarProps) {
  return (
    <section className="w-full flex flex-col gap-3.5" aria-label="여행지 필터">
      <div className="md:hidden relative flex items-center w-full">
        <Search
          className="w-4 h-4 absolute left-4 text-[#737686] pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="여행지, 도시명, 테마 검색..."
          aria-label="여행지 모바일 검색"
          className="w-full pl-11 pr-10 py-2.5 bg-white rounded-full text-[14px] text-[#111c2d] placeholder:text-[#737686] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004ac6]/25"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="검색어 지우기"
            className="absolute right-3 p-1 rounded-full text-[#737686] hover:text-[#111c2d]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-0.5">
        <div
          className="flex items-center gap-1.5 p-1.5 bg-[#f0f3ff] rounded-full shadow-sm shrink-0"
          role="tablist"
          aria-label="권역 선택"
        >
          {REGIONS.map((region) => {
            const isActive = selectedRegion === region.key;
            return (
              <button
                key={region.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectRegion(region.key)}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'text-[#434655] hover:text-[#111c2d] hover:bg-[#e7eeff]'
                }`}
              >
                {region.label}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-[#434655] text-[12px] font-medium whitespace-nowrap bg-white px-4 py-2 rounded-full shadow-sm shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#004ac6]" aria-hidden="true" />
          <span>권역 · 테마 실시간 다중 필터링</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl p-3 px-4 shadow-sm">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="테마 다중 선택"
        >
          <span className="text-[12px] font-semibold text-[#737686] pr-1">
            테마 필터:
          </span>
          {THEMES.map((theme) => {
            const active = selectedThemes.includes(theme.key);
            return (
              <button
                key={theme.key}
                type="button"
                aria-pressed={active}
                onClick={() => onToggleTheme(theme.key)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-150 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'bg-[#e7eeff] text-[#434655] hover:bg-[#dee8ff] hover:text-[#111c2d]'
                }`}
              >
                <span aria-hidden="true">{theme.emoji}</span>
                <span>{theme.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 ml-auto shrink-0">
          <span className="text-[13px] text-[#434655] whitespace-nowrap">
            총{' '}
            <strong className="font-mono text-[16px] text-[#004ac6] font-bold tabular-nums">
              {resultCount}
            </strong>
            곳의 여행지
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            disabled={!hasActiveFilters}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
              hasActiveFilters
                ? 'bg-[#f0f3ff] text-[#004ac6] hover:bg-[#dbe1ff] cursor-pointer'
                : 'bg-[#f0f3ff]/60 text-[#737686] opacity-60 cursor-default'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>필터 초기화</span>
          </button>
        </div>
      </div>
    </section>
  );
}
