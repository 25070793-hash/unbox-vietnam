import { CharacterId, CustomerOrderForm, TriviaQuestion } from '../types';

export const VOUCHER_RULES: Record<string, { percent: number; maxDiscount: number; cost: number }> = {
  UNBOX5: { percent: 0.05, maxDiscount: 30000, cost: 100 },
  UNBOX10: { percent: 0.10, maxDiscount: 60000, cost: 250 },
  UNBOX15: { percent: 0.15, maxDiscount: 100000, cost: 450 },
  UNBOX20: { percent: 0.20, maxDiscount: 150000, cost: 700 },
};

/**
 * Calculates discount amount based on voucher code and subtotal
 */
export function calculateDiscount(subtotal: number, voucherCode?: string | null): number {
  if (!voucherCode || subtotal <= 0) return 0;
  const rule = VOUCHER_RULES[voucherCode.toUpperCase()];
  if (!rule) return 0;

  const calculated = Math.round(subtotal * rule.percent);
  return Math.min(calculated, rule.maxDiscount);
}

/**
 * Calculates simulated shipping fee
 * 25,000 VND standard, Free shipping for orders >= 500,000 VND
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= 500000) return 0;
  return 25000;
}

/**
 * Calculates final order total
 */
export function calculateOrderTotal(subtotal: number, discount: number, shippingFee: number): number {
  if (subtotal <= 0) return 0;
  const total = subtotal - discount + shippingFee;
  return Math.max(0, total);
}

/**
 * Validates Vietnamese mobile phone numbers
 * Must be 10 digits and start with valid telecommunication prefixes (03, 05, 07, 08, 09)
 */
export function validateVietnamesePhone(phone: string): { isValid: boolean; error?: string } {
  const cleaned = phone.replace(/[\s.-]/g, '');
  if (!cleaned) {
    return { isValid: false, error: 'Vui lòng nhập số điện thoại.' };
  }
  const vnPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (!vnPhoneRegex.test(cleaned)) {
    return {
      isValid: false,
      error: 'Số điện thoại không hợp lệ (cần 10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).',
    };
  }
  return { isValid: true };
}

/**
 * Validates customer shipping form
 */
export function validateOrderForm(form: Partial<CustomerOrderForm>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!form.fullName || form.fullName.trim().length < 2) {
    errors.fullName = 'Vui lòng nhập họ và tên người nhận (tối thiểu 2 ký tự).';
  }

  const phoneValidation = validateVietnamesePhone(form.phone || '');
  if (!phoneValidation.isValid && phoneValidation.error) {
    errors.phone = phoneValidation.error;
  }

  if (!form.city || form.city.trim().length === 0) {
    errors.city = 'Vui lòng chọn hoặc nhập Tỉnh / Thành phố.';
  }

  if (!form.ward || form.ward.trim().length === 0) {
    errors.ward = 'Vui lòng nhập Phường / Xã.';
  }

  if (!form.address || form.address.trim().length < 5) {
    errors.address = 'Vui lòng nhập địa chỉ chi tiết cụ thể (số nhà, tên đường, thôn, xóm).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats Vietnamese Dong currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Evaluates Cultural Trivia answers
 * Returns correct count and whether user passed (>= 4 of 5)
 */
export function calculateTriviaScore(
  answers: Record<number, number>,
  questions: TriviaQuestion[]
): { correct: number; total: number; isPassed: boolean } {
  let correct = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) {
      correct++;
    }
  });
  return {
    correct,
    total: questions.length,
    isPassed: correct >= 4 && questions.length === 5,
  };
}

/**
 * Calculates most frequent character archetype in quiz answers
 */
export function determineQuizMatch(answers: Record<number, CharacterId>): CharacterId {
  const counts: Record<CharacterId, number> = {
    'crybaby-co-tam': 0,
    'hirono-tra-da': 0,
    'labubu-chu-teu': 0,
    'sweetbean-to-he': 0,
    'hacipupu-si-tu': 0,
    'skullpanda-nhat-binh': 0,
    'pucky-ca-chep': 0,
  };

  Object.values(answers).forEach((charId) => {
    if (counts[charId] !== undefined) {
      counts[charId]++;
    }
  });

  let topChar: CharacterId = 'crybaby-co-tam';
  let maxCount = -1;

  (Object.keys(counts) as CharacterId[]).forEach((charId) => {
    if (counts[charId] > maxCount) {
      maxCount = counts[charId];
      topChar = charId;
    }
  });

  return topChar;
}

/**
 * Gets today's date in local ISO date format (YYYY-MM-DD)
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
