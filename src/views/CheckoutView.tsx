import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CustomerOrderForm } from '../types';
import { CharacterArt } from '../components/illustrations/CharacterIllustrations';
import {
  formatCurrency,
  calculateShipping,
  calculateOrderTotal,
  validateOrderForm,
} from '../utils/shopLogic';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  ArrowRight,
  AlertCircle,
  FileText,
  User,
  Phone,
  MapPin,
  Building,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    activeDiscount,
    selectedVoucherCode,
    createOrder,
    navigateTo,
    lastPlacedOrder,
  } = useApp();

  const [form, setForm] = useState<CustomerOrderForm>({
    fullName: '',
    phone: '',
    city: 'Hà Nội',
    ward: '',
    address: '',
    note: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedCustomer, setConfirmedCustomer] = useState<CustomerOrderForm | null>(null);

  const shippingFee = calculateShipping(cartSubtotal);
  const totalAmount = calculateOrderTotal(cartSubtotal, activeDiscount, shippingFee);

  const handleInputChange = (
    field: keyof CustomerOrderForm,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateOrderForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const result = createOrder(form);
    if (result.success) {
      setConfirmedCustomer({ ...form });
      setOrderConfirmed(true);
    }
  };

  if (orderConfirmed && lastPlacedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in zoom-in-95 duration-300">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-300 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Đặt Hàng Mô Phỏng Thành Công!
          </h1>
          <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            Mã đơn hàng mô phỏng: <strong className="font-mono text-[#88131B] text-base">{lastPlacedOrder.id}</strong>.
            Cảm ơn bạn đã trải nghiệm mô phỏng mua sắm búp bê Neo-Folklore trong dự án học thuật VNU1001.
          </p>

          {/* Current Session Delivery Info Recap (not saved to localStorage) */}
          {confirmedCustomer && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs sm:text-sm text-stone-700 space-y-1.5 max-w-md mx-auto mt-4">
              <div className="font-semibold text-stone-900 pb-1 border-b border-stone-200">
                Thông tin người nhận (Phiên hiện tại):
              </div>
              <div><strong>Họ tên:</strong> {confirmedCustomer.fullName}</div>
              <div><strong>Số điện thoại:</strong> {confirmedCustomer.phone}</div>
              <div><strong>Địa chỉ:</strong> {confirmedCustomer.address}, {confirmedCustomer.ward}, {confirmedCustomer.city}</div>
              {confirmedCustomer.note && <div><strong>Ghi chú:</strong> {confirmedCustomer.note}</div>}
              <div><strong>Phương thức:</strong> Thanh toán khi nhận hàng – COD (Mô phỏng)</div>
            </div>
          )}

          {/* Educational Disclaimer */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-left max-w-lg mx-auto flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Lưu ý học thuật quan trọng:</strong> Đây là đơn hàng mô phỏng phục vụ mục đích học tập và nghiên cứu trải nghiệm. Không có bất kỳ giao dịch thanh toán hoặc vận chuyển hàng thật nào diễn ra.
            </span>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('orders')}
              className="px-6 py-2.5 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] font-semibold text-xs shadow-md transition-colors"
            >
              Xem Đơn Hàng Của Tôi
            </button>
            <button
              onClick={() => navigateTo('collection')}
              className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
            >
              Tiếp tục khám phá 7 nhân vật
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Không có sản phẩm nào để đặt hàng</h2>
        <button
          onClick={() => navigateTo('collection')}
          className="px-5 py-2.5 rounded-xl bg-[#88131B] text-[#FEF3C7] text-xs font-semibold"
        >
          Đến bộ sưu tập
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Progress Stepper */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-stone-500">
        <span
          onClick={() => navigateTo('cart')}
          className="text-stone-500 hover:text-[#88131B] cursor-pointer flex items-center gap-1.5"
        >
          <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-xs">
            1
          </span>
          <span>Giỏ hàng</span>
        </span>
        <span className="text-stone-300">→</span>
        <span className="text-[#88131B] flex items-center gap-1.5 font-bold">
          <span className="w-6 h-6 rounded-full bg-[#88131B] text-white flex items-center justify-center text-xs">
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
        {/* Left Column: Delivery Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Thông Tin Nhận Hàng Mô Phỏng
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Vui lòng nhập thông tin để hệ thống tạo đơn giao hàng mô phỏng.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>Họ và tên người nhận <span className="text-rose-600">*</span></span>
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={form.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-colors ${
                  errors.fullName
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-stone-300 focus:border-[#88131B]'
                } focus:outline-none focus:ring-1 focus:ring-[#88131B]`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                <span>Số điện thoại Việt Nam <span className="text-rose-600">*</span></span>
              </label>
              <input
                type="tel"
                placeholder="Ví dụ: 0912345678"
                value={form.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-colors ${
                  errors.phone
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-stone-300 focus:border-[#88131B]'
                } focus:outline-none focus:ring-1 focus:ring-[#88131B]`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* City / Province */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-stone-500" />
                  <span>Tỉnh / Thành phố <span className="text-rose-600">*</span></span>
                </label>
                <select
                  value={form.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-[#88131B] focus:outline-none bg-white"
                >
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Quảng Ninh">Quảng Ninh</option>
                  <option value="Khác">Tỉnh thành khác</option>
                </select>
                {errors.city && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>
                )}
              </div>

              {/* Ward */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>Phường / Xã <span className="text-rose-600">*</span></span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Phường Dịch Vọng Hậu"
                  value={form.ward}
                  onChange={(e) => handleInputChange('ward', e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-colors ${
                    errors.ward
                      ? 'border-rose-500 bg-rose-50/30'
                      : 'border-stone-300 focus:border-[#88131B]'
                  } focus:outline-none focus:ring-1 focus:ring-[#88131B]`}
                />
                {errors.ward && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.ward}</p>
                )}
              </div>
            </div>

            {/* Detailed Address */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Địa chỉ chi tiết (số nhà, đường, thôn...) <span className="text-rose-600">*</span></span>
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Số 144 Xuân Thủy, Cầu Giấy"
                value={form.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-colors ${
                  errors.address
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-stone-300 focus:border-[#88131B]'
                } focus:outline-none focus:ring-1 focus:ring-[#88131B]`}
              />
              {errors.address && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
              )}
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>Ghi chú giao hàng (Tùy chọn)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                value={form.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="w-full px-4 py-2 text-sm rounded-xl border border-stone-300 focus:border-[#88131B] focus:outline-none focus:ring-1 focus:ring-[#88131B]"
              />
            </div>

            {/* Payment Method Section (Only COD simulated) */}
            <div className="pt-4 border-t border-stone-200">
              <label className="block text-xs font-bold text-stone-800 mb-2">
                Phương Thức Thanh Toán
              </label>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-4 border-[#88131B] bg-white shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-xs sm:text-sm text-stone-900">
                    Thanh toán khi nhận hàng – COD (Mô phỏng)
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Trải nghiệm nhận hàng và kiểm tra trước khi xác nhận. Không yêu cầu thẻ hay thanh toán trực tuyến.
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Xác Nhận Đặt Hàng Mô Phỏng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Recap */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-stone-900 pb-2 border-b border-stone-100">
            Tóm Tắt Đơn Hàng ({cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
          </h3>

          {/* Items list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.character.id} className="flex items-center gap-3">
                <CharacterArt id={item.character.id} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-stone-900 truncate">
                    {item.character.name}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    SL: {item.quantity} × {formatCurrency(item.character.price)}
                  </div>
                </div>
                <div className="text-xs font-semibold text-stone-900 tabular-nums">
                  {formatCurrency(item.character.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span className="font-semibold text-stone-900">{formatCurrency(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển mô phỏng</span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-semibold">Miễn phí</span>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </span>
            </div>
            {activeDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Voucher đã áp dụng ({selectedVoucherCode})</span>
                <span>-{formatCurrency(activeDiscount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm font-bold text-stone-900">
              <span>Tổng cộng thanh toán</span>
              <span className="text-lg font-extrabold text-[#88131B]">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500 leading-relaxed">
            Dữ liệu cá nhân (họ tên, số điện thoại, địa chỉ) không được lưu trữ vào bộ nhớ cục bộ (localStorage) hay gửi ra ngoài máy chủ để đảm bảo tính riêng tư trong học tập.
          </div>
        </div>
      </div>
    </div>
  );
};
