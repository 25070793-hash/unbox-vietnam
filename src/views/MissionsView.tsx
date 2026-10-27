import React from 'react';
import { useApp } from '../context/AppContext';
import { Mission } from '../types';
import {
  Coins,
  CheckCircle2,
  Gift,
  ArrowRight,
  Sparkles,
  Award,
  Calendar,
  Lock,
} from 'lucide-react';
import { getTodayDateString } from '../utils/shopLogic';

export const MISSIONS_LIST: Mission[] = [
  {
    id: 'view-7-characters',
    title: 'Hành trình di sản: Chiêm ngưỡng 7 tác phẩm',
    description: 'Khám phá đầy đủ trang chi tiết của cả 7 nhân vật Art Toy trong bộ sưu tập.',
    rewardCoins: 100,
    type: 'one_time',
    targetCount: 7,
    actionRoute: 'collection',
    actionLabel: 'Đến bộ sưu tập',
  },
  {
    id: 'mystery-box-daily',
    title: 'Khai mở vận may: Hoàn thành Mystery Box',
    description: 'Chạm mở chiếc hộp bí ẩn mạ vàng để rước búp bê may mắn (Một lần mỗi ngày).',
    rewardCoins: 50,
    type: 'daily',
    targetCount: 1,
    actionRoute: 'mystery-box',
    actionLabel: 'Mở Mystery Box',
  },
  {
    id: 'lucky-wheel-daily',
    title: 'Xoay la bàn văn hóa: Vòng quay may mắn',
    description: 'Thực hiện ít nhất 1 lượt quay vòng tròn 7 nhân vật biểu tượng (Một lần mỗi ngày).',
    rewardCoins: 40,
    type: 'daily',
    targetCount: 1,
    actionRoute: 'lucky-wheel',
    actionLabel: 'Quay vòng may mắn',
  },
  {
    id: 'personality-quiz-once',
    title: 'Khám phá tri kỷ: Trắc nghiệm tính cách',
    description: 'Hoàn thành 5 câu hỏi thẩm mỹ để tìm ra tần số Art Toy đồng điệu với tâm hồn bạn.',
    rewardCoins: 80,
    type: 'one_time',
    targetCount: 1,
    actionRoute: 'quiz',
    actionLabel: 'Làm trắc nghiệm',
  },
  {
    id: 'trivia-daily',
    title: 'Trạng nguyên di sản: Đạt 4/5 câu đố vui',
    description: 'Trả lời đúng từ 4 trên 5 câu hỏi văn hóa Việt Nam trong một lượt thi (Một lần mỗi ngày).',
    rewardCoins: 100,
    type: 'daily',
    targetCount: 1,
    actionRoute: 'trivia',
    actionLabel: 'Thử tài đố vui',
  },
  {
    id: 'unlock-3-characters',
    title: 'Nhà sưu tầm tiềm năng: Mở khóa 3 nhân vật',
    description: 'Sở hữu ít nhất 3 nhân vật khác nhau trong Bộ sưu tập của tôi (qua mini game hoặc nhiệm vụ).',
    rewardCoins: 150,
    type: 'one_time',
    targetCount: 3,
    actionRoute: 'my-collection',
    actionLabel: 'Xem bộ sưu tập',
  },
  {
    id: 'favorite-5-characters',
    title: 'Trái tim yêu văn hóa: Yêu thích 5 nhân vật',
    description: 'Nhấn biểu tượng trái tim để lưu lại ít nhất 5 nhân vật bạn ấn tượng nhất.',
    rewardCoins: 70,
    type: 'one_time',
    targetCount: 5,
    actionRoute: 'collection',
    actionLabel: 'Khám phá & yêu thích',
  },
];

export const MissionsView: React.FC = () => {
  const {
    coins,
    missionsProgress,
    claimMissionReward,
    navigateTo,
  } = useApp();

  const today = getTodayDateString();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#781017] via-[#88131B] to-[#5B0D12] text-[#FFFBEB] border border-[#F59E0B]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B0D12] border border-[#F59E0B]/50 text-[#FDE68A] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Nhiệm Vụ & Thưởng Xu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#FEF3C7] tracking-tight">
            Nhiệm Vụ Nhận Xu Văn Hóa
          </h1>
          <p className="text-xs sm:text-sm text-[#FDE8E8]/85 max-w-lg">
            Khám phá trọn vẹn website, tham gia các mini game tương tác để tích lũy Xu Văn Hóa dùng đổi mã giảm giá mua sắm mô phỏng.
          </p>
        </div>

        {/* Current Coins display */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#5B0D12]/90 border border-[#F59E0B]/60 text-center min-w-[160px] shadow-inner">
          <span className="text-xs text-[#FDE68A] font-semibold uppercase tracking-wider">
            Xu Hiện Có
          </span>
          <div className="flex items-center gap-2 my-1">
            <Coins className="w-7 h-7 text-[#F59E0B]" />
            <span className="text-3xl font-extrabold text-[#FEF3C7] tabular-nums">
              {coins}
            </span>
          </div>
          <button
            onClick={() => navigateTo('vouchers')}
            className="mt-2 text-xs text-[#FCD34D] hover:underline flex items-center gap-1"
          >
            <span>Đổi Voucher ngay</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Missions List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#88131B]" />
          <span>Danh Sách 7 Nhiệm Vụ Văn Hóa</span>
        </h2>

        <div className="space-y-3">
          {MISSIONS_LIST.map((mission) => {
            const progress = missionsProgress[mission.id] || {
              currentCount: 0,
              isClaimed: false,
            };

            // Daily reset check
            const isDaily = mission.type === 'daily';
            const isClaimedToday =
              isDaily && progress.isClaimed && progress.lastClaimedDate === today;
            const isClaimedOnce = !isDaily && progress.isClaimed;
            const isClaimed = isDaily ? isClaimedToday : isClaimedOnce;

            const current = Math.min(progress.currentCount, mission.targetCount);
            const isCompleted = current >= mission.targetCount;
            const percent = Math.round((current / mission.targetCount) * 100);

            return (
              <div
                key={mission.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isClaimed
                    ? 'bg-stone-50 border-stone-200 opacity-80'
                    : isCompleted
                    ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                {/* Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isDaily
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {isDaily ? 'Hằng Ngày' : 'Một Lần'}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-stone-900">
                      {mission.title}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {mission.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1 max-w-md">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                      <span>Tiến độ: {current} / {mission.targetCount}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isClaimed
                            ? 'bg-stone-400'
                            : isCompleted
                            ? 'bg-emerald-500'
                            : 'bg-[#B45309]'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Action & Reward Button */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                  {/* Reward Coin Badge */}
                  <div className="flex items-center gap-1 text-xs font-bold text-[#B45309]">
                    <Coins className="w-4 h-4 text-[#F59E0B]" />
                    <span>+{mission.rewardCoins} Xu</span>
                  </div>

                  {/* Button state */}
                  {isClaimed ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200 text-stone-600 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-500" />
                      <span>Đã nhận thưởng</span>
                    </div>
                  ) : isCompleted ? (
                    <button
                      onClick={() => claimMissionReward(mission.id)}
                      className="px-4 py-2 rounded-xl bg-[#F59E0B] text-[#781017] hover:bg-[#D97706] font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Nhận Thưởng</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigateTo(mission.actionRoute)}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>{mission.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
