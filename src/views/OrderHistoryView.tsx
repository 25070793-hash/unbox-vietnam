import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/shopLogic';
import { Package, ShieldAlert, Calendar, ArrowRight, ShoppingBag } from 'lucide-react';

export const OrderHistoryView: React.FC = () => {
  const { orders, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
          <Package className="w-3.5 h-3.5 text-[#88131B]" />
          <span>Lịch Sử Đơn Hàng</span>
        </div>
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
          Đơn Hàng Mô Phỏng Của Tôi
        </h1>
        <p className="text-sm text-stone-600">
          Danh sách các đơn hàng mô phỏng bạn đã khởi tạo trong quá trình trải nghiệm website dự án VNU1001.
        </p>
      </div>

      {/* Academic Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-800 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Thông báo quan trọng về tính học thuật:</strong> Đây là các đơn hàng mô phỏng được lưu trữ cục bộ phục vụ mục đích kiểm thử và nghiên cứu học tập. Không có hoạt động giao hàng, thu tiền hoặc thanh toán thực tế nào diễn ra. Để bảo mật quyền riêng tư cá nhân, thông tin họ tên, số điện thoại và địa chỉ nhận hàng của bạn không được lưu trong lịch sử vĩnh viễn.
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-stone-800">
            Bạn Chưa Có Đơn Hàng Nào
          </h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Hãy thêm các nhân vật yêu thích vào giỏ hàng và thử nghiệm tính năng đặt hàng COD mô phỏng!
          </p>
          <button
            onClick={() => navigateTo('collection')}
            className="px-5 py-2.5 rounded-xl bg-[#88131B] text-[#FEF3C7] text-xs font-semibold hover:bg-[#6F0D14] transition-colors"
          >
            Đến Bộ Sưu Tập Ngay
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4"
            >
              {/* Order Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">Mã đơn:</span>
                    <span className="font-mono font-bold text-sm text-[#88131B]">
                      {order.id}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{order.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs sm:text-sm text-stone-700"
                  >
                    <div>
                      <span className="font-medium text-stone-900">{item.name}</span>
                      <span className="text-stone-400 text-xs ml-2">
                        × {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold tabular-nums text-stone-800">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                <div className="space-y-0.5">
                  <div>
                    Tạm tính: {formatCurrency(order.subtotal)} · Phí ship: {formatCurrency(order.shippingFee)}
                  </div>
                  {order.discount > 0 && (
                    <div className="text-emerald-700 font-medium">
                      Đã giảm ({order.voucherCode}): -{formatCurrency(order.discount)}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-400 mr-2">Tổng thanh toán:</span>
                  <span className="text-base font-extrabold text-[#88131B] tabular-nums">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
