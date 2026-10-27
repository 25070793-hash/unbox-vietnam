import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CharacterArt } from '../components/illustrations/CharacterIllustrations';
import {
  Search,
  Volume2,
  VolumeX,
  Heart,
  ShoppingBag,
  Sparkles,
  Filter,
  Check,
} from 'lucide-react';
import { formatCurrency } from '../utils/shopLogic';

export const CollectionView: React.FC = () => {
  const {
    characters,
    setSelectedCharacterId,
    playingCharacterId,
    playCharacterMelody,
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const categories = [
    'Tất cả',
    'Cổ tích & Truyền thuyết',
    'Đời sống phố phường',
    'Nghệ thuật dân gian',
    'Cung đình & Khoa cử',
    'Lễ hội & Tết',
  ];

  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vietnameseTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Tất cả' || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [characters, searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88131B]/10 text-[#88131B] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>7 Tác Phẩm Art Toy · Mùa Khởi Nguyên</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Bộ Sưu Tập UNBOX VIETNAM
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Từng nhân vật là sự kết tinh giữa hình tượng Art Toy đình đám và một mảnh ghép di sản văn hóa Việt Nam. Nhấn vào từng nhân vật để lắng nghe giai điệu đặc trưng riêng biệt và chiêm nghiệm câu chuyện lịch sử.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên nhân vật, chủ đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-[#88131B] focus:ring-1 focus:ring-[#88131B] transition-colors"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#88131B] text-[#FEF3C7] shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Characters Grid */}
      {filteredCharacters.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white border border-stone-200">
          <p className="text-stone-500 text-sm">
            Không tìm thấy nhân vật nào phù hợp với tìm kiếm của bạn.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tất cả');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => {
            const isPlaying = playingCharacterId === character.id;
            const favorited = isFavorite(character.id);

            return (
              <div
                key={character.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all p-4 duration-300 relative"
              >
                <div>
                  {/* Category & Favorite Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-md">
                      {character.category}
                    </span>
                    <button
                      onClick={() => toggleFavorite(character.id)}
                      className={`p-1.5 rounded-full transition-colors ${
                        favorited
                          ? 'text-rose-600 bg-rose-50'
                          : 'text-stone-400 hover:text-rose-600 hover:bg-stone-50'
                      }`}
                      aria-label="Yêu thích nhân vật"
                    >
                      <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>

                  {/* Character Illustration Preview */}
                  <div
                    onClick={() => setSelectedCharacterId(character.id)}
                    className="cursor-pointer flex justify-center py-3 group-hover:scale-105 transition-transform duration-300"
                  >
                    <CharacterArt id={character.id} size="md" />
                  </div>

                  {/* Details */}
                  <div className="mt-2">
                    <h2
                      onClick={() => setSelectedCharacterId(character.id)}
                      className="font-bold text-lg text-stone-900 group-hover:text-[#88131B] transition-colors cursor-pointer"
                    >
                      {character.name}
                    </h2>
                    <p className="text-xs text-stone-400 font-medium italic mt-0.5">
                      {character.vietnameseTitle}
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                      {character.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-stone-400">Giá mô phỏng</div>
                    <div className="text-base font-extrabold text-[#88131B]">
                      {formatCurrency(character.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Melody Preview Button */}
                    <button
                      onClick={() => playCharacterMelody(character.id)}
                      className={`p-2 rounded-xl transition-colors border ${
                        isPlaying
                          ? 'bg-[#88131B] text-[#FEF3C7] border-[#88131B] animate-pulse'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200'
                      }`}
                      title={isPlaying ? 'Dừng phát nhạc' : 'Nghe giai điệu nhân vật'}
                      aria-label={`Nghe nhạc ${character.name}`}
                    >
                      {isPlaying ? (
                        <VolumeX className="w-4 h-4 text-[#F59E0B]" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    {/* View Details Modal */}
                    <button
                      onClick={() => setSelectedCharacterId(character.id)}
                      className="px-2.5 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold"
                    >
                      Chi tiết
                    </button>

                    {/* Add to cart */}
                    <button
                      onClick={() => addToCart(character, 1)}
                      className="p-2 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] transition-colors shadow-xs"
                      title="Thêm vào giỏ"
                      aria-label={`Thêm ${character.name} vào giỏ hàng`}
                    >
                      <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pop Mart creative disclaimer */}
      <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#B45309]/20 text-center text-xs text-stone-500">
        Dự án sáng tạo phi thương mại lấy cảm hứng từ thế giới Art Toy đương đại và văn hóa dân gian Việt Nam. Không phải website POP MART chính thức hoặc sản phẩm thương mại được cấp phép.
      </div>
    </div>
  );
};
