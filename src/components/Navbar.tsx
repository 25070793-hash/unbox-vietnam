import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Heart,
  ShoppingBag,
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronDown,
  Gift,
  Disc,
  HelpCircle,
  Compass,
  Coins,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    cartCount,
    favorites,
    coins,
    isMuted,
    toggleMute,
  } = useApp();

  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const miniGameDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        miniGameDropdownRef.current &&
        !miniGameDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMiniGameOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (route: string) => {
    navigateTo(route);
    setIsMiniGameOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navItemClass = (route: string) =>
    `whitespace-nowrap shrink-0 text-sm font-medium transition-colors py-1 border-b-2 ${
      currentRoute === route
        ? 'border-[#F59E0B] text-[#FEF3C7] font-semibold'
        : 'border-transparent text-[#FDE8E8] hover:text-[#FEF3C7] hover:border-[#F59E0B]/50'
    }`;

  const isGameRouteActive = [
    'mystery-box',
    'lucky-wheel',
    'quiz',
    'trivia',
  ].includes(currentRoute);

  return (
    <header className="sticky top-0 z-50 bg-[#781017] border-b border-[#B45309]/30 text-[#FFFBEB] shadow-md">
      {/* Top Banner Notice */}
      <div className="bg-[#5B0D12] text-[#FDE68A] text-[11px] sm:text-xs py-1 px-3 text-center border-b border-[#88131B] flex items-center justify-center gap-1.5 leading-tight">
        <span className="font-semibold tracking-wide shrink-0">VNU1001</span>
        <span>·</span>
        <span className="text-[#FDFBF7]/85 truncate">Dự án học thuật: Khám phá văn hóa Việt Nam qua Art Toy & Mini Games</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 text-left group focus:outline-none"
              aria-label="Về trang chủ Unbox Vietnam"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#991B1B] to-[#450A0A] border border-[#F59E0B] flex items-center justify-center shadow-sm shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-bold tracking-tight text-[#FEF3C7] group-hover:text-white transition-colors leading-none">
                  UNBOX VN
                </span>
                <span className="hidden sm:block text-[10px] tracking-wider text-[#FCD34D] uppercase mt-0.5">
                  The Art of Neo-Folklore
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm">
            <button
              onClick={() => handleNav('home')}
              className={navItemClass('home')}
            >
              Trang chủ
            </button>

            <button
              onClick={() => handleNav('collection')}
              className={navItemClass('collection')}
            >
              Bộ sưu tập
            </button>

            {/* Mini Game Dropdown */}
            <div className="relative" ref={miniGameDropdownRef}>
              <button
                onClick={() => setIsMiniGameOpen(!isMiniGameOpen)}
                className={`flex items-center gap-1 whitespace-nowrap shrink-0 text-sm font-medium transition-colors py-1 border-b-2 ${
                  isGameRouteActive
                    ? 'border-[#F59E0B] text-[#FEF3C7] font-semibold'
                    : 'border-transparent text-[#FDE8E8] hover:text-[#FEF3C7]'
                }`}
                aria-expanded={isMiniGameOpen}
              >
                <span>Mini Game</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMiniGameOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isMiniGameOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-[#6F0D14] border border-[#B45309]/50 rounded-xl shadow-xl py-2 z-50 text-[#FFFBEB]">
                  <button
                    onClick={() => handleNav('mystery-box')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#88131B] flex items-center gap-3 transition-colors text-sm"
                  >
                    <Gift className="w-4 h-4 text-[#F59E0B]" />
                    <div>
                      <div className="font-medium text-white">Mystery Box</div>
                      <div className="text-xs text-[#FDE68A]/70">Mở hộp quà văn hóa bí ẩn</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('lucky-wheel')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#88131B] flex items-center gap-3 transition-colors text-sm"
                  >
                    <Disc className="w-4 h-4 text-[#F59E0B]" />
                    <div>
                      <div className="font-medium text-white">Vòng quay may mắn</div>
                      <div className="text-xs text-[#FDE68A]/70">Quay trúng 1 trong 7 nhân vật</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('quiz')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#88131B] flex items-center gap-3 transition-colors text-sm"
                  >
                    <Compass className="w-4 h-4 text-[#F59E0B]" />
                    <div>
                      <div className="font-medium text-white">Trắc nghiệm tính cách</div>
                      <div className="text-xs text-[#FDE68A]/70">Khám phá Art Toy đồng điệu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('trivia')}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#88131B] flex items-center gap-3 transition-colors text-sm"
                  >
                    <HelpCircle className="w-4 h-4 text-[#F59E0B]" />
                    <div>
                      <div className="font-medium text-white">Đố vui văn hóa Việt Nam</div>
                      <div className="text-xs text-[#FDE68A]/70">Thử thách kiến thức di sản</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('missions')}
              className={navItemClass('missions')}
            >
              Nhiệm vụ
            </button>

            <button
              onClick={() => handleNav('vouchers')}
              className={navItemClass('vouchers')}
            >
              Đổi Voucher
            </button>

            <button
              onClick={() => handleNav('my-collection')}
              className={navItemClass('my-collection')}
            >
              Bộ sưu tập của tôi
            </button>

            <button
              onClick={() => handleNav('orders')}
              className={navItemClass('orders')}
            >
              Đơn hàng của tôi
            </button>

            <button
              onClick={() => handleNav('about')}
              className={navItemClass('about')}
            >
              Về chúng tôi
            </button>
          </nav>

          {/* Right Action Icons Zone */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Cultural Coins Badge */}
            <button
              onClick={() => handleNav('missions')}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#5B0D12] border border-[#F59E0B]/60 text-[#FEF08A] hover:bg-[#6F0D14] transition-all text-xs font-semibold shadow-inner"
              title="Xu Văn Hóa"
              aria-label={`Số xu văn hóa: ${coins}`}
            >
              <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B]" />
              <span className="tabular-nums">{coins}</span>
              <span className="hidden sm:inline text-[11px] font-normal text-[#FDE68A]/80">xu</span>
            </button>

            {/* Audio Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className={`p-1.5 sm:p-2 rounded-full border transition-colors ${
                isMuted
                  ? 'bg-[#5B0D12] border-stone-600 text-stone-400'
                  : 'bg-[#5B0D12] border-[#F59E0B]/50 text-[#FEF08A] hover:bg-[#6F0D14]'
              }`}
              title={isMuted ? 'Bật âm thanh giai điệu' : 'Tắt âm thanh'}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#F59E0B]" />
              )}
            </button>

            {/* Favorites Icon Button (hidden on narrow screens to prevent crowding, fully present in mobile menu) */}
            <button
              onClick={() => handleNav('favorites')}
              className="hidden sm:flex relative p-2 rounded-full bg-[#5B0D12] border border-[#B45309]/50 text-[#FEF3C7] hover:bg-[#6F0D14] transition-colors"
              title="Danh sách yêu thích"
              aria-label={`Yêu thích: ${favorites.length} nhân vật`}
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center border border-[#781017]">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart Icon Button */}
            <button
              onClick={() => handleNav('cart')}
              className="relative p-1.5 sm:p-2 rounded-full bg-[#5B0D12] border border-[#F59E0B]/70 text-[#FEF3C7] hover:bg-[#6F0D14] transition-colors"
              title="Giỏ hàng"
              aria-label={`Giỏ hàng: ${cartCount} sản phẩm`}
            >
              <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F59E0B] text-[#781017] text-[10px] font-extrabold flex items-center justify-center border border-[#781017]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-lg bg-[#5B0D12] text-[#FEF3C7] hover:bg-[#6F0D14] focus:outline-none border border-[#B45309]/40"
              aria-label="Mở menu di động"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#F59E0B]" />
              ) : (
                <Menu className="w-5 h-5 text-[#FEF3C7]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#6F0D14] border-t border-[#B45309]/40 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#88131B]">
            <button
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B]"
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleNav('collection')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B]"
            >
              Bộ sưu tập
            </button>
            <button
              onClick={() => handleNav('missions')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B]"
            >
              Nhiệm vụ & Xu
            </button>
            <button
              onClick={() => handleNav('vouchers')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B]"
            >
              Đổi Voucher
            </button>
            <button
              onClick={() => handleNav('my-collection')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B]"
            >
              Bộ sưu tập của tôi
            </button>
            <button
              onClick={() => handleNav('orders')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B]"
            >
              Đơn hàng của tôi
            </button>
            <button
              onClick={() => handleNav('favorites')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B] flex items-center justify-between"
            >
              <span>Yêu thích</span>
              {favorites.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#FEF3C7] hover:bg-[#88131B]"
            >
              Về chúng tôi
            </button>
          </div>

          <div className="pt-1">
            <div className="text-xs uppercase tracking-wider text-[#FCD34D] px-3 py-1 font-semibold">
              Khu Vực 4 Mini Game
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
              <button
                onClick={() => handleNav('mystery-box')}
                className="flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm text-stone-200 hover:bg-[#88131B]"
              >
                <Gift className="w-4 h-4 text-[#F59E0B]" />
                <span>Mystery Box</span>
              </button>
              <button
                onClick={() => handleNav('lucky-wheel')}
                className="flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm text-stone-200 hover:bg-[#88131B]"
              >
                <Disc className="w-4 h-4 text-[#F59E0B]" />
                <span>Vòng quay may mắn</span>
              </button>
              <button
                onClick={() => handleNav('quiz')}
                className="flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm text-stone-200 hover:bg-[#88131B]"
              >
                <Compass className="w-4 h-4 text-[#F59E0B]" />
                <span>Trắc nghiệm tính cách</span>
              </button>
              <button
                onClick={() => handleNav('trivia')}
                className="flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm text-stone-200 hover:bg-[#88131B]"
              >
                <HelpCircle className="w-4 h-4 text-[#F59E0B]" />
                <span>Đố vui văn hóa Việt Nam</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
