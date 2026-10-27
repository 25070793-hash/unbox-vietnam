import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CharacterId, Character } from '../../types';
import { PERSONALITY_QUESTIONS } from '../../data/personalityQuestions';
import { determineQuizMatch } from '../../utils/shopLogic';
import { CharacterArt } from '../../components/illustrations/CharacterIllustrations';
import {
  Compass,
  CheckCircle2,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { audioSynth } from '../../services/audioSynth';

export const PersonalityQuizGame: React.FC = () => {
  const {
    characters,
    recordQuizCompleted,
    unlockCharacter,
    playCharacterMelody,
    playingCharacterId,
    navigateTo,
  } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, CharacterId>>({});
  const [matchedCharacter, setMatchedCharacter] = useState<Character | null>(null);

  const currentQ = PERSONALITY_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / PERSONALITY_QUESTIONS.length) * 100
  );

  const handleSelectOption = (characterId: CharacterId) => {
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: characterId,
    };
    setAnswers(updatedAnswers);
    audioSynth.playUiSound('click');

    if (currentQuestionIndex + 1 < PERSONALITY_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate quiz result
      const topMatchId = determineQuizMatch(updatedAnswers);
      const chosen = characters.find((c) => c.id === topMatchId) || characters[0];
      setMatchedCharacter(chosen);
      unlockCharacter(chosen.id);
      recordQuizCompleted();
      audioSynth.playUiSound('victory');
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMatchedCharacter(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          <span>Mini Game 3 · Khám Phá Bản Ngã</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Trắc Nghiệm Tính Cách Art Toy
        </h1>
        <p className="text-sm text-stone-600">
          5 câu hỏi thẩm mỹ và lối sống sẽ chỉ dẫn bạn đến nhân vật Art Toy mang tần số tâm hồn đồng điệu nhất (+80 xu nhiệm vụ)!
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#B45309]/30 shadow-xl relative overflow-hidden">
        {!matchedCharacter ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                <span>Câu hỏi {currentQuestionIndex + 1} / {PERSONALITY_QUESTIONS.length}</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-1 pt-2">
              <p className="text-xs text-teal-700 font-semibold italic">
                {currentQ.context}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.characterId)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl border border-stone-200 hover:border-[#0F766E] hover:bg-teal-50/50 transition-all group flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-[#0F766E] group-hover:text-white text-stone-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
                      {option.text}
                    </p>
                    <span className="text-[11px] text-stone-400 group-hover:text-teal-700 transition-colors mt-0.5 block">
                      Cảm thức: {option.vibe}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Reveal */
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tìm Thấy Tần Số Đồng Điệu!</span>
            </div>

            <div className="flex flex-col items-center">
              <CharacterArt id={matchedCharacter.id} size="lg" className="shadow-lg" />
              <div className="mt-4">
                <span className="text-xs uppercase font-bold text-teal-700 tracking-wider">
                  Nhân Vật Tương Thích Với Bạn
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  {matchedCharacter.name}
                </h2>
                <p className="text-xs text-stone-500 italic mt-0.5">
                  {matchedCharacter.vietnameseTitle}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs sm:text-sm text-stone-700 max-w-xl mt-4 leading-relaxed text-justify">
                <strong>Vì sao hai bạn thuộc về nhau:</strong> {matchedCharacter.shortDesc} Phong thái của bạn mang trọn vẹn tinh thần của tác phẩm này—vừa giữ vững bản sắc cội nguồn, vừa tỏa sáng tự do và kiên định giữa nhịp sống hiện đại.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => playCharacterMelody(matchedCharacter.id)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors ${
                  playingCharacterId === matchedCharacter.id
                    ? 'bg-[#88131B] text-[#FEF3C7] border-[#88131B]'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border-stone-200'
                }`}
              >
                {playingCharacterId === matchedCharacter.id ? (
                  <>
                    <VolumeX className="w-4 h-4 text-[#F59E0B]" />
                    <span>Dừng</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#0F766E]" />
                    <span>Nghe giai điệu tri kỷ</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTo('my-collection')}
                className="py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Xem trong bộ sưu tập</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleReset}
                className="py-2 px-4 rounded-xl bg-[#0F766E] text-white hover:bg-[#115E59] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại trắc nghiệm</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
