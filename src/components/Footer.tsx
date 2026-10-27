import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, Heart, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#450A0A] text-[#FDFBF7] border-t border-[#B45309]/30 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#781017]">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#88131B] border border-[#F59E0B] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <span className="block text-xl font-bold tracking-tight text-[#FEF3C7]">
                  UNBOX VIETNAM
                </span>
                <span className="block text-xs text-[#FCD34D] tracking-widest uppercase">
                  The Art of Neo-Folklore
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FDE8E8]/80 leading-relaxed max-w-lg">
              Dự án học thuật xuất sắc thuộc học phần <strong>VNU1001</strong>. Kết hợp di sản văn hóa dân gian Việt Nam với làn sóng nghệ thuật Art Toy đương đại, nhằm tôn vinh, bảo tồn và lan tỏa niềm tự hào bản sắc dân tộc tới thế hệ trẻ.
            </p>

            <div className="p-3.5 rounded-xl bg-[#5B0D12] border border-[#B45309]/40 text-xs text-[#FEF08A] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>
                <strong>Tuyên bố phi thương mại:</strong> Đây là nền tảng mô phỏng phục vụ mục đích nghiên cứu học tập. Mọi hoạt động đặt hàng, voucher và giao dịch đều là giả lập trải nghiệm, không phát sinh chi phí thực tế.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#FCD34D] uppercase tracking-wider">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-sm text-[#FDE8E8]/80">
              <li>
                <button
                  onClick={() => navigateTo('collection')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Bộ sưu tập 7 nhân vật
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mystery-box')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Mystery Box – Mở hộp bí ẩn
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('lucky-wheel')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Vòng quay may mắn
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('quiz')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Trắc nghiệm tính cách Art Toy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('trivia')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Đố vui văn hóa Việt Nam
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & Disclaimers */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#FCD34D] uppercase tracking-wider">
              Thông Tin Dự Án
            </h4>
            <ul className="space-y-2 text-sm text-[#FDE8E8]/80">
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Học phần: VNU1001</span>
              </li>
              <li>Chủ đề: Nghệ thuật Neo-Folklore Việt</li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Về chúng tôi & Triết lý thiết kế
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('missions')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Hệ thống Nhiệm vụ & Xu
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('vouchers')}
                  className="hover:text-[#FEF3C7] transition-colors"
                >
                  Đổi mã ưu đãi mô phỏng
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FDE8E8]/60 gap-4">
          <p>© 2026 UNBOX VIETNAM · Dự án nghiên cứu sáng tạo sinh viên VNU1001.</p>
          <p className="flex items-center gap-1">
            Được kiến tạo với tâm huyết và tình yêu văn hóa Việt Nam <Heart className="w-3.5 h-3.5 text-[#F43F5E] inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
