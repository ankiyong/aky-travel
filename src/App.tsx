import { CheckCircle2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CollectionDashboard } from './components/CollectionDashboard';
import { DestinationModal } from './components/DestinationModal';
import { DexGrid } from './components/DexGrid';
import { FeaturedBento } from './components/FeaturedBento';
import { FilterBar } from './components/FilterBar';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MissionBanner, RegionalProgressModal } from './components/MissionBanner';
import { DESTINATIONS } from './data/destinations';
import { useCollectedDex } from './hooks/useCollectedDex';
import type {
  Destination,
  RegionKey,
  SortOrder,
  ThemeName,
  ViewMode,
} from './types/destination';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('all');
  const [selectedThemes, setSelectedThemes] = useState<ThemeName[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('dex');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(
    null
  );
  const [isRegionalModalOpen, setIsRegionalModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const { collectedIds, isCollected, toggleCollect } = useCollectedDex();

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleToggleTheme = useCallback((theme: ThemeName) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedRegion('all');
    setSelectedThemes([]);
    setSearchQuery('');
  }, []);

  const handleLogoClick = useCallback(() => {
    setViewMode('all');
    handleResetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [handleResetFilters]);

  const handleToggleCollect = useCallback(
    (id: string) => {
      const wasCollected = isCollected(id);
      toggleCollect(id);
      const target = DESTINATIONS.find((d) => d.id === id);
      if (target) {
        showToast(
          wasCollected
            ? `${target.name} 스탬프를 해제했습니다.`
            : `${target.name} 스탬프를 도감에 수집했습니다!`
        );
      }
    },
    [isCollected, toggleCollect, showToast]
  );

  const handleCopyAddress = useCallback(
    async (address: string) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(address);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = address;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showToast('주소가 클립보드에 복사되었습니다.');
      } catch {
        showToast('주소를 복사하지 못했습니다.');
      }
    },
    [showToast]
  );

  const hasActiveFilters =
    selectedRegion !== 'all' ||
    selectedThemes.length > 0 ||
    searchQuery.trim().length > 0;

  const filteredDestinations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = DESTINATIONS.filter((dest) => {
      if (viewMode === 'my' && !collectedIds.includes(dest.id)) {
        return false;
      }

      if (selectedRegion !== 'all' && dest.regionKey !== selectedRegion) {
        return false;
      }

      if (
        selectedThemes.length > 0 &&
        !selectedThemes.some((theme) => dest.theme.includes(theme))
      ) {
        return false;
      }

      if (query.length > 0) {
        const haystack = [
          dest.name,
          dest.city,
          dest.region,
          dest.summary,
          dest.address,
          ...dest.theme,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'popular') {
        return b.stampRate - a.stampRate;
      }
      return Number(a.dexNumber) - Number(b.dexNumber);
    });
  }, [
    viewMode,
    collectedIds,
    selectedRegion,
    selectedThemes,
    searchQuery,
    sortOrder,
  ]);

  const featuredDestination = DESTINATIONS[0];
  const topRankedDestinations = useMemo(
    () =>
      [...DESTINATIONS]
        .sort((a, b) => b.stampRate - a.stampRate)
        .slice(0, 5),
    []
  );

  const showFeaturedBento =
    viewMode === 'all' && !hasActiveFilters && sortOrder === 'dex';

  const handleViewAllRanking = useCallback(() => {
    setSortOrder('popular');
    const el = document.getElementById('dex-catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleJumpToRegion = useCallback((region: RegionKey) => {
    setViewMode('all');
    setSelectedRegion(region);
    const el = document.getElementById('dex-catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#111c2d]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        collectedCount={collectedIds.length}
        totalCount={DESTINATIONS.length}
        searchInputRef={searchInputRef}
        onLogoClick={handleLogoClick}
      />

      <main className="flex-1 w-full pt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8 sm:py-10 flex flex-col gap-10">
          <CollectionDashboard
            collectedCount={collectedIds.length}
            totalCount={DESTINATIONS.length}
            viewMode={viewMode}
            onSwitchViewMode={setViewMode}
          />

          <FilterBar
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            selectedThemes={selectedThemes}
            onToggleTheme={handleToggleTheme}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredDestinations.length}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
          />

          {showFeaturedBento && (
            <FeaturedBento
              featured={featuredDestination}
              topRanked={topRankedDestinations}
              isCollected={isCollected}
              onToggleCollect={handleToggleCollect}
              onSelectDestination={setActiveDestination}
              onViewAllRanking={handleViewAllRanking}
            />
          )}

          <DexGrid
            destinations={filteredDestinations}
            viewMode={viewMode}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            isCollected={isCollected}
            onToggleCollect={handleToggleCollect}
            onSelectDestination={setActiveDestination}
            onResetFilters={handleResetFilters}
            onSwitchToAll={() => {
              setViewMode('all');
              handleResetFilters();
            }}
            totalCollectedCount={collectedIds.length}
          />

          <MissionBanner
            onOpenRegionalModal={() => setIsRegionalModalOpen(true)}
          />
        </div>
      </main>

      <Footer />

      <DestinationModal
        destination={activeDestination}
        collected={
          activeDestination ? isCollected(activeDestination.id) : false
        }
        onClose={() => setActiveDestination(null)}
        onToggleCollect={handleToggleCollect}
        onCopyAddress={handleCopyAddress}
      />

      <RegionalProgressModal
        isOpen={isRegionalModalOpen}
        destinations={DESTINATIONS}
        collectedIds={collectedIds}
        onClose={() => setIsRegionalModalOpen(false)}
        onSelectRegion={handleJumpToRegion}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-full bg-[#111c2d] text-white text-[13px] font-semibold shadow-xl flex items-center gap-2 whitespace-nowrap"
        >
          <CheckCircle2
            className="w-4 h-4 text-[#fea619] shrink-0"
            aria-hidden="true"
          />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
