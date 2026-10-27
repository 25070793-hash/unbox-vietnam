import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VOUCHERS } from '../data/characters';
import {
  Tag,
  Coins,
  Copy,
  Check,
  Sparkles,
  Ticket,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { formatCurrency } from '../utils/shopLogic';

export const VouchersView: React.FC = () => {
  const {
    coins,
    redeemVoucher,
    redeemedVouchers,
    addToast,
    navigateTo,
  } = useApp();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Đã sao chép mã: ${code}`, 'info');
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Tag className="w-3.5 h-3.5 text-amber-600" />
          <span>Hệ Thống Đổi Mã Giảm Giá</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Đổi Voucher & Ví Ưu Đãi
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Sử dụng Xu Văn Hóa bạn tích lũy từ các nhiệm vụ và mini game để đổi mã giảm giá mô phỏng. Mã sau khi đổi sẽ xuất hiện trong Ví và có thể áp dụng ngay trong giỏ hàng!
        </p>

        {/* Current Coin Balance */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#5B0D12] text-[#FEF08A] font-bold text-sm border border-[#F59E0B]/50 shadow-sm mt-2">
          <Coins className="w-4 h-4 text-[#F59E0B]" />
          <span>Số dư hiện có: {coins} Xu Văn Hóa</span>
        </div>
      </div>

      {/* Available Vouchers to Redeem */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-[#88131B]" />
          <span>Danh Sách 4 Gói Voucher Có Thể Đổi</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VOUCHERS.map((voucher) => {
            const canAfford = coins >= voucher.coinCost;
            const alreadyHasUnused = redeemedVouchers.some(
              (v) => v.code === voucher.code && !v.isUsed
            );

            return (
              <div
                key={voucher.code}
                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {/* Cultural edge motif */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-[#88131B] bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                        Giảm {voucher.discountPercent}%
                      </span>
                      <h3 className="text-xl font-bold text-stone-900 mt-1 font-mono tracking-tight">
                        {voucher.code}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-stone-400">Chi phí đổi</div>
                      <div className="text-sm font-extrabold text-[#B45309] flex items-center gap-1 justify-end">
                        <Coins className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>{voucher.coinCost} xu</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mt-2">
                    {voucher.description}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Áp dụng cho đơn hàng tối thiểu {formatCurrency(voucher.minSpend)}. Giảm tối đa {formatCurrency(voucher.maxDiscount)}.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-400">
                    {alreadyHasUnused
                      ? 'Đã có trong ví'
                      : canAfford
                      ? 'Đủ điều kiện đổi'
                      : `Còn thiếu ${voucher.coinCost - coins} xu`}
                  </span>

                  <button
                    disabled={!canAfford || alreadyHasUnused}
                    onClick={() => redeemVoucher(voucher.code)}
                    className="py-2 px-4 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed font-semibold text-xs shadow-xs transition-colors"
                  >
                    {alreadyHasUnused
                      ? 'Đã Có Trong Ví'
                      : canAfford
                      ? 'Đổi Mã Ngay'
                      : 'Chưa Đủ Xu'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* My Voucher Wallet */}
      <div className="space-y-4 pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#0F766E]" />
            <span>Ví Voucher Của Tôi ({redeemedVouchers.length})</span>
          </h2>

          <button
            onClick={() => navigateTo('cart')}
            className="text-xs font-semibold text-[#88131B] hover:underline flex items-center gap-1"
          >
            <span>Đến giỏ hàng để áp dụng</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {redeemedVouchers.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-2xl bg-[#FAF6F0] border border-stone-200 text-stone-500 text-sm">
            Bạn chưa đổi voucher nào. Hãy hoàn thành các nhiệm vụ hoặc mini game để kiếm thêm Xu Văn Hóa và đổi quà nhé!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {redeemedVouchers.map((v, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  v.isUsed
                    ? 'bg-stone-100 border-stone-200 opacity-60'
                    : 'bg-white border-amber-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono tracking-wider text-stone-900">
                      {v.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        v.isUsed
                          ? 'bg-stone-200 text-stone-600'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {v.isUsed ? 'Đã sử dụng' : 'Chưa dùng'}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-semibold text-[#88131B]">
                    Giảm {v.discountPercent}% (Tối đa {formatCurrency(v.maxDiscount)})
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    Đổi ngày: {v.redeemedAt}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    disabled={v.isUsed}
                    onClick={() => handleCopyCode(v.code)}
                    className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 disabled:opacity-50"
                  >
                    {copiedCode === v.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Đã sao chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép mã</span>
                      </>
                    )}
                  </button>

                  {!v.isUsed && (
                    <button
                      onClick={() => navigateTo('cart')}
                      className="px-2.5 py-1 rounded-lg bg-[#88131B] text-[#FEF3C7] text-xs font-semibold hover:bg-[#6F0D14]"
                    >
                      Dùng ngay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Academic Disclaimer */}
      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3 text-xs text-stone-500">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Lưu ý học thuật:</strong> Tất cả mã giảm giá trên chỉ có giá trị hiệu lực mô phỏng trong khuôn khổ website dự án VNU1001. Không có giá trị quy đổi thành tiền mặt hoặc sử dụng cho bất kỳ dịch vụ hay sàn thương mại điện tử thực tế nào.
        </span>
      </div>
    </div>
  );
};
