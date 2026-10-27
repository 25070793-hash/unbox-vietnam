import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CULTURAL_TRIVIA_BANK } from '../../data/culturalTrivia';
import { TriviaQuestion } from '../../types';
import { calculateTriviaScore } from '../../utils/shopLogic';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { audioSynth } from '../../services/audioSynth';

export const TriviaGame: React.FC = () => {
  const { recordTriviaSuccess, navigateTo } = useApp();

  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize random 5 questions
  const startNewGame = () => {
    const shuffled = [...CULTURAL_TRIVIA_BANK].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const currentSelection = selectedAnswers[currentQ.id];
  const isAnswered = currentSelection !== undefined;

  const handleSelectAnswer = (optionIdx: number) => {
    if (isAnswered) return;

    const newAnswers = {
      ...selectedAnswers,
      [currentQ.id]: optionIdx,
    };
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);

    if (optionIdx === currentQ.correctAnswer) {
      audioSynth.playUiSound('coin');
    } else {
      audioSynth.playUiSound('click');
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished
      const result = calculateTriviaScore(selectedAnswers, questions);
      if (result.isPassed) {
        recordTriviaSuccess();
        audioSynth.playUiSound('victory');
      }
      setIsFinished(true);
    }
  };

  const scoreResult = calculateTriviaScore(selectedAnswers, questions);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
          <span>Mini Game 4 · Đấu Trí Văn Hóa</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Đố Vui Văn Hóa Việt Nam
        </h1>
        <p className="text-sm text-stone-600">
          Mỗi lượt gồm 5 câu hỏi ngẫu nhiên từ kho dữ liệu di sản. Đạt ít nhất <strong>4/5 câu đúng</strong> để hoàn thành nhiệm vụ và nhận ngay <strong>+100 Xu Văn Hóa</strong>!
        </p>
      </div>

      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#B45309]/30 shadow-xl relative overflow-hidden">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold border-b border-stone-100 pb-3">
              <span className="text-[#88131B] uppercase tracking-wider">
                Chủ đề: {currentQ.culturalTheme}
              </span>
              <span>
                Câu {currentIndex + 1} / {questions.length}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => {
                let btnStyle =
                  'border-stone-200 hover:border-purple-600 hover:bg-purple-50/50 text-stone-800';

                if (isAnswered) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                  } else if (idx === currentSelection) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                  } else {
                    btnStyle = 'border-stone-200 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm">{option}</span>
                    </div>

                    {isAnswered && idx === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered &&
                      idx === currentSelection &&
                      idx !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                  </button>
                );
              })}
            </div>

            {/* Explanation reveal */}
            {showExplanation && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-2 animate-in fade-in duration-200">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>Giải nghĩa văn hóa:</span>
                </div>
                <p className="leading-relaxed">{currentQ.explanation}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="py-2 px-5 rounded-xl bg-[#6B21A8] text-white hover:bg-[#581C87] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished summary */
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                Kết Quả: {scoreResult.correct} / {scoreResult.total} Câu Đúng
              </h2>
              <p className="text-sm text-stone-600 mt-2">
                {scoreResult.isPassed
                  ? 'Tuyệt vời! Bạn đã đạt yêu cầu (từ 4/5 câu đúng trở lên) và hoàn thành nhiệm vụ đố vui (+100 xu)!'
                  : 'Rất tiếc! Bạn cần trả lời đúng ít nhất 4/5 câu để hoàn thành nhiệm vụ. Hãy thử sức lại nhé!'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={startNewGame}
                className="py-2.5 px-5 rounded-xl bg-[#6B21A8] text-white hover:bg-[#581C87] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi lại lượt mới (Ngẫu nhiên 5 câu khác)</span>
              </button>

              <button
                onClick={() => navigateTo('missions')}
                className="py-2.5 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Đến nhận thưởng nhiệm vụ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
