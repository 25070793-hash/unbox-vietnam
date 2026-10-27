import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDiscount,
  calculateShipping,
  calculateOrderTotal,
  validateVietnamesePhone,
  validateOrderForm,
  calculateTriviaScore,
  determineQuizMatch,
  formatCurrency,
  getTodayDateString,
} from './shopLogic.ts';
import { TriviaQuestion } from '../types/index.ts';

test('calculateDiscount caps correctly according to voucher rules', () => {
  // UNBOX5: 5% max 30.000đ
  assert.equal(calculateDiscount(200000, 'UNBOX5'), 10000); // 5% of 200k = 10k
  assert.equal(calculateDiscount(1000000, 'UNBOX5'), 30000); // 5% of 1M = 50k, capped at 30k

  // UNBOX10: 10% max 60.000đ
  assert.equal(calculateDiscount(500000, 'UNBOX10'), 50000);
  assert.equal(calculateDiscount(1000000, 'UNBOX10'), 60000);

  // UNBOX15: 15% max 100.000đ
  assert.equal(calculateDiscount(500000, 'UNBOX15'), 75000);
  assert.equal(calculateDiscount(1000000, 'UNBOX15'), 100000);

  // UNBOX20: 20% max 150.000đ
  assert.equal(calculateDiscount(500000, 'UNBOX20'), 100000);
  assert.equal(calculateDiscount(1000000, 'UNBOX20'), 150000);

  // Invalid or null voucher
  assert.equal(calculateDiscount(500000, null), 0);
  assert.equal(calculateDiscount(500000, 'INVALID'), 0);
  assert.equal(calculateDiscount(0, 'UNBOX10'), 0);
});

test('calculateShipping applies standard and free thresholds', () => {
  assert.equal(calculateShipping(0), 0);
  assert.equal(calculateShipping(290000), 25000);
  assert.equal(calculateShipping(499999), 25000);
  assert.equal(calculateShipping(500000), 0);
  assert.equal(calculateShipping(1000000), 0);
});

test('calculateOrderTotal computes net amount and prevents negative totals', () => {
  assert.equal(calculateOrderTotal(300000, 30000, 25000), 295000);
  assert.equal(calculateOrderTotal(100000, 150000, 0), 0);
  assert.equal(calculateOrderTotal(0, 0, 0), 0);
});

test('validateVietnamesePhone validates 10 digits and legitimate carrier prefixes', () => {
  assert.equal(validateVietnamesePhone('0912345678').isValid, true);
  assert.equal(validateVietnamesePhone('0389998888').isValid, true);
  assert.equal(validateVietnamesePhone('0771234567').isValid, true);
  assert.equal(validateVietnamesePhone('0567890123').isValid, true);
  assert.equal(validateVietnamesePhone('0866554433').isValid, true);

  // Invalid cases
  assert.equal(validateVietnamesePhone('').isValid, false);
  assert.equal(validateVietnamesePhone('0123456789').isValid, false); // invalid prefix 01
  assert.equal(validateVietnamesePhone('091234567').isValid, false); // only 9 digits
  assert.equal(validateVietnamesePhone('09123456789').isValid, false); // 11 digits
  assert.equal(validateVietnamesePhone('abcd123456').isValid, false);
});

test('validateOrderForm enforces required fields for customer delivery', () => {
  const validForm = {
    fullName: 'Nguyễn Văn An',
    phone: '0987654321',
    city: 'Hà Nội',
    ward: 'Phường Dịch Vọng Hậu',
    address: 'Số 144 Xuân Thủy, Cầu Giấy',
    note: 'Giao giờ hành chính',
  };
  const result = validateOrderForm(validForm);
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);

  const invalidForm = {
    fullName: '',
    phone: '123',
    city: '',
    ward: '',
    address: '1',
  };
  const failResult = validateOrderForm(invalidForm);
  assert.equal(failResult.isValid, false);
  assert.ok(failResult.errors.fullName);
  assert.ok(failResult.errors.phone);
  assert.ok(failResult.errors.city);
  assert.ok(failResult.errors.ward);
  assert.ok(failResult.errors.address);
});

test('calculateTriviaScore requires at least 4 out of 5 for quest pass', () => {
  const dummyQuestions: TriviaQuestion[] = [
    { id: 1, question: 'Q1', options: ['A', 'B'], correctAnswer: 0, explanation: '', culturalTheme: '' },
    { id: 2, question: 'Q2', options: ['A', 'B'], correctAnswer: 1, explanation: '', culturalTheme: '' },
    { id: 3, question: 'Q3', options: ['A', 'B'], correctAnswer: 0, explanation: '', culturalTheme: '' },
    { id: 4, question: 'Q4', options: ['A', 'B'], correctAnswer: 1, explanation: '', culturalTheme: '' },
    { id: 5, question: 'Q5', options: ['A', 'B'], correctAnswer: 0, explanation: '', culturalTheme: '' },
  ];

  const passAnswers = { 1: 0, 2: 1, 3: 0, 4: 1, 5: 1 }; // 4 correct
  const passResult = calculateTriviaScore(passAnswers, dummyQuestions);
  assert.equal(passResult.correct, 4);
  assert.equal(passResult.isPassed, true);

  const failAnswers = { 1: 0, 2: 1, 3: 0, 4: 0, 5: 1 }; // 3 correct
  const failResult = calculateTriviaScore(failAnswers, dummyQuestions);
  assert.equal(failResult.correct, 3);
  assert.equal(failResult.isPassed, false);
});

test('determineQuizMatch picks the most chosen character archetype', () => {
  const answers = {
    1: 'skullpanda-nhat-binh' as const,
    2: 'crybaby-co-tam' as const,
    3: 'skullpanda-nhat-binh' as const,
    4: 'skullpanda-nhat-binh' as const,
    5: 'hirono-tra-da' as const,
  };
  const matched = determineQuizMatch(answers);
  assert.equal(matched, 'skullpanda-nhat-binh');
});

test('formatCurrency and getTodayDateString produce expected formats', () => {
  const formatted = formatCurrency(290000);
  assert.ok(formatted.includes('290.000'));
  const today = getTodayDateString();
  assert.match(today, /^\d{4}-\d{2}-\d{2}$/);
});
