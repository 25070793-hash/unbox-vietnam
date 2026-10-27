import React from 'react';
import { useApp } from '../context/AppContext';
import { CharacterArt } from '../components/illustrations/CharacterIllustrations';
import {
  Sparkles,
  Gift,
  Disc,
  Compass,
  HelpCircle,
  Coins,
  ArrowRight,
  Volume2,
  VolumeX,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { formatCurrency } from '../utils/shopLogic';

export const HomeView: React.FC = () => {
  const {
    characters,
    navigateTo,
    setSelectedCharacterId,
    playingCharacterId,
    playCharacterMelody,
    addToCart,
    toggleFavorite,
    isFavorite,
    coins,
  } = useApp();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#781017] via-[#88131B] to-[#5B0D12] text-[#FFFBEB] pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#B45309]/30">
        {/* Subtle decorative motif circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#0D9488]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B0D12]/80 border border-[#F59E0B]/50 text-[#FDE68A] text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Học Phần VNU1001 · Nghệ Thuật Neo-Folklore Việt</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FEF3C7] leading-tight">
                UNBOX VIETNAM <br />
                <span className="text-xl sm:text-3xl lg:text-4xl font-normal text-[#FCD34D] block mt-2">
                  The Art of Neo-Folklore
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#FDE8E8]/90 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Khám phá bản sắc văn hóa ngàn năm của dân tộc Việt Nam qua lăng kính Art Toy đương đại. Cùng gặp gỡ bộ sưu tập 7 nhân vật biểu tượng, trải nghiệm mua sắm mô phỏng và chuỗi 4 mini game rinh Xu Văn Hóa độc quyền.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigateTo('collection')}
                  className="px-6 py-3 rounded-xl bg-[#F59E0B] text-[#781017] hover:bg-[#D97706] font-bold text-sm shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Khám phá 7 Nhân Vật</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('mystery-box')}
                  className="px-6 py-3 rounded-xl bg-[#5B0D12] text-[#FEF3C7] hover:bg-[#6F0D14] border border-[#F59E0B]/50 font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Gift className="w-4 h-4 text-[#F59E0B]" />
                  <span>Mở Mystery Box Bí Ẩn</span>
                </button>
              </div>

              {/* Cultural Trust Markers */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#88131B]/80 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FCD34D]">7</div>
                  <div className="text-xs text-[#FDE8E8]/70">Nhân vật biểu trưng</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FCD34D]">4</div>
                  <div className="text-xs text-[#FDE8E8]/70">Mini Game tương tác</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FCD34D]">100%</div>
                  <div className="text-xs text-[#FDE8E8]/70">Học thuật phi lợi nhuận</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Art Toy Spotlight */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 rounded-3xl bg-gradient-to-b from-[#6F0D14] to-[#450A0A] border border-[#F59E0B]/40 shadow-2xl max-w-sm w-full text-center">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-[#B45309] text-[#FFFBEB] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  Tâm Điểm Nghệ Thuật
                </div>

                <div className="my-3 flex justify-center">
                  <CharacterArt id="skullpanda-nhat-binh" size="lg" />
                </div>

                <h3 className="text-xl font-bold text-[#FEF3C7]">
                  Skullpanda – Nhật Bình Neon
                </h3>
                <p className="text-xs text-[#FDE8E8]/80 mt-1 mb-4">
                  Cổ phục áo Nhật Bình triều Nguyễn hòa nhịp ánh sáng vị lai
                </p>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCharacterId('skullpanda-nhat-binh');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#991B1B] text-xs font-semibold border border-[#F59E0B]/40 transition-colors"
                  >
                    Xem chi tiết câu chuyện
                  </button>
                  <button
                    onClick={() => playCharacterMelody('skullpanda-nhat-binh')}
                    className="p-2 rounded-xl bg-[#5B0D12] text-[#F59E0B] hover:bg-[#6F0D14] border border-[#F59E0B]/40"
                    title="Nghe giai điệu nhã nhạc điện tử"
                  >
                    {playingCharacterId === 'skullpanda-nhat-binh' ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section: The Art of Neo-Folklore */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF6F0] border border-[#B45309]/20 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#88131B] uppercase tracking-widest block">
              Triết Lý Sáng Tạo · Neo-Folklore
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Khi Di Sản Dân Gian Trò Chuyện Cùng Nghệ Thuật Đương Đại
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed text-justify">
              <strong>Neo-Folklore</strong> trong UNBOX VIETNAM không phải là việc sao chép khô cứng các hiện vật bảo tàng, mà là cách chúng tôi tái sinh những giá trị văn hóa ngàn năm (truyện Tấm Cám, múa rối nước, trà đá vỉa hè, nặn tò he, khoa cử Văn Miếu, áo Nhật Bình, Tết Trung Thu) bằng thẩm mỹ Art Toy đương đại. Chúng tôi tin rằng, văn hóa chỉ thực sự sống mãi khi nó bước vào đời sống và trái tim của người trẻ hôm nay.
            </p>
          </div>
        </div>
      </section>

      {/* 7 Characters Collection Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#88131B] uppercase tracking-widest block mb-1">
              Tuyển Tập 7 Tác Phẩm
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Bộ Sưu Tập Nhân Vật Biểu Tượng
            </h2>
          </div>
          <button
            onClick={() => navigateTo('collection')}
            className="text-sm font-semibold text-[#88131B] hover:text-[#5B0D12] flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Xem toàn bộ bộ sưu tập & bộ lọc</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.slice(0, 4).map((character) => {
            const isPlaying = playingCharacterId === character.id;
            const favorited = isFavorite(character.id);

            return (
              <div
                key={character.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all p-4 duration-300"
              >
                <div>
                  {/* Category & Favorite Button */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
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
                    className="cursor-pointer flex justify-center py-2 group-hover:scale-105 transition-transform duration-300"
                  >
                    <CharacterArt id={character.id} size="md" />
                  </div>

                  {/* Character Info */}
                  <div className="mt-3">
                    <h3
                      onClick={() => setSelectedCharacterId(character.id)}
                      className="font-bold text-base text-stone-900 group-hover:text-[#88131B] transition-colors cursor-pointer"
                    >
                      {character.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                      {character.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-stone-400">Giá mô phỏng</div>
                    <div className="text-sm font-extrabold text-[#88131B]">
                      {formatCurrency(character.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Melody Preview Button */}
                    <button
                      onClick={() => playCharacterMelody(character.id)}
                      className={`p-2 rounded-lg transition-colors border ${
                        isPlaying
                          ? 'bg-[#88131B] text-[#FEF3C7] border-[#88131B]'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200'
                      }`}
                      title={isPlaying ? 'Dừng phát nhạc' : 'Nghe giai điệu'}
                    >
                      {isPlaying ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Add to cart */}
                    <button
                      onClick={() => addToCart(character, 1)}
                      className="p-2 rounded-lg bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] transition-colors shadow-xs"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner to see all remaining characters */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigateTo('collection')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#88131B] text-[#88131B] hover:bg-[#88131B] hover:text-[#FEF3C7] font-semibold text-xs transition-colors"
          >
            <span>Khám phá trọn bộ 7 tác phẩm (Bao gồm Bé Tò He, Sĩ Tử, Cá Chép...)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 4 Mini Games Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#88131B] uppercase tracking-widest block mb-1">
            Không Gian Trải Nghiệm Tương Tác
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            4 Mini Game Săn Xu Văn Hóa
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Tham gia các trò chơi dân gian tương tác để mở khóa búp bê vào bộ sưu tập cá nhân và tích lũy Xu đổi Voucher mua sắm mô phỏng.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Game 1: Mystery Box */}
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#FEF2F2] to-white border border-rose-200 shadow-xs hover:shadow-lg transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900">Mystery Box</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Mở chiếc hộp bí ẩn mạ vàng để nhận ngẫu nhiên 1 trong 7 nhân vật và thêm vào bộ sưu tập của bạn.
              </p>
            </div>
            <button
              onClick={() => navigateTo('mystery-box')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Chơi Ngay (+50 xu)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Game 2: Lucky Wheel */}
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#FFFBEB] to-white border border-amber-200 shadow-xs hover:shadow-lg transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Disc className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900">Vòng Quay May Mắn</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Quay chiếc la bàn văn hóa 7 cung bậc sắc màu để đón nhận búp bê may mắn hôm nay.
              </p>
            </div>
            <button
              onClick={() => navigateTo('lucky-wheel')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#B45309] text-white hover:bg-[#92400E] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Quay Ngay (+40 xu)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Game 3: Personality Quiz */}
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#F0FDFA] to-white border border-teal-200 shadow-xs hover:shadow-lg transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900">Trắc Nghiệm Tính Cách</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                5 câu hỏi khám phá bản ngã tâm hồn để tìm ra nhân vật Art Toy mang tần số đồng điệu với bạn.
              </p>
            </div>
            <button
              onClick={() => navigateTo('quiz')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#0F766E] text-white hover:bg-[#115E59] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Làm Bài (+80 xu)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Game 4: Cultural Trivia */}
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#FAF5FF] to-white border border-purple-200 shadow-xs hover:shadow-lg transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900">Đố Vui Văn Hóa</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Ngân hàng 16+ câu hỏi di sản Việt. Đạt ít nhất 4/5 câu đúng để hoàn thành nhiệm vụ và nhận thưởng.
              </p>
            </div>
            <button
              onClick={() => navigateTo('trivia')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#6B21A8] text-white hover:bg-[#581C87] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Thử Thách (+100 xu)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Rewards & Missions Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#5B0D12] to-[#781017] text-[#FFFBEB] flex flex-col md:flex-row items-center justify-between gap-6 border border-[#F59E0B]/30 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Coins className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-xs font-bold text-[#FCD34D] uppercase tracking-wider">
                Hệ Thống Nhiệm Vụ & Voucher Giảm Giá
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FEF3C7]">
              Tích Lũy Xu Văn Hóa · Đổi Voucher Đến 150.000 ₫
            </h3>
            <p className="text-xs sm:text-sm text-[#FDE8E8]/80 max-w-xl">
              Hoàn thành các thử thách xem nhân vật, chơi mini game để thu thập Xu Văn Hóa và đổi lấy các mã voucher độc quyền UNBOX5, UNBOX10, UNBOX15, UNBOX20.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('missions')}
              className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-[#781017] hover:bg-[#D97706] font-bold text-xs shadow-md transition-colors"
            >
              Xem danh sách nhiệm vụ
            </button>
            <button
              onClick={() => navigateTo('vouchers')}
              className="px-5 py-2.5 rounded-xl bg-[#6F0D14] border border-[#F59E0B]/50 text-[#FEF3C7] hover:bg-[#88131B] font-semibold text-xs transition-colors"
            >
              Ví voucher
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
