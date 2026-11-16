export type RegionKey =
  | 'all'
  | 'capital'
  | 'gangwon'
  | 'chungcheong'
  | 'jeolla'
  | 'gyeongsang'
  | 'jeju';

export type RegionName =
  | '수도권'
  | '강원권'
  | '충청권'
  | '전라권'
  | '경상권'
  | '제주권';

export type ThemeName =
  | '자연/풍경'
  | '역사/유적'
  | '로컬미식'
  | '산책/트레킹'
  | '감성/사진'
  | '액티비티';

export type SortOrder = 'dex' | 'popular';

export type ViewMode = 'all' | 'my';

export interface HighlightItem {
  title: string;
  description: string;
  icon: 'landscape' | 'light' | 'cottage' | 'sparkles' | 'utensils' | 'camera' | 'compass';
}

export interface Destination {
  id: string;
  dexNumber: string;
  regionKey: Exclude<RegionKey, 'all'>;
  region: RegionName;
  city: string;
  name: string;
  theme: ThemeName[];
  companion: string[];
  season: string[];
  summary: string;
  highlights: HighlightItem[];
  address: string;
  imageUrl: string;
  heroImageUrl?: string;
  modalImageUrl?: string;
  heritageBadge?: string;
  rating: number;
  reviewCount: number;
  duration: string;
  stampRate: number;
}
