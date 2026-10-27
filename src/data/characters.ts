import { Character, CharacterId } from '../types';

export const CHARACTER_IMAGES: Record<CharacterId, string> = {
  'crybaby-co-tam': '/images/crybaby-co-tam.jpg',
  'hirono-tra-da': '/images/hirono-tra-da.jpg',
  'labubu-chu-teu': '/images/labubu-chu-teu.jpg',
  'sweetbean-to-he': '/images/sweetbean-to-he.jpg',
  'hacipupu-si-tu': '/images/hacipupu-si-tu.jpg',
  'skullpanda-nhat-binh': '/images/skullpanda-nhat-binh.jpg',
  'pucky-ca-chep': '/images/pucky-ca-chep.jpg',
};

export const CHARACTERS: Character[] = [
  {
    id: 'crybaby-co-tam',
    name: 'Crybaby – Cô Tấm',
    originalFigure: 'Crybaby',
    vietnameseTitle: 'Cô Tấm Hóa Búp Sen',
    category: 'Cổ tích & Truyền thuyết',
    price: 320000,
    shortDesc: 'Giọt lệ pha lê hóa sương mai trên búp sen hồng, biểu tượng cho lòng hiếu thuận và sự tái sinh kiên cường.',
    culturalStory:
      'Lấy cảm hứng từ truyện cổ tích Tấm Cám kinh điển của văn học dân gian Việt Nam. Hình ảnh giọt nước mắt đặc trưng của Crybaby được tái diễn giải thành giọt sương sớm đọng trên cánh hoa sen - loài quốc hoa thanh khiết "gần bùn mà chẳng hôi tanh mùi bùn". Trải qua bao biến cố luân hồi từ chim vàng anh, cây xoan đào đến khung cửi và quả thị thơm, Tấm luôn giữ trọn phẩm chất thơm thảo để bước ra rạng rỡ giữa hội hoa xuân.',
    symbolism: [
      'Búp hoa sen hồng thơm ngát ôm trọn thân búp bê, tượng trưng cho tính bản thiện và phẩm giá thanh bạch.',
      'Khăn mỏ quạ đen tuyền và dải yếm lụa đào truyền thống của phụ nữ đồng bằng Bắc Bộ.',
      'Giọt lệ pha lê chuyển sắc hổ phách, ẩn dụ cho sự kiên cường và lòng trắc ẩn thầm lặng.',
      'Chiếc giỏ mây đựng cá bống mini tinh xảo gắn bên hông búp bê.',
    ],
    melody: {
      name: 'Khúc Hát Hoa Sen & Đàn Tranh',
      instrumentDescription: 'Âm sắc đàn tranh ngũ cung thanh tao hòa quyện tiếng sáo trúc vút cao dịu dàng.',
      style: 'Cổ tích - Thơ mộng',
      tempo: 78,
    },
    theme: {
      primary: '#9D174D',
      secondary: '#FCE7F3',
      accent: '#F472B6',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-900',
    },
    stats: {
      rarity: 'Hiếm (Rare 1/72)',
      height: '9.8 cm',
      material: 'PVC / ABS bóng mờ cao cấp, chi tiết ngọc trai',
      releaseBatch: 'VNU1001 - Mùa Khởi Nguyên',
    },
    image: '/images/crybaby-co-tam.jpg',
  },
  {
    id: 'hirono-tra-da',
    name: 'Hirono – Trà Đá Vỉa Hè',
    originalFigure: 'Hirono',
    vietnameseTitle: 'Trà Đá Ghế Nhựa Phố Cũ',
    category: 'Đời sống phố phường',
    price: 290000,
    shortDesc: 'Nốt trầm tự sự bên ly trà đá vỉa hè mát rượi và chiếc ghế đẩu xanh, gom trọn nhịp sống mộc mạc phố Việt.',
    culturalStory:
      'Trà đá vỉa hè không đơn thuần là một thức uống giải nhiệt bình dân, mà là "tụ điểm văn hóa cộng đồng" độc nhất vô nhị trải dài từ Hà Nội tới TP. Hồ Chí Minh. Hirono - cậu bé mang đôi mắt tư lự và vết xước tâm hồn - ngồi trầm ngâm bên chiếc bàn nhựa con, lắng nghe tiếng còi xe, tiếng rao hàng và nhịp đời hối hả. Đó là góc trú ẩn tĩnh lặng, nơi mọi ranh giới xã hội đều hòa tan trong ngụm trà chát ngọt hậu.',
    symbolism: [
      'Chiếc ghế đẩu nhựa xanh huyền thoại - chứng nhân bình dị của hàng vạn cuộc trò chuyện đời thường.',
      'Cốc thủy tinh vân sọc đúc bọt đá lạnh lóng lánh kèm ống hút tre thân thiện.',
      'Chiếc quạt nan tre xòe nhẹ bên cạnh, gợi nhớ những trưa hè ngõ nhỏ rợp bóng mát.',
      'Chiếc đĩa nhôm đựng hạt hướng dương tí hon được tạo tác sắc nét.',
    ],
    melody: {
      name: 'Lo-fi Phố Cũ & Tiếng Ly Va Khẽ',
      instrumentDescription: 'Giai điệu Lo-fi thư thái, nhịp trống nhẹ nhàng đan xen tiếng gõ thìa thủy tinh quen thuộc.',
      style: 'Phố thị - Chillhop',
      tempo: 82,
    },
    theme: {
      primary: '#0F766E',
      secondary: '#CCFBF1',
      accent: '#14B8A6',
      badgeBg: 'bg-teal-100',
      badgeText: 'text-teal-900',
    },
    stats: {
      rarity: 'Tiêu chuẩn (Standard)',
      height: '8.6 cm',
      material: 'Vinyl nhám kết hợp nhựa trong mô phỏng khối đá viên',
      releaseBatch: 'VNU1001 - Mùa Khởi Nguyên',
    },
    image: '/images/hirono-tra-da.jpg',
  },
  {
    id: 'labubu-chu-teu',
    name: 'Labubu – Chú Tễu Thủy Đình',
    originalFigure: 'Labubu',
    vietnameseTitle: 'Chú Tễu Thủy Đình Múa Rối Nước',
    category: 'Nghệ thuật dân gian',
    price: 350000,
    shortDesc: 'Nụ cười răng khểnh hóm hỉnh khuấy động mặt nước Thủy Đình, mang lại tiếng cười hội hè xua tan âu lo.',
    culturalStory:
      'Múa rối nước là di sản văn hóa phi vật thể đỉnh cao sinh ra từ nền văn minh lúa nước sông Hồng. Chú Tễu - nhân vật mở màn với thân hình đẫy đà, nụ cười rạng rỡ và sự thông thái hóm hỉnh - gặp gỡ nét tinh nghịch, láu lỉnh của Labubu. Đứng trên mặt nước Thủy Đình lấp lánh ánh đèn lồng, Chú Tễu Labubu vung chiếc quạt mo gảy nhịp vui tươi, đưa người xem vào thế giới thần thoại kỳ ảo của làng quê Việt.',
    symbolism: [
      'Đôi tai dài đặc trưng của Labubu phủ hoa văn vân mây cổ thời Lý - Trần.',
      'Chiếc khố gấm màu đỏ son truyền thống và chuỗi hạt gỗ mộc đeo trước ngực.',
      'Mô phỏng mặt nước gợn sóng đục màu phù sa sông Hồng nâng đỡ bàn chân art toy.',
      'Chiếc quạt mo cau khẽ vẫy gợi nụ cười trào lộng, xua tan mọi điềm dữ.',
    ],
    melody: {
      name: 'Trống Hội Thủy Đình & Phách Gỗ',
      instrumentDescription: 'Tiếng trống hội rộn ràng, nhịp phách gỗ giòn giã và âm điệu chèo Bắc Bộ hào sảng.',
      style: 'Hội làng - Rộn rã',
      tempo: 110,
    },
    theme: {
      primary: '#991B1B',
      secondary: '#FEE2E2',
      accent: '#EF4444',
      badgeBg: 'bg-red-100',
      badgeText: 'text-red-900',
    },
    stats: {
      rarity: 'Cực hiếm (Secret Chase 1/144)',
      height: '10.5 cm',
      material: 'PVC sơn bóng giả gốm men lam truyền thống',
      releaseBatch: 'VNU1001 - Mùa Khởi Nguyên',
    },
    image: '/images/labubu-chu-teu.jpg',
  },
  {
    id: 'sweetbean-to-he',
    name: 'Sweet Bean – Bé Tò He',
    originalFigure: 'Sweet Bean',
    vietnameseTitle: 'Bé Tò He Bột Nếp Làng Xuân La',
    category: 'Nghệ thuật dân gian',
    price: 280000,
    shortDesc: 'Khối bột nếp sắc màu từ nghệ, lá cẩm và gấc đỏ biến hóa thành bé tò he bụ bẫm giữ trọn nụ cười trẻ thơ.',
    culturalStory:
      'Nghệ thuật nặn tò he làng Xuân La (Phú Xuyên, Hà Nội) hơn 300 năm tuổi là bức tranh tuổi thơ sống động nhất của người Việt. Từ những hạt gạo nếp dẻo thơm luộc chín, qua bàn tay tài hoa của nghệ nhân với phẩm nhuộm thiên nhiên (nghệ vàng, lá dứa xanh, quả gấc đỏ), từng chú gà, bông hồng, hiệp sĩ hiện ra. Sweet Bean bụ bẫm ôm chiếc que tò he, nhắc nhở thế hệ trẻ nâng niu món đồ chơi dân gian ngập tràn hồn quê.',
    symbolism: [
      'Bộ trang phục được phối từ 5 màu sắc tò he cơ bản đại diện cho ngũ hành phong thủy.',
      'Que tò he mini gắn chú gà trống oai vệ đang cất tiếng gáy đón mặt trời.',
      'Gương mặt bụ bẫm tròn xoe của Sweet Bean gợi nét ngây thơ trong sáng của trẻ nhỏ.',
      'Hộp đồ nghề nặn tò he bằng gỗ xưa được tái hiện tỉ mỉ dưới chân.',
    ],
    melody: {
      name: 'Khúc Khích Đồng Dao & Sáo Trúc',
      instrumentDescription: 'Giai điệu đồng dao trong trẻo, tiếng sáo trúc vút cao ríu rít như tiếng cười con trẻ làng quê.',
      style: 'Đồng dao - Vui tươi',
      tempo: 96,
    },
    theme: {
      primary: '#C2410C',
      secondary: '#FFEDD5',
      accent: '#F97316',
      badgeBg: 'bg-orange-100',
      badgeText: 'text-orange-900',
    },
    stats: {
      rarity: 'Tiêu chuẩn (Standard)',
      height: '8.2 cm',
      material: 'Vinyl nhám mềm (soft vinyl touch) mô phỏng độ dẻo bột nếp',
      releaseBatch: 'VNU1001 - Mùa Khởi Nguyên',
    },
    image: '/images/sweetbean-to-he.jpg',
  },
  {
    id: 'hacipupu-si-tu',
    name: 'Hacipupu – Sĩ Tử Ngủ Gật',
    originalFigure: 'Hacipupu',
    vietnameseTitle: 'Sĩ Tử Lều Chõng Văn Miếu',
    category: 'Cung đình & Khoa cử',
    price: 310000,
    shortDesc: 'Cậu học trò nhỏ lều chõng ngủ gật bên nghiên mực và ngọn đèn dầu, gửi gắm tinh thần hiếu học vượt khó.',
    culturalStory:
      'Việt Nam có nghìn năm văn hiến với truyền thống "Tôn sư trọng đạo" và các kỳ thi Hương, thi Hội, thi Đình khắc nghiệt. Hacipupu hóa thân thành chú sĩ tử dễ thương, khăn đóng áo the, ngày đêm dùi mài kinh sử dưới mái trường Quốc Tử Giám. Cảnh tượng sĩ tử ngủ gật đầu nghiêng trên xấp giấy điều, tay vẫn nắm chặt chiếc bút lông, vừa hóm hỉnh vừa khiến người ta thương mến và khâm phục ý chí chiếm bảng vàng.',
    symbolism: [
      'Chiếc mũ cánh chuồn sĩ tử nho nhã đính ngọc trai giả cổ.',
      'Cuộn sách thư tịch chữ Nho và nghiên mực tàu có vết mực lem ngộ nghĩnh trên gò má.',
      'Bệ tượng rùa đá cõng bia tiến sĩ thu nhỏ mang ý nghĩa vinh quy bái tổ.',
      'Ngọn đèn hạt đậu cổ xưa le lói ánh sáng tri thức thắp sáng đêm thi cử.',
    ],
    melody: {
      name: 'Tiếng Đàn Bầu & Chuông Văn Miếu',
      instrumentDescription: 'Âm sắc đàn bầu nắn nót sâu lắng kết hợp tiếng chuông đồng Văn Miếu ngân vang chậm rãi.',
      style: 'Khoa cử - Uyên bác pha hài hước',
      tempo: 72,
    },
    theme: {
      primary: '#854D0E',
      secondary: '#FEF9C3',
      accent: '#EAB308',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
    },
    stats: {
      rarity: 'Hiếm (Rare 1/72)',
      height: '9.0 cm',
      material: 'PVC sơn phủ hiệu ứng gốm cổ Chu Đậu rạn men',
      releaseBatch: 'VNU1001 - Mùa Khởi Nguyên',
    },
    image: '/images/hacipupu-si-tu.jpg',
  },
  {
    id: 'skullpanda-nhat-binh',
    name: 'Skullpanda – Nhật Bình Neon',
    originalFigure: 'Skullpanda',
    vietnameseTitle: 'Áo Nhật Bình Hoàng Cung Cyber',
    category: 'Cung đình & Khoa cử',
    price: 390000,
    shortDesc: 'Giao lộ kiêu kỳ giữa y phục cung đình triều Nguyễn và ánh sáng neon vị lai, tôn vinh vị thế mỹ học Việt.',
    culturalStory:
      'Áo Nhật Bình là thường phục cao quý của bậc Hoàng thái hậu, Hoàng hậu, Công chúa triều Nguyễn với dải cổ áo chữ nhật thêu hoa văn ngũ hành và phượng hoàng lộng lẫy. Dưới bàn tay sáng tạo Neo-Folklore, Skullpanda khoác lên mình tà áo Nhật Bình lộng lẫy kết hợp các đường kẻ neon phát quang đương đại. Một biểu tượng thị giác ma mị, chứng minh cổ phục Việt Nam hoàn toàn có thể trở thành ngôn ngữ thời trang đỉnh cao của tương lai.',
    symbolism: [
      'Cổ áo hình chữ nhật viền dải ngũ sắc vàng, xanh, đỏ, trắng, đen tượng trưng cho Ngũ hành.',
      'Hoa văn chim loan phượng và mây ngũ sắc thêu chỉ phản quang neon dạ quang trong bóng tối.',
      'Trâm cài tóc cánh phượng ngọc bích đính tua rua hạt cườm thả dài kiêu sa.',
      'Đôi mắt khói bí ẩn đặc trưng của Skullpanda hòa trộn vẻ đẹp đài các thâm cung.',
    ],
    melody: {
      name: 'Nhã Nhạc Cung Đình Fused Cyber-Synth',
      instrumentDescription: 'Âm hưởng nhã nhạc Huế ngũ cung uy nghiêm phối hợp tiếng synthesizer điện tử huyền ảo.',
      style: 'Cung đình - Vị lai (Cyber-Court)',
      tempo: 88,
    },
    theme: {
      primary: '#6B21A8',
      secondary: '#F3E8FF',
      accent: '#A855F7',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-900',
    },
    stats: {
      rarity: 'Đặc biệt (Super Rare 1/96)',
      height: '10.2 cm',
      material: 'PVC phủ sơn Chrome tím & huỳnh quang phát sáng UV',
      releaseBatch: 'VNU1001 - Mùa Khởi Nguyên',
    },
    image: '/images/skullpanda-nhat-binh.jpg',
  },
  {
    id: 'pucky-ca-chep',
    name: 'Pucky – Cá Chép Trông Trăng',
    originalFigure: 'Pucky',
    vietnameseTitle: 'Lý Ngư Vọng Nguyệt Đêm Rằm',
    category: 'Lễ hội & Tết',
    price: 330000,
    shortDesc: 'Vẫy lượn đón trăng rằm tháng Tám bên đèn lồng ông sao, tượng trưng cho ước mơ đỗ đạt vượt vũ môn hóa rồng.',
    culturalStory:
      'Lấy cảm hứng từ bức tranh dân gian Hàng Trống nổi tiếng "Lý Ngư Vọng Nguyệt" (Cá chép trông trăng) và không khí huyền ảo của Tết Trung Thu Việt Nam. Chú bé thần tiên Pucky đội chiếc mũ cá chép vàng óng ánh, tay nâng chiếc đèn ông sao giấy kính lung linh. Ánh trăng rằm phản chiếu dưới mặt hồ trong veo là bài học tinh tế về việc chiêm nghiệm chân - thiện - mỹ và khát vọng vượt vũ môn hóa rồng kỳ vĩ.',
    symbolism: [
      'Mũ trùm đầu hình cá chép đỏ dát nhũ xà cừ với đôi mắt to tròn lấp lánh.',
      'Chiếc đèn ông sao ngũ sắc giấy kính có gắn đèn LED mô phỏng đốm nến đêm Trung Thu.',
      'Họa tiết vảy cá cách điệu sóng nước mạ vàng óng ánh trên thân áo.',
      'Vầng trăng rằm tròn vành vạnh và dải mây lụa nâng bước chân búp bê.',
    ],
    melody: {
      name: 'Rước Đèn Đêm Trăng & Chuông Gió',
      instrumentDescription: 'Tiếng trống múa lân rộn rã rước đèn kết hợp chuông gió ngân nga và sáo diều êm dịu.',
      style: 'Trung Thu - Rực rỡ',
      tempo: 104,
    },
    theme: {
      primary: '#B45309',
      secondary: '#FEF3C7',
      accent: '#F59E0B',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-900',
    },
    stats: {
      rarity: 'Hiếm (Rare 1/72)',
      height: '8.9 cm',
      material: 'Vinyl trong mờ hiệu ứng lấp lánh kim tuyến (Glitter Resin)',
      releaseBatch: 'VNU1001 - Mùa Khởi Nguyên',
    },
    image: '/images/pucky-ca-chep.jpg',
  },
];

