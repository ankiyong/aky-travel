import { Map } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#f0f3ff] text-[#434655] mt-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#dee8ff]">
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#004ac6] flex items-center justify-center text-white">
                <Map className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-[17px] font-bold text-[#111c2d]">
                대한민국 여행도감
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#434655]">
              전국 권역별 대표 명소와 숨은 여행지를 도감 카드로 규격화하여
              핵심 정보만 깔끔하게 살펴보고, 가고 싶은 곳을 스탬프로 수집하는
              모던 로컬 트래블 덱스입니다.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#111c2d] tracking-wider uppercase">
              큐레이션 정보
            </span>
            <p className="text-[13px] text-[#434655] leading-relaxed">
              대한민국 6대 권역 큐레이션
              <br />
              테마별 핵심 포인트 가이드
              <br />
              로컬 스토리지 개인 도감 저장
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-[12px] font-bold text-[#111c2d] tracking-wider uppercase">
              도감 이용 안내
            </span>
            <p className="text-[13px] text-[#434655] leading-relaxed">
              별도 회원가입 없이 사용 중인 브라우저에 수집 내역이 안전하게
              자동 저장됩니다. 검색창에서 <kbd className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded">⌘K</kbd> 단축키로 빠르게 여행지를 찾아보세요.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-[#737686]">
          <span>© 2026 Korea Travel Dex · 대한민국 지역별 여행지 도감</span>
          <span>로그인 없이 즐기는 나만의 국내 여행 아카이브</span>
        </div>
      </div>
    </footer>
  );
}
