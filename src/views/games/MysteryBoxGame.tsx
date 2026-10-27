import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Character, CharacterId } from '../../types';
import { CharacterArt } from '../../components/illustrations/CharacterIllustrations';
import {
  Gift,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { audioSynth } from '../../services/audioSynth';

export const MysteryBoxGame: React.FC = () => {
  const {
    characters,
    unlockCharacter,
    recordMysteryBoxPlay,
    playCharacterMelody,
    playingCharacterId,
    navigateTo,
  } = useApp();

  const [isOpening, setIsOpening] = useState(false);
  const [unboxedCharacter, setUnboxedCharacter] = useState<Character | null>(null);

  const handleOpenBox = () => {
    if (isOpening) return;

    setIsOpening(true);
    audioSynth.playUiSound('box_open');

    // Simulate opening suspense animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const chosen = characters[randomIndex];

      setUnboxedCharacter(chosen);
      unlockCharacter(chosen.id);
      recordMysteryBoxPlay();
      audioSynth.playUiSound('victory');
      setIsOpening(false);
    }, 1800);
  };

  const handleReset = () => {
    setUnboxedCharacter(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-semibold">
          <Gift className="w-3.5 h-3.5 text-rose-600" />
          <span>Mini Game 1 · Bí Ẩn Dân Gian</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Mystery Box – Mở Hộp Bí Ẩn
        </h1>
        <p className="text-sm text-stone-600">
          Chạm vào hộp quà để mở ra 1 trong 7 nhân vật ngẫu nhiên. Nhân vật sẽ được tự động lưu vào <strong>Bộ sưu tập của tôi</strong> và ghi nhận tiến độ nhiệm vụ hằng ngày (+50 xu)!
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#B45309]/30 shadow-xl text-center relative overflow-hidden">
        {/* Background decorative shine */}
        <div className="absolute inset-0 bg-radial from-amber-100/40 via-transparent to-transparent pointer-events-none" />

        {!unboxedCharacter ? (
          <div className="space-y-6 relative z-10 py-6">
            {/* 3D Box Illustration / Animation */}
            <div className="flex justify-center">
              <div
                onClick={handleOpenBox}
                className={`relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer select-none transition-transform duration-300 ${
                  isOpening ? 'animate-bounce scale-110' : 'hover:scale-105'
                }`}
                title="Nhấn để mở hộp bí ẩn"
              >
                {/* SVG Mystery Box with Lacquer Red & Gold ribbon */}
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="boxBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#991B1B" />
                      <stop offset="100%" stopColor="#5B0D12" />
                    </linearGradient>
                    <linearGradient id="boxLid" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#B91C1C" />
                      <stop offset="100%" stopColor="#7F1D1D" />
                    </linearGradient>
                    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>

                  {/* Ground Shadow */}
                  <ellipse cx="100" cy="180" rx="70" ry="14" fill="#000000" fillOpacity="0.2" />

                  {/* Box Body */}
                  <rect x="40" y="75" width="120" height="95" rx="8" fill="url(#boxBody)" stroke="#F59E0B" strokeWidth="2" />

                  {/* Vertical Gold Ribbon */}
                  <rect x="90" y="75" width="20" height="95" fill="url(#goldRibbon)" />

                  {/* Box Lid */}
                  <rect x="32" y="55" width="136" height="26" rx="6" fill="url(#boxLid)" stroke="#F59E0B" strokeWidth="2" />
                  <rect x="90" y="55" width="20" height="26" fill="url(#goldRibbon)" />

                  {/* Big Gold Bow on Top */}
                  <path d="M100 55 C80 30, 60 40, 85 55 Z" fill="url(#goldRibbon)" stroke="#B45309" strokeWidth="1" />
                  <path d="M100 55 C120 30, 140 40, 115 55 Z" fill="url(#goldRibbon)" stroke="#B45309" strokeWidth="1" />
                  <circle cx="100" cy="55" r="7" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />

                  {/* Question Mark or Sparkles */}
                  <text x="100" y="135" textAnchor="middle" fill="#FEF3C7" fontSize="32" fontWeight="bold">
                    ?
                  </text>
                </svg>

                {isOpening && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-amber-400/40 animate-ping" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-stone-700">
                {isOpening ? 'Đang mở hộp bí ẩn...' : 'Nhấn vào chiếc hộp để khai mở nhân vật'}
              </p>
              <button
                onClick={handleOpenBox}
                disabled={isOpening}
                className="px-8 py-3 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] disabled:opacity-50 font-bold text-sm shadow-lg transition-all"
              >
                {isOpening ? 'Đang mở bí mật...' : 'Mở Hộp Ngay'}
              </button>
            </div>
          </div>
        ) : (
          /* Unboxed Result Card */
          <div className="space-y-6 relative z-10 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mở Hộp Thành Công! Đã Lưu Vào Bộ Sưu Tập</span>
            </div>

            <div className="flex flex-col items-center">
              <CharacterArt id={unboxedCharacter.id} size="lg" className="shadow-lg" />
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-4">
                {unboxedCharacter.name}
              </h2>
              <p className="text-xs text-stone-500 font-medium italic mt-0.5">
                {unboxedCharacter.vietnameseTitle}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mt-3 leading-relaxed">
                {unboxedCharacter.culturalStory}
              </p>
            </div>

            {/* Quick Audio Play for unboxed character */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => playCharacterMelody(unboxedCharacter.id)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors ${
                  playingCharacterId === unboxedCharacter.id
                    ? 'bg-[#88131B] text-[#FEF3C7] border-[#88131B]'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border-stone-200'
                }`}
              >
                {playingCharacterId === unboxedCharacter.id ? (
                  <>
                    <VolumeX className="w-4 h-4 text-[#F59E0B]" />
                    <span>Dừng nghe</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#88131B]" />
                    <span>Nghe giai điệu nhân vật</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTo('my-collection')}
                className="py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Xem trong Bộ sưu tập của tôi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleReset}
                className="py-2 px-4 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mở lại hộp khác</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
