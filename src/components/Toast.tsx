import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle, Coins, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-600 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />,
          coin: <Coins className="w-5 h-5 text-amber-500 shrink-0 animate-bounce" />,
        };

        const bgColors = {
          success: 'bg-[#FDFBF7] border-emerald-500/40 text-stone-800 shadow-lg',
          info: 'bg-[#FDFBF7] border-sky-500/40 text-stone-800 shadow-lg',
          warning: 'bg-[#FDFBF7] border-amber-500/40 text-stone-800 shadow-lg',
          coin: 'bg-[#5B0D12] border-[#F59E0B] text-[#FEF08A] shadow-xl',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border ${bgColors[toast.type]} transition-all animate-in fade-in slide-in-from-bottom-2 duration-300`}
            role="alert"
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type]}
              <span className="text-sm font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-600 p-1"
              aria-label="Đóng thông báo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
