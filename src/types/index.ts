export type CharacterId =
  | 'crybaby-co-tam'
  | 'hirono-tra-da'
  | 'labubu-chu-teu'
  | 'sweetbean-to-he'
  | 'hacipupu-si-tu'
  | 'skullpanda-nhat-binh'
  | 'pucky-ca-chep';

export interface Character {
  id: CharacterId;
  name: string;
  originalFigure: string;
  vietnameseTitle: string;
  category: 'Cổ tích & Truyền thuyết' | 'Đời sống phố phường' | 'Nghệ thuật dân gian' | 'Cung đình & Khoa cử' | 'Lễ hội & Tết';
  price: number;
  shortDesc: string;
  culturalStory: string;
  symbolism: string[];
  melody: {
    name: string;
    instrumentDescription: string;
    style: string;
    tempo: number;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
  };
  stats: {
    rarity: string;
    height: string;
    material: string;
    releaseBatch: string;
  };
  image: string;
}

export interface CartItem {
  character: Character;
  quantity: number;
}

export interface Voucher {
  code: 'UNBOX5' | 'UNBOX10' | 'UNBOX15' | 'UNBOX20';
  discountPercent: number;
  maxDiscount: number;
  coinCost: number;
  description: string;
  minSpend: number;
}

export interface RedeemedVoucher {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  isUsed: boolean;
  redeemedAt: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  type: 'one_time' | 'daily';
  targetCount: number;
  actionRoute: string;
  actionLabel: string;
}

export interface OrderItem {
  id: CharacterId;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  voucherCode?: string;
  status: 'Đang chuẩn bị mô phỏng' | 'Đang tạo tác phiên bản art toy' | 'Sẵn sàng trưng bày';
}

export interface CustomerOrderForm {
  fullName: string;
  phone: string;
  city: string;
  ward: string;
  address: string;
  note: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  culturalTheme: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string;
  options: {
    text: string;
    characterId: CharacterId;
    vibe: string;
  }[];
}
