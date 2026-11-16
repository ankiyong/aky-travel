import {
  Camera,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  Home,
  Mountain,
  Sparkles,
  Sun,
  Utensils,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Destination, HighlightItem } from '../types/destination';
import { DestinationImage } from './DestinationImage';

interface DestinationModalProps {
  destination: Destination | null;
  collected: boolean;
  onClose: () => void;
  onToggleCollect: (id: string) => void;
  onCopyAddress: (address: string) => void;
}

function HighlightIcon({ icon }: { icon: HighlightItem['icon'] }) {
  switch (icon) {
    case 'landscape':
      return <Mountain className="w-5 h-5 text-[#004ac6]" aria-hidden="true" />;
    case 'light':
      return <Sun className="w-5 h-5 text-[#855300]" aria-hidden="true" />;
    case 'cottage':
      return <Home className="w-5 h-5 text-[#ae0010]" aria-hidden="true" />;
    case 'utensils':
      return <Utensils className="w-5 h-5 text-[#855300]" aria-hidden="true" />;
    case 'camera':
      return <Camera className="w-5 h-5 text-[#004ac6]" aria-hidden="true" />;
    case 'compass':
      return <Compass className="w-5 h-5 text-[#004ac6]" aria-hidden="true" />;
    case 'sparkles':
    default:
      return <Sparkles className="w-5 h-5 text-[#ae0010]" aria-hidden="true" />;
  }
}

export function DestinationModal({
  destination,
  collected,
  onClose,
  onToggleCollect,
  onCopyAddress,
}: DestinationModalProps) {
  const [copiedLocal, setCopiedLocal] = useState(false);

  useEffect(() => {
    setCopiedLocal(false);
  }, [destination?.id]);

  useEffect(() => {
    if (!destination) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [destination, onClose]);

  if (!destination) return null;

  const handleCopy = () => {
    onCopyAddress(destination.address);
    setCopiedLocal(true);
    window.setTimeout(() => setCopiedLocal(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-[#263143]/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-destination-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-56 sm:h-64 bg-[#e7eeff] shrink-0">
          <DestinationImage
            src={destination.modalImageUrl || destination.imageUrl}
            alt={destination.name}
            region={destination.region}
            city={destination.city}
            name={destination.name}
            dexNumber={destination.dexNumber}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111c2d]/85 via-transparent to-black/30" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#004ac6] text-white font-mono text-[11px] font-bold shadow-sm">
              DEX NO.{destination.dexNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white text-[#004ac6] text-[12px] font-bold shadow-sm">
              {destination.region} · {destination.city}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="상세 모달 닫기"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-white/90 font-medium">
              {destination.theme.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </div>
            <h2
              id="modal-destination-title"
              className="text-[26px] sm:text-[30px] leading-tight text-white font-extrabold"
            >
              {destination.name}
            </h2>
          </div>
        </div>

        <div className="p-5 sm:p-7 overflow-y-auto flex flex-col gap-6">
          <div className="p-4 rounded-2xl bg-[#f0f3ff] border border-[#dbe1ff]">
            <p className="text-[15px] sm:text-[16px] text-[#111c2d] font-semibold leading-relaxed">
              &ldquo;{destination.summary}&rdquo;
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] text-[#004ac6] font-bold tracking-wider">
              핵심 포인트 3가지
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {destination.highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-3.5 rounded-2xl bg-white border border-[#dee8ff] flex flex-col gap-1.5"
                >
                  <HighlightIcon icon={item.icon} />
                  <strong className="text-[14px] font-bold text-[#111c2d]">
                    {item.title}
                  </strong>
                  <p className="text-[12.5px] text-[#434655] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-b border-[#dee8ff]">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#737686]">
                추천 동반자
              </span>
              <p className="text-[13px] font-semibold text-[#111c2d]">
                {destination.companion.join(' · ')}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#737686]">
                추천 계절
              </span>
              <p className="text-[13px] font-semibold text-[#855300]">
                {destination.season.join(' · ')}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold text-[#737686]">
                위치 주소
              </span>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[13px] text-[#111c2d] font-medium leading-snug">
                  {destination.address}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-lg bg-[#f0f3ff] hover:bg-[#dee8ff] text-[#004ac6] text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedLocal ? (
                    <>
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" aria-hidden="true" />
                      <span>복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#e7eeff] text-[#111c2d] text-[13px] font-semibold hover:bg-[#dee8ff] transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => onToggleCollect(destination.id)}
              className={`px-6 py-2.5 rounded-full text-white text-[13px] font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                collected
                  ? 'bg-[#ae0010] hover:bg-[#93000b]'
                  : 'bg-[#004ac6] hover:bg-[#003ea8]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>
                {collected ? '도감 수집 완료 (해제하기)' : '도감에 스탬프 담기'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
