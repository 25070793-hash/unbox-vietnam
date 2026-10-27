import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CharacterArt } from './illustrations/CharacterIllustrations';
import {
  X,
  Volume2,
  VolumeX,
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Sparkles,
  Award,
  Layers,
  Info,
} from 'lucide-react';
import { formatCurrency } from '../utils/shopLogic';

export const CharacterDetailModal: React.FC = () => {
  const {
    characters,
    selectedCharacterId,
    setSelectedCharacterId,
    playingCharacterId,
    playCharacterMelody,
    stopAudio,
    addToCart,
    toggleFavorite,
    isFavorite,
    recordCharacterView,
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  const character = characters.find((c) => c.id === selectedCharacterId);

  useEffect(() => {
    if (selectedCharacterId) {
      recordCharacterView(selectedCharacterId);
      setQuantity(1);
    }
  }, [selectedCharacterId, recordCharacterView]);

  if (!character || !selectedCharacterId) return null;

  const isPlayingThis = playingCharacterId === character.id;
  const favorited = isFavorite(character.id);

  const handleClose = () => {
    setSelectedCharacterId(null);
    if (isPlayingThis) {
      stopAudio();
    }
  };

  const handleAddToCart = () => {
    addToCart(character, quantity);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-character-title"
    >
      <div className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#B45309]/30 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Top cultural accent strip */}
        <div className="h-2 bg-gradient-to-r from-[#991B1B] via-[#F59E0B] to-[#0D9488]" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FAF5EE] text-stone-600 hover:text-stone-900 hover:bg-[#F3ECE1] border border-stone-300 transition-colors"
          aria-label="Đóng chi tiết nhân vật"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Visual Showcase & Audio Player */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full flex justify-center py-2">
              <CharacterArt id={character.id} size="lg" className="shadow-md" />
            </div>

            {/* Audio Melody Player Card */}
            <div className="w-full mt-4 p-4 rounded-2xl bg-[#FAF6F0] border border-[#B45309]/20 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#88131B]" />
                  <span className="text-xs font-semibold text-[#88131B] uppercase tracking-wider">
                    Giai Điệu Đặc Trưng
                  </span>
                </div>
                <span className="text-xs text-stone-500 font-mono">{character.melody.tempo} BPM</span>
              </div>

              <div className="text-sm font-bold text-stone-900 mb-1">
                {character.melody.name}
              </div>
              <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                {character.melody.instrumentDescription}
              </p>

              <button
                onClick={() => playCharacterMelody(character.id)}
                className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all ${
                  isPlayingThis
                    ? 'bg-[#88131B] text-[#FEF3C7] shadow-inner animate-pulse'
                    : 'bg-[#5B0D12] text-[#FEF08A] hover:bg-[#6F0D14] shadow-xs'
                }`}
                aria-label={isPlayingThis ? 'Tạm dừng giai điệu' : 'Nghe giai điệu nhân vật'}
              >
                {isPlayingThis ? (
                  <>
                    <VolumeX className="w-4 h-4 text-[#F59E0B]" />
                    <span>Đang phát nhạc đặc trưng... (Nhấn để dừng)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#F59E0B]" />
                    <span>Lắng nghe giai điệu riêng</span>
                  </>
                )}
              </button>
            </div>

            {/* Disclaimer under visual */}
            <p className="text-[11px] text-stone-400 text-center mt-3 leading-tight">
              Dự án sáng tạo lấy cảm hứng từ art toy & văn hóa Việt Nam, không phải sản phẩm POP MART chính thức.
            </p>
          </div>

          {/* Right Column: Information, Cultural Narrative & Order */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rarity Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#88131B]/10 text-[#88131B] border border-[#88131B]/20">
                  {character.category}
                </span>
                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {character.stats.rarity}
                </span>
              </div>

              {/* Character Title */}
              <h2
                id="modal-character-title"
                className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
              >
                {character.name}
              </h2>
              <p className="text-sm text-stone-500 font-medium italic mt-0.5">
                {character.vietnameseTitle}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-[#88131B]">
                  {formatCurrency(character.price)}
                </span>
                <span className="text-xs text-stone-400">
                  (Giá quy đổi mô phỏng)
                </span>
              </div>

              {/* Cultural Story */}
              <div className="mt-4 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-1.5 text-stone-800 font-semibold text-sm">
                  <BookIcon className="w-4 h-4 text-[#88131B]" />
                  <span>Câu chuyện văn hóa sâu sắc</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
                  {character.culturalStory}
                </p>
              </div>

              {/* Design Symbolism */}
              <div className="mt-3.5 pt-3.5 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-stone-800 font-semibold text-sm">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>Ý nghĩa biểu tượng nghệ thuật</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {character.symbolism.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Art Toy Specs */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                <div>
                  <span className="text-stone-400 block text-[11px]">Chiều cao:</span>
                  <span className="font-semibold text-stone-800">{character.stats.height}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Chất liệu:</span>
                  <span className="font-semibold text-stone-800">{character.stats.material}</span>
                </div>
              </div>
            </div>

            {/* Action Bar: Quantity, Favorite, Add to Cart */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Giảm số lượng"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-semibold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label="Tăng số lượng"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(character.id)}
                className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center ${
                  favorited
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-white border-stone-300 text-stone-600 hover:text-rose-600 hover:border-rose-200'
                }`}
                aria-label={favorited ? 'Bỏ yêu thích' : 'Yêu thích nhân vật'}
                title={favorited ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-600' : ''}`} />
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-5 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
                <span>Thêm vào giỏ hàng mô phỏng</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-5" />
    <path d="M6 2v20" />
  </svg>
);