export const VOUCHERS: {
  code: 'UNBOX5' | 'UNBOX10' | 'UNBOX15' | 'UNBOX20';
  discountPercent: number;
  maxDiscount: number;
  coinCost: number;
  description: string;
  minSpend: number;
}[] = [
  {
    code: 'UNBOX5',
    discountPercent: 5,
    maxDiscount: 30000,
    coinCost: 100,
    description: 'Giảm 5% giá trị đơn hàng (tối đa 30.000 ₫). Phù hợp cho đơn mua đơn lẻ.',
    minSpend: 200000,
  },
  {
    code: 'UNBOX10',
    discountPercent: 10,
    maxDiscount: 60000,
    coinCost: 250,
    description: 'Giảm 10% giá trị đơn hàng (tối đa 60.000 ₫). Tiết kiệm tối ưu khi mua combo 2 nhân vật.',
    minSpend: 400000,
  },
  {
    code: 'UNBOX15',
    discountPercent: 15,
    maxDiscount: 100000,
    coinCost: 450,
    description: 'Giảm 15% giá trị đơn hàng (tối đa 100.000 ₫). Dành cho người sưu tập nghệ thuật đam mê.',
    minSpend: 600000,
  },
  {
    code: 'UNBOX20',
    discountPercent: 20,
    maxDiscount: 150000,
    coinCost: 700,
    description: 'Giảm 20% giá trị đơn hàng (tối đa 150.000 ₫). Voucher cao cấp nhất bộ sưu tập.',
    minSpend: 800000,
  },
];
