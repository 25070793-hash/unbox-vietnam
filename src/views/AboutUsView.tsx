import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  Heart,
  Palette,
  Users,
  Compass,
} from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88131B]/10 text-[#88131B] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Học Phần VNU1001 · Đại Học Quốc Gia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Về Dự Án UNBOX VIETNAM
        </h1>
        <p className="text-base text-stone-600 font-serif italic">
          "The Art of Neo-Folklore – Khi Nghệ Thuật Đương Đại Thổi Sức Sống Mới Vào Di Sản Dân Gian"
        </p>
      </div>

      {/* Main Narrative Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#B45309]/30 shadow-md space-y-6 text-stone-700 leading-relaxed text-justify text-sm sm:text-base">
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            1. Bối Cảnh Và Sứ Mệnh Học Thuật
          </h2>
          <p>
            Dự án <strong>UNBOX VIETNAM</strong> được thai nghén và thực hiện trong khuôn khổ học phần <strong>VNU1001</strong>. Xuất phát từ niềm trăn trở: <em>Làm thế nào để các giá trị truyền thống Việt Nam không chỉ nằm yên trong những trang sách lịch sử hay tủ kính bảo tàng, mà trở nên gần gũi, sống động và hấp dẫn với thế hệ trẻ Gen Z?</em>
          </p>
          <p className="mt-3">
            Chúng tôi lựa chọn <strong>Art Toy (đồ chơi nghệ thuật)</strong> – ngôn ngữ thị giác bùng nổ toàn cầu của giới trẻ – làm nhịp cầu kết nối. Qua đó, từng biểu tượng văn hóa kinh điển được chuyển thể thành các tác phẩm điêu khắc nghệ thuật thu nhỏ đầy cuốn hút.
          </p>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            2. Triết Lý Thiết Kế: Premium Neo-Folklore
          </h2>
          <p>
            <strong>Neo-Folklore</strong> (Dân gian Mới) là phong cách thẩm mỹ tôn vinh cội nguồn bằng tư duy tạo hình hiện đại. Website và các nhân vật được thiết kế trên nền tảng 5 sắc thái màu truyền thống Việt Nam:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-4 text-center text-xs font-bold">
            <div className="p-3 rounded-xl bg-[#88131B] text-[#FEF3C7] shadow-sm">
              Đỏ Sơn Mài
            </div>
            <div className="p-3 rounded-xl bg-[#0D9488] text-white shadow-sm">
              Xanh Ngọc
            </div>
            <div className="p-3 rounded-xl bg-[#D97706] text-white shadow-sm">
              Vàng Đồng
            </div>
            <div className="p-3 rounded-xl bg-[#FAF6F0] text-stone-800 border border-stone-300 shadow-sm">
              Trắng Kem
            </div>
            <div className="p-3 rounded-xl bg-[#451A03] text-[#FEF3C7] shadow-sm col-span-2 sm:col-span-1">
              Nâu Gỗ
            </div>
          </div>

          <p>
            Toàn bộ giao diện sử dụng kiểu chữ kinh điển <strong>Times New Roman</strong>, hòa hợp sự trang nhã của sách vở tri thức xưa với các họa tiết sen hồng, mây ngũ sắc triều Nguyễn, sóng nước Thủy Đình và trống đồng Đông Sơn.
          </p>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <h2 className="text-xl font-bold text-stone-900 mb-2">
            3. Tuyển Tập 7 Nhân Vật Biểu Trưng
          </h2>
          <p>
            Bộ sưu tập 7 nhân vật đại diện cho 7 nét đẹp tinh hoa trải dài từ truyện cổ tích đến nhịp sống đương thời:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm mt-3 text-stone-700">
            <li><strong>Crybaby – Cô Tấm:</strong> Cổ tích Tấm Cám, hoa sen thanh khiết và lòng thơm thảo.</li>
            <li><strong>Hirono – Trà Đá Vỉa Hè:</strong> Ghế nhựa xanh, ly trà đá và nhịp thở phố Việt dung dị.</li>
            <li><strong>Labubu – Chú Tễu Thủy Đình:</strong> Tiếng cười hóm hỉnh của nghệ thuật Múa Rối Nước ngàn năm.</li>
            <li><strong>Sweet Bean – Bé Tò He:</strong> Bột nếp ngũ sắc dân gian làng nghề Xuân La 300 tuổi.</li>
            <li><strong>Hacipupu – Sĩ Tử Ngủ Gật:</strong> Truyền thống hiếu học, bia rùa đá Văn Miếu - Quốc Tử Giám.</li>
            <li><strong>Skullpanda – Nhật Bình Neon:</strong> Cổ phục Áo Nhật Bình triều Nguyễn giao thoa ánh sáng vị lai.</li>
            <li><strong>Pucky – Cá Chép Trông Trăng:</strong> Tranh Hàng Trống "Lý Ngư Vọng Nguyệt" và Tết Trung Thu rước đèn.</li>
          </ul>
        </div>
      </div>

      {/* Academic Disclaimer Notice */}
      <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#B45309]/30 space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-[#88131B]" />
          <span>Cam Kết Phi Thương Mại & Tôn Trọng Bản Quyền</span>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-justify">
          Trang web này là một <strong>sản phẩm đồ án nghiên cứu học thuật phi thương mại</strong> được xây dựng phục vụ đánh giá kết quả học tập trong khuôn khổ môn học VNU1001. Dự án lấy cảm hứng nghệ thuật từ các biểu tượng art toy nổi tiếng kết hợp với văn hóa truyền thống Việt Nam. Chúng tôi không thực hiện bất kỳ giao dịch bán hàng, thu tiền thực tế hay chuyển giao hàng hóa thương mại nào. Mọi hình ảnh, giai điệu Web Audio và nội dung đều hướng tới mục đích giáo dục, tôn vinh và lan tỏa di sản dân tộc.
        </p>
      </div>

      {/* Call to action */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigateTo('collection')}
          className="px-6 py-3 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] font-bold text-sm shadow-md transition-colors"
        >
          Khám Phá Toàn Bộ Tác Phẩm Ngay
        </button>
      </div>
    </div>
  );
};
