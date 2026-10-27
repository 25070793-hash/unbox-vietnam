import React from 'react';
import { useApp } from '../context/AppContext';
import { CharacterArt } from '../components/illustrations/CharacterIllustrations';
import {
  Sparkles,
  Lock,
  Gift,
  Disc,
  ArrowRight,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const MyCollectionView: React.FC = () => {
  const {
    characters,
    unlockedCharacters,
    setSelectedCharacterId,
    playingCharacterId,
    playCharacterMelody,
    navigateTo,
  } = useApp();

  const totalCharacters = characters.length;
  const unlockedCount = unlockedCharacters.length;
  const progressPercent = Math.round((unlockedCount / totalCharacters) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Progress Stats */}
      <div className="p-8 rounded-3xl bg-white border border-[#B45309]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kho Tàng Cá Nhân</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Bộ Sưu Tập Của Tôi
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg">
            Nơi lưu giữ các tác phẩm búp bê Art Toy bạn đã mở khóa thông qua Mystery Box, Vòng quay may mắn hoặc Trắc nghiệm tính cách.
          </p>
        </div>

        {/* Unlocked Counter & Progress */}
        <div className="flex flex-col items-center md:items-end w-full md:w-64 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#88131B] tabular-nums">
              {unlockedCount} / {totalCharacters}
            </span>
            <span className="text-xs font-semibold text-stone-500">Nhân vật</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
            <div
              className="h-full bg-gradient-to-r from-[#B45309] to-[#88131B] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-stone-400 font-medium">
            Đã hoàn thành {progressPercent}% bộ sưu tập
          </span>
        </div>
      </div>

      {/* Grid of 7 Characters (Unlocked vs Locked) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => {
          const isUnlocked = unlockedCharacters.includes(character.id);
          const isPlaying = playingCharacterId === character.id;

          return (
            <div
              key={character.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-md hover:shadow-xl'
                  : 'bg-stone-50 border-stone-200 opacity-75'
              }`}
            >
              <div>
                {/* Header status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {character.category}
                  </span>
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Đã mở khóa</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3 text-stone-500" />
                      <span>Chưa mở</span>
                    </span>
                  )}
                </div>

                {/* Character Illustration / Lock Silhouette */}
                <div className="flex justify-center py-4 relative">
                  {isUnlocked ? (
                    <div
                      onClick={() => setSelectedCharacterId(character.id)}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    >
                      <CharacterArt id={character.id} size="md" />
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center filter grayscale opacity-40">
                      <CharacterArt id={character.id} size="md" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/20 backdrop-blur-[1px] rounded-2xl">
                        <div className="w-10 h-10 rounded-full bg-stone-800 text-stone-200 flex items-center justify-center shadow-md">
                          <Lock className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Name & Title */}
                <div className="mt-2 text-center">
                  <h3
                    onClick={() => isUnlocked && setSelectedCharacterId(character.id)}
                    className={`font-bold text-base ${
                      isUnlocked
                        ? 'text-stone-900 hover:text-[#88131B] cursor-pointer'
                        : 'text-stone-500'
                    }`}
                  >
                    {character.name}
                  </h3>
                  <p className="text-xs text-stone-400 italic mt-0.5">
                    {character.vietnameseTitle}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-center gap-2">
                {isUnlocked ? (
                  <>
                    <button
                      onClick={() => setSelectedCharacterId(character.id)}
                      className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => playCharacterMelody(character.id)}
                      className="p-1.5 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200"
                      title="Nghe nhạc"
                    >
                      {isPlaying ? (
                        <VolumeX className="w-4 h-4 text-[#88131B]" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-stone-600" />
                      )}
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => navigateTo('mystery-box')}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-[#88131B] text-[#FEF3C7] text-[11px] font-semibold hover:bg-[#6F0D14] flex items-center justify-center gap-1"
                    >
                      <Gift className="w-3 h-3" />
                      <span>Mở hộp</span>
                    </button>
                    <button
                      onClick={() => navigateTo('lucky-wheel')}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-stone-200 text-stone-700 text-[11px] font-semibold hover:bg-stone-300 flex items-center justify-center gap-1"
                    >
                      <Disc className="w-3 h-3" />
                      <span>Quay thưởng</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
