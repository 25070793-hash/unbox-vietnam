import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Character,
  CharacterId,
  CartItem,
  RedeemedVoucher,
  Order,
  CustomerOrderForm,
  Voucher,
} from '../types';
import { CHARACTERS, VOUCHERS } from '../data/characters';
import { audioSynth } from '../services/audioSynth';
import { calculateDiscount, calculateShipping, calculateOrderTotal, getTodayDateString } from '../utils/shopLogic';

interface MissionState {
  currentCount: number;
  isClaimed: boolean;
  lastClaimedDate?: string;
}

interface AppContextType {
  // Navigation
  currentRoute: string;
  navigateTo: (route: string, characterId?: CharacterId) => void;
  selectedCharacterId: CharacterId | null;
  setSelectedCharacterId: (id: CharacterId | null) => void;

  // Characters & Audio
  characters: Character[];
  playingCharacterId: CharacterId | null;
  isMuted: boolean;
  toggleMute: () => void;
  playCharacterMelody: (id: CharacterId) => void;
  stopAudio: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (character: Character, quantity?: number) => void;
  updateCartQuantity: (characterId: CharacterId, quantity: number) => void;
  removeFromCart: (characterId: CharacterId) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  // Favorites
  favorites: CharacterId[];
  toggleFavorite: (id: CharacterId) => void;
  isFavorite: (id: CharacterId) => boolean;

  // Coins & Unlocked Characters
  coins: number;
  unlockedCharacters: CharacterId[];
  unlockCharacter: (id: CharacterId) => void;

  // Missions
  missionsProgress: Record<string, MissionState>;
  recordCharacterView: (id: CharacterId) => void;
  recordMysteryBoxPlay: () => void;
  recordWheelPlay: () => void;
  recordQuizCompleted: () => void;
  recordTriviaSuccess: () => void;
  claimMissionReward: (missionId: string) => boolean;

  // Vouchers
  redeemedVouchers: RedeemedVoucher[];
  redeemVoucher: (voucherCode: string) => { success: boolean; message: string };
  selectedVoucherCode: string | null;
  setSelectedVoucherCode: (code: string | null) => void;
  activeDiscount: number;

  // Orders
  orders: Order[];
  createOrder: (formData: CustomerOrderForm) => { success: boolean; orderId?: string; error?: string };
  lastPlacedOrder: Order | null;

