import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CharacterArt } from '../components/illustrations/CharacterIllustrations';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldAlert,
  Ticket,
} from 'lucide-react';
import {
  formatCurrency,
  calculateShipping,
  calculateOrderTotal,
} from '../utils/shopLogic';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    selectedVoucherCode,
    setSelectedVoucherCode,
    activeDiscount,
    redeemedVouchers,
    navigateTo,
    addToast,
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  const shippingFee = calculateShipping(cartSubtotal);
  const totalAmount = calculateOrderTotal(cartSubtotal, activeDiscount, shippingFee);

  // Available unused vouchers
  const availableVouchers = redeemedVouchers.filter((v) => !v.isUsed);

  const handleApplyVoucher = (code: string) => {
    const found = availableVouchers.find(
      (v) => v.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (!found) {
      addToast(
        'Mã không hợp lệ hoặc bạn chưa đổi mã này trong mục Đổi Voucher!',
        'warning'
      );
      return;
    }
    setSelectedVoucherCode(found.code);
    addToast(`Đã áp dụng mã giảm giá ${found.code}!`, 'success');
    setInputCode('');
  };

  const handleRemoveVoucher = () => {
    setSelectedVoucherCode(null);
    addToast('Đã hủy áp dụng voucher.', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#FAF6F0] border border-[#B45309]/30 text-[#88131B] flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
          Giỏ Hàng Mô Phỏng Đang Trống
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Hãy khám phá bộ sưu tập 7 nhân vật Art Toy mang đậm phong cách Neo-Folklore Việt Nam và chọn cho mình tác phẩm ưng ý nhất!
        </p>
        <button
          onClick={() => navigateTo('collection')}
          className="mt-4 px-6 py-3 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] font-semibold text-sm shadow-md transition-colors"
        >
          Khám phá Bộ Sưu Tập ngay
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-stone-500">
        <span className="text-[#88131B] flex items-center gap-1.5 font-bold">
          <span className="w-6 h-6 rounded-full bg-[#88131B] text-white flex items-center justify-center text-xs">
            1
          </span>
          <span>Giỏ hàng</span>
        </span>
        <span className="text-stone-300">→</span>
        <span className="flex items-center gap-1.5 text-stone-400">
          <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs">
            2
          </span>
          <span>Thông tin nhận hàng</span>
        </span>
        <span className="text-stone-300">→</span>
        <span className="flex items-center gap-1.5 text-stone-400">
          <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs">
            3
          </span>
          <span>Xác nhận đơn</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900">
            Sản Phẩm Trong Giỏ ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </h2>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.character.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="shrink-0">
                    <CharacterArt id={item.character.id} size="sm" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900">
                      {item.character.name}
                    </h3>
                    <p className="text-xs text-stone-400 italic">
                      {item.character.vietnameseTitle}
                    </p>
                    <div className="text-sm font-extrabold text-[#88131B] mt-1">
                      {formatCurrency(item.character.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.character.id, item.quantity - 1)
                      }
                      className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label="Giảm số lượng"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-stone-800 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.character.id, item.quantity + 1)
                      }
                      className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                      aria-label="Tăng số lượng"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <div className="text-right min-w-[90px]">
                    <div className="text-sm font-bold text-stone-900">
                      {formatCurrency(item.character.price * item.quantity)}
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.character.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    aria-label="Xóa sản phẩm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Voucher & Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Voucher selection & apply */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#88131B]" />
              <span>Mã Giảm Giá Mô Phỏng</span>
            </h3>

            {/* Quick dropdown or select from wallet */}
            {availableVouchers.length > 0 ? (
              <div className="space-y-2">
                <label className="text-xs text-stone-500 block">
                  Chọn từ Ví Voucher của bạn:
                </label>
                <div className="space-y-1.5">
                  {availableVouchers.map((v) => (
                    <div
                      key={v.code}
                      onClick={() => setSelectedVoucherCode(v.code)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                        selectedVoucherCode === v.code
                          ? 'border-[#88131B] bg-rose-50 text-[#88131B] font-semibold'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold">{v.code}</span>
                        <span className="text-[11px] text-stone-500 ml-2">
                          (Giảm {v.discountPercent}%)
                        </span>
                      </div>
                      {selectedVoucherCode === v.code && (
                        <span className="text-[11px] text-[#88131B]">Đang chọn</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
                Bạn chưa có voucher nào trong Ví.{' '}
                <button
                  onClick={() => navigateTo('vouchers')}
                  className="text-[#88131B] underline font-semibold"
                >
                  Đổi Voucher ngay
                </button>
              </div>
            )}

            {/* Input voucher code */}
            <div className="flex gap-2 pt-2 border-t border-stone-100">
              <input
                type="text"
                placeholder="Nhập mã voucher..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#88131B] uppercase font-mono"
              />
              <button
                onClick={() => handleApplyVoucher(inputCode)}
                className="px-3 py-2 rounded-xl bg-stone-800 text-white hover:bg-stone-900 text-xs font-semibold"
              >
                Áp dụng
              </button>
            </div>

            {selectedVoucherCode && (
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs">
                <span>Đã áp dụng: <strong>{selectedVoucherCode}</strong></span>
                <button
                  onClick={handleRemoveVoucher}
                  className="text-stone-500 hover:text-rose-600 underline text-[11px]"
                >
                  Hủy
                </button>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <h3 className="font-bold text-base text-stone-900 pb-2 border-b border-stone-100">
              Tóm Tắt Đơn Hàng
            </h3>

            <div className="flex justify-between text-xs sm:text-sm text-stone-600">
              <span>Tạm tính ({cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm)</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {formatCurrency(cartSubtotal)}
              </span>
            </div>

            <div className="flex justify-between text-xs sm:text-sm text-stone-600">
              <span>Phí vận chuyển mô phỏng</span>
              <span className="tabular-nums">
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-semibold">Miễn phí (≥ 500k)</span>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </span>
            </div>

            {activeDiscount > 0 && (
              <div className="flex justify-between text-xs sm:text-sm text-emerald-700 font-medium">
                <span>Giảm giá ({selectedVoucherCode})</span>
                <span className="tabular-nums">-{formatCurrency(activeDiscount)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-bold text-base text-stone-900">Tổng thanh toán</span>
              <span className="font-extrabold text-xl sm:text-2xl text-[#88131B] tabular-nums">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full mt-4 py-3 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
