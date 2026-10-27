import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Character } from '../../types';
import { CharacterArt } from '../../components/illustrations/CharacterIllustrations';
import {
  Disc,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { audioSynth } from '../../services/audioSynth';

export const LuckyWheelGame: React.FC = () => {
  const {
    characters,
    unlockCharacter,
    recordWheelPlay,
    playCharacterMelody,
    playingCharacterId,
    navigateTo,
  } = useApp();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [wonCharacter, setWonCharacter] = useState<Character | null>(null);

  const numSectors = characters.length; // 7 sectors
  const sectorAngle = 360 / numSectors; // ~51.428 degrees

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonCharacter(null);

    // Play initial tick sound
    audioSynth.playUiSound('wheel_tick');

    // Pick random target character index (0 to 6)
    const winningIndex = Math.floor(Math.random() * numSectors);

    // Calculate rotation: multiple full rounds (e.g. 5 to 7 rounds) plus target offset
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const targetSectorCenter = winningIndex * sectorAngle + sectorAngle / 2;
    // Arrow points at top (270 deg or 90 deg offset)
    const targetAngle = extraRounds * 360 + (360 - targetSectorCenter);

    const finalAngle = rotationAngle + targetAngle;
    setRotationAngle(finalAngle);

    // Play periodic tick sounds
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      audioSynth.playUiSound('wheel_tick');
      tickCount++;
      if (tickCount > 15) {
        clearInterval(tickInterval);
      }
    }, 180);

    setTimeout(() => {
      clearInterval(tickInterval);
      const chosen = characters[winningIndex];
      setWonCharacter(chosen);
      unlockCharacter(chosen.id);
      recordWheelPlay();
      audioSynth.playUiSound('victory');
      setIsSpinning(false);
    }, 4200);
  };

  const sectorColors = [
    '#991B1B', // Red
    '#0D9488', // Teal
    '#B45309', // Amber
    '#7E22CE', // Purple
    '#C2410C', // Orange
    '#0369A1', // Sky
    '#BE123C', // Rose
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Disc className="w-3.5 h-3.5 text-amber-600" />
          <span>Mini Game 2 · Vòng Xoay Duyên Khởi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Vòng Quay May Mắn 7 Nhân Vật
        </h1>
        <p className="text-sm text-stone-600">
          Nhấn nút QUAY để thử vận may đón nhận búp bê truyền thống vào bộ sưu tập và hoàn thành nhiệm vụ hằng ngày (+40 xu)!
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#B45309]/30 shadow-xl text-center relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Wheel Graphic Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
              {/* Pointer indicator on top */}
              <div className="absolute -top-3 z-20 flex flex-col items-center">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[22px] border-t-[#F59E0B] drop-shadow-md" />
              </div>

              {/* The Spinning Wheel */}
              <div
                className="w-full h-full rounded-full border-4 border-[#F59E0B] shadow-2xl overflow-hidden transition-transform ease-out"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transitionDuration: isSpinning ? '4000ms' : '0ms',
                }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {characters.map((char, i) => {
                    const startAngle = (i * 360) / numSectors;
                    const endAngle = ((i + 1) * 360) / numSectors;

                    const x1 = 150 + 150 * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = 150 + 150 * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = 150 + 150 * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = 150 + 150 * Math.sin((Math.PI * endAngle) / 180);

                    const midAngle = (startAngle + endAngle) / 2;
                    const tx = 150 + 95 * Math.cos((Math.PI * midAngle) / 180);
                    const ty = 150 + 95 * Math.sin((Math.PI * midAngle) / 180);

                    return (
                      <g key={char.id}>
                        <path
                          d={`M150,150 L${x1},${y1} A150,150 0 0,1 ${x2},${y2} Z`}
                          fill={sectorColors[i % sectorColors.length]}
                          stroke="#FFFBEB"
                          strokeWidth="1.5"
                        />
                        <text
                          x={tx}
                          y={ty}
                          fill="#FFFBEB"
                          fontSize="9.5"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${midAngle + 90}, ${tx}, ${ty})`}
                        >
                          {char.originalFigure}
                        </text>
                      </g>
                    );
                  })}

                  {/* Golden Center Hub */}
                  <circle cx="150" cy="150" r="32" fill="#5B0D12" stroke="#F59E0B" strokeWidth="4" />
                  <circle cx="150" cy="150" r="14" fill="#F59E0B" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="mt-6 px-8 py-3 rounded-xl bg-[#88131B] text-[#FEF3C7] hover:bg-[#6F0D14] disabled:opacity-50 font-bold text-sm shadow-lg transition-all flex items-center gap-2"
            >
              <Disc className={`w-4 h-4 text-[#F59E0B] ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Đang quay...' : 'Quay Vòng May Mắn'}</span>
            </button>
          </div>

          {/* Result / Instruction Column */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {!wonCharacter ? (
              <div className="space-y-4 p-6 rounded-2xl bg-stone-50 border border-stone-200">
                <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  <span>Quy Tắc Vòng Quay</span>
                </h3>
                <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
                  <li>• Vòng quay bao gồm 7 ô đại diện cho 7 nhân vật văn hóa.</li>
                  <li>• Mỗi ngày bạn có thể quay không giới hạn, hoàn thành nhiệm vụ quay lần đầu trong ngày nhận ngay +40 Xu.</li>
                  <li>• Nhân vật trúng thưởng sẽ tự động mở khóa trong mục <strong>Bộ sưu tập của tôi</strong>.</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4 p-6 rounded-2xl bg-amber-50 border border-amber-300 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chúc mừng bạn đã quay trúng:</span>
                </div>

                <div className="flex items-center gap-4">
                  <CharacterArt id={wonCharacter.id} size="sm" />
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">
                      {wonCharacter.name}
                    </h3>
                    <p className="text-xs text-stone-500 italic">
                      {wonCharacter.vietnameseTitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {wonCharacter.shortDesc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => playCharacterMelody(wonCharacter.id)}
                    className="py-1.5 px-3 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-medium flex items-center gap-1.5"
                  >
                    {playingCharacterId === wonCharacter.id ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Dừng</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#88131B]" />
                        <span>Nghe nhạc</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => navigateTo('my-collection')}
                    className="py-1.5 px-3 rounded-lg bg-[#88131B] text-[#FEF3C7] text-xs font-medium flex items-center gap-1"
                  >
                    <span>Xem kho đồ</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
