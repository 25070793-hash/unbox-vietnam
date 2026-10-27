import React from 'react';
import { useApp } from '../context/AppContext';
import { CharacterArt } from '../components/illustrations/CharacterIllustrations';
import { Heart, ShoppingBag, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/shopLogic';

export const FavoritesView: React.FC = () => {
  const {
    characters,
    favorites,
    toggleFavorite,
    addToCart,
    setSelectedCharacterId,
    playCharacterMelody,
    playingCharacterId,
    navigateTo,
  } = useApp();

  const favoriteCharacters = characters.filter((c) => favorites.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
          <span>Danh Sách Ưa Thích</span>
        </div>
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
          Nhân Vật Bạn Yêu Thích ({favoriteCharacters.length})
        </h1>
        <p className="text-sm text-stone-600">
          Lưu giữ những tác phẩm Art Toy chạm đến trái tim bạn để dễ dàng theo dõi và bổ sung vào giỏ hàng mô phỏng.
        </p>
      </div>

      {favoriteCharacters.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-stone-800">
            Chưa Có Nhân Vật Yêu Thích Nào
          </h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Hãy ghé thăm bộ sưu tập và nhấn vào biểu tượng trái tim của các nhân vật bạn yêu mến nhé!
          </p>
          <button
            onClick={() => navigateTo('collection')}
            className="px-5 py-2.5 rounded-xl bg-[#88131B] text-[#FEF3C7] text-xs font-semibold hover:bg-[#6F0D14] transition-colors"
          >
            Khám Phá Bộ Sưu Tập
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCharacters.map((character) => {
            const isPlaying = playingCharacterId === character.id;

            return (
              <div
                key={character.id}
                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {character.category}
                    </span>
                    <button
                      onClick={() => toggleFavorite(character.id)}
                      className="p-1.5 rounded-full text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                      title="Bỏ yêu thích"
                    >
                      <Heart className="w-4 h-4 fill-rose-600" />
                    </button>
                  </div>

                  <div
                    onClick={() => setSelectedCharacterId(character.id)}
                    className="cursor-pointer flex justify-center py-2 hover:scale-105 transition-transform"
                  >
                    <CharacterArt id={character.id} size="md" />
                  </div>

                  <div className="mt-2">
                    <h3
                      onClick={() => setSelectedCharacterId(character.id)}
                      className="font-bold text-base text-stone-900 hover:text-[#88131B] cursor-pointer"
                    >
                      {character.name}
                    </h3>
                    <p className="text-xs text-stone-400 italic mt-0.5">
                      {character.vietnameseTitle}
                    </p>
                    <div className="text-sm font-extrabold text-[#88131B] mt-2">
                      {formatCurrency(character.price)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => playCharacterMelody(character.id)}
                    className="p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs"
                    title="Nghe giai điệu"
                  >
                    {isPlaying ? (
                      <VolumeX className="w-4 h-4 text-[#88131B]" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedCharacterId(character.id)}
                    className="flex-1 py-2 px-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold"
                  >
                    Xem chi tiết
                  </button>

                  <button
                    onClick={() => addToCart(character, 1)}
                    className="p-2 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14]"
                    title="Thêm vào giỏ"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