  // Toasts
  toasts: Array<{ id: string; message: string; type: 'success' | 'info' | 'coin' | 'warning' }>;
  addToast: (message: string, type?: 'success' | 'info' | 'coin' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'unbox_vn_cart_v1',
  FAVORITES: 'unbox_vn_favs_v1',
  COINS: 'unbox_vn_coins_v1',
  UNLOCKED: 'unbox_vn_unlocked_v1',
  VIEWED: 'unbox_vn_viewed_v1',
  MISSIONS: 'unbox_vn_missions_v1',
  VOUCHERS: 'unbox_vn_vouchers_v1',
  ORDERS: 'unbox_vn_orders_v1',
  MUTED: 'unbox_vn_muted_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedCharacterId, setSelectedCharacterId] = useState<CharacterId | null>(null);

  // Audio State
  const [playingCharacterId, setPlayingCharacterId] = useState<CharacterId | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MUTED) === 'true';
    } catch {
      return false;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'info' | 'coin' | 'warning' }>>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'coin' | 'warning' = 'info') => {
    const id = `${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<CharacterId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coins (Start with 150 xu to allow immediate interaction)
  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COINS);
      return saved !== null ? Number(saved) : 150;
    } catch {
      return 150;
    }
  });

  // Unlocked Characters (Default 1 unlocked to spark joy)
  const [unlockedCharacters, setUnlockedCharacters] = useState<CharacterId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNLOCKED);
      return saved ? JSON.parse(saved) : ['hirono-tra-da'];
    } catch {
      return ['hirono-tra-da'];
    }
  });

  // Viewed characters list
  const [viewedCharacters, setViewedCharacters] = useState<CharacterId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIEWED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Missions
  const [missionsProgress, setMissionsProgress] = useState<Record<string, MissionState>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MISSIONS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Redeemed Vouchers
  const [redeemedVouchers, setRedeemedVouchers] = useState<RedeemedVoucher[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VOUCHERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected Voucher in Cart
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COINS, String(coins));
    } catch {}
  }, [coins]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.UNLOCKED, JSON.stringify(unlockedCharacters));
    } catch {}
  }, [unlockedCharacters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIEWED, JSON.stringify(viewedCharacters));
    } catch {}
  }, [viewedCharacters]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missionsProgress));
    } catch {}
  }, [missionsProgress]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(redeemedVouchers));
    } catch {}
  }, [redeemedVouchers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MUTED, String(isMuted));
    } catch {}
    audioSynth.setMuted(isMuted);
  }, [isMuted]);

  // Audio Handlers
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      audioSynth.setMuted(next);
      addToast(next ? 'Đã tắt âm thanh' : 'Đã bật âm thanh', 'info');
      return next;
    });
  }, [addToast]);

  const playCharacterMelody = useCallback((id: CharacterId) => {
    if (playingCharacterId === id) {
      audioSynth.stopCurrentMelody();
      setPlayingCharacterId(null);
    } else {
      setPlayingCharacterId(id);
      audioSynth.playCharacterMelody(id, () => {
        setPlayingCharacterId(null);
      });
    }
  }, [playingCharacterId]);

  const stopAudio = useCallback(() => {
    audioSynth.stopCurrentMelody();
    setPlayingCharacterId(null);
  }, []);

  // Navigation
  const navigateTo = useCallback((route: string, characterId?: CharacterId) => {
    if (characterId) {
      setSelectedCharacterId(characterId);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Cart actions
  const addToCart = useCallback((character: Character, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.character.id === character.id);
      if (existing) {
        return prev.map((item) =>
          item.character.id === character.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { character, quantity }];
    });
    audioSynth.playUiSound('click');
    addToast(`Đã thêm ${character.name} vào giỏ hàng`, 'success');
  }, [addToast]);

  const updateCartQuantity = useCallback((characterId: CharacterId, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.character.id !== characterId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.character.id === characterId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((characterId: CharacterId) => {
    setCart((prev) => prev.filter((item) => item.character.id !== characterId));
    addToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  }, [addToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    setSelectedVoucherCode(null);
  }, []);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.character.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Active Voucher discount calculation
  const activeDiscount = calculateDiscount(cartSubtotal, selectedVoucherCode);

  // Favorites
  const toggleFavorite = useCallback((id: CharacterId) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      audioSynth.playUiSound('click');
      addToast(exists ? 'Đã bỏ yêu thích nhân vật' : 'Đã thêm vào danh sách yêu thích', 'info');

      // Update Mission: Yêu thích 5 nhân vật
      setMissionsProgress((mPrev) => {
        const m = mPrev['favorite-5-characters'] || { currentCount: 0, isClaimed: false };
        return {
          ...mPrev,
          'favorite-5-characters': {
            ...m,
            currentCount: next.length,
          },
        };
      });

      return next;
    });
  }, [addToast]);

  const isFavorite = useCallback((id: CharacterId) => favorites.includes(id), [favorites]);

  // Unlocked Characters
  const unlockCharacter = useCallback((id: CharacterId) => {
    setUnlockedCharacters((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      // Update Mission: Mở khóa 3 nhân vật khác nhau
      setMissionsProgress((mPrev) => {
        const m = mPrev['unlock-3-characters'] || { currentCount: 0, isClaimed: false };
        return {
          ...mPrev,
          'unlock-3-characters': {
            ...m,
            currentCount: next.length,
          },
        };
      });
      return next;
    });
  }, []);

  // Missions triggers
  const recordCharacterView = useCallback((id: CharacterId) => {
    setViewedCharacters((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      setMissionsProgress((mPrev) => {
        const m = mPrev['view-7-characters'] || { currentCount: 0, isClaimed: false };
        return {
          ...mPrev,
          'view-7-characters': {
            ...m,
            currentCount: next.length,
          },
        };
      });
      return next;
    });
  }, []);

  const recordMysteryBoxPlay = useCallback(() => {
    const today = getTodayDateString();
    setMissionsProgress((prev) => {
      const m = prev['mystery-box-daily'] || { currentCount: 0, isClaimed: false };
      const isNewDay = m.lastClaimedDate !== today;
      return {
        ...prev,
        'mystery-box-daily': {
          currentCount: 1,
          isClaimed: isNewDay ? false : m.isClaimed,
          lastClaimedDate: isNewDay ? undefined : m.lastClaimedDate,
        },
      };
    });
  }, []);

  const recordWheelPlay = useCallback(() => {
    const today = getTodayDateString();
    setMissionsProgress((prev) => {
      const m = prev['lucky-wheel-daily'] || { currentCount: 0, isClaimed: false };
      const isNewDay = m.lastClaimedDate !== today;
      return {
        ...prev,
        'lucky-wheel-daily': {
          currentCount: 1,
          isClaimed: isNewDay ? false : m.isClaimed,
          lastClaimedDate: isNewDay ? undefined : m.lastClaimedDate,
        },
      };
    });
  }, []);

  const recordQuizCompleted = useCallback(() => {
    setMissionsProgress((prev) => {
      const m = prev['personality-quiz-once'] || { currentCount: 0, isClaimed: false };
      return {
        ...prev,
        'personality-quiz-once': {
          ...m,
          currentCount: 1,
        },
      };
    });
  }, []);

  const recordTriviaSuccess = useCallback(() => {
    const today = getTodayDateString();
    setMissionsProgress((prev) => {
      const m = prev['trivia-daily'] || { currentCount: 0, isClaimed: false };
      const isNewDay = m.lastClaimedDate !== today;
      return {
        ...prev,
        'trivia-daily': {
          currentCount: 1,
          isClaimed: isNewDay ? false : m.isClaimed,
          lastClaimedDate: isNewDay ? undefined : m.lastClaimedDate,
        },
      };
    });
  }, []);

  const claimMissionReward = useCallback((missionId: string): boolean => {
    const rewardAmounts: Record<string, number> = {
      'view-7-characters': 100,
      'mystery-box-daily': 50,
      'lucky-wheel-daily': 40,
      'personality-quiz-once': 80,
      'trivia-daily': 100,
      'unlock-3-characters': 150,
      'favorite-5-characters': 70,
    };

    const reward = rewardAmounts[missionId];
    if (!reward) return false;

    const today = getTodayDateString();
    const current = missionsProgress[missionId];
    if (!current || current.isClaimed) return false;

    // Check conditions
    if (missionId === 'view-7-characters' && current.currentCount < 7) return false;
    if (missionId === 'unlock-3-characters' && current.currentCount < 3) return false;
    if (missionId === 'favorite-5-characters' && current.currentCount < 5) return false;
    if (['mystery-box-daily', 'lucky-wheel-daily', 'personality-quiz-once', 'trivia-daily'].includes(missionId) && current.currentCount < 1) {
      return false;
    }

    // Award coins once
    setCoins((c) => c + reward);
    setMissionsProgress((prev) => ({
      ...prev,
      [missionId]: {
        ...prev[missionId],
        isClaimed: true,
        lastClaimedDate: today,
      },
    }));

    audioSynth.playUiSound('coin');
    addToast(`Nhận thành công +${reward} Xu Văn Hóa!`, 'coin');
    return true;
  }, [missionsProgress, addToast]);

  // Voucher Redemption
  const redeemVoucher = useCallback((voucherCode: string): { success: boolean; message: string } => {
    const voucher = VOUCHERS.find((v) => v.code === voucherCode);
    if (!voucher) {
      return { success: false, message: 'Mã voucher không tồn tại.' };
    }

    if (coins < voucher.coinCost) {
      return {
        success: false,
        message: `Bạn chưa đủ Xu Văn Hóa (Cần ${voucher.coinCost} xu, hiện có ${coins} xu).`,
      };
    }

    // Check if user already has an unused voucher of this code
    const alreadyHasUnused = redeemedVouchers.some(
      (v) => v.code === voucherCode && !v.isUsed
    );
    if (alreadyHasUnused) {
      return {
        success: false,
        message: 'Bạn đã có mã này trong Ví và chưa sử dụng!',
      };
    }

    // Deduct coins and add voucher to wallet
    setCoins((c) => c - voucher.coinCost);
    const newRedeemed: RedeemedVoucher = {
      code: voucher.code,
      discountPercent: voucher.discountPercent,
      maxDiscount: voucher.maxDiscount,
      isUsed: false,
      redeemedAt: new Date().toLocaleDateString('vi-VN'),
    };
    setRedeemedVouchers((prev) => [...prev, newRedeemed]);

    audioSynth.playUiSound('coin');
    addToast(`Đổi mã ${voucher.code} thành công (-${voucher.coinCost} xu)!`, 'success');
    return { success: true, message: 'Đổi voucher thành công!' };
  }, [coins, redeemedVouchers, addToast]);

  // Order Placement
  const createOrder = useCallback((_formData: CustomerOrderForm): { success: boolean; orderId?: string; error?: string } => {
    if (cart.length === 0) {
      return { success: false, error: 'Giỏ hàng đang trống.' };
    }

    const subtotal = cartSubtotal;
    const discount = activeDiscount;
    const shipping = calculateShipping(subtotal);
    const total = calculateOrderTotal(subtotal, discount, shipping);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `VN-BOX-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: cart.map((item) => ({
        id: item.character.id,
        name: item.character.name,
        price: item.character.price,
        quantity: item.quantity,
      })),
      subtotal,
      discount,
      shippingFee: shipping,
      total,
      voucherCode: selectedVoucherCode || undefined,
      status: 'Đang chuẩn bị mô phỏng',
    };

    // Mark voucher as used
    if (selectedVoucherCode) {
      setRedeemedVouchers((prev) =>
        prev.map((v) =>
          v.code === selectedVoucherCode && !v.isUsed ? { ...v, isUsed: true } : v
        )
      );
    }

    // Save order history (Notice: NO PII stored in order object!)
    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    setSelectedVoucherCode(null);

    audioSynth.playUiSound('victory');
    addToast('Đặt hàng mô phỏng thành công!', 'success');
    return { success: true, orderId };
  }, [cart, cartSubtotal, activeDiscount, selectedVoucherCode, addToast]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        selectedCharacterId,
        setSelectedCharacterId,
        characters: CHARACTERS,
        playingCharacterId,
        isMuted,
        toggleMute,
        playCharacterMelody,
        stopAudio,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        favorites,
        toggleFavorite,
        isFavorite,
        coins,
        unlockedCharacters,
        unlockCharacter,
        missionsProgress,
        recordCharacterView,
        recordMysteryBoxPlay,
        recordWheelPlay,
        recordQuizCompleted,
        recordTriviaSuccess,
        claimMissionReward,
        redeemedVouchers,
        redeemVoucher,
        selectedVoucherCode,
        setSelectedVoucherCode,
        activeDiscount,
        orders,
        createOrder,
        lastPlacedOrder,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
