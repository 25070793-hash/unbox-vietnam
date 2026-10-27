import { QuizQuestion } from '../types';

export const PERSONALITY_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Một buổi chiều thong dong, bạn muốn hòa mình vào không gian nào nhất?',
    context: 'Không gian sống phản chiếu rung cảm tâm hồn sâu kín của bạn.',
    options: [
      {
        text: 'Ngồi quán nước vỉa hè ngắm dòng người qua lại, nhâm nhi cốc trà mát và cắn hạt hướng dương.',
        characterId: 'hirono-tra-da',
        vibe: 'Mộc mạc, tĩnh lặng và sâu sắc',
      },
      {
        text: 'Dạo bước bên hồ sen ngát hương, lắng nghe tiếng chuông chùa thanh tịnh giữa chiều tà.',
        characterId: 'crybaby-co-tam',
        vibe: 'Dịu dàng, thơm thảo và giàu lòng trắc ẩn',
      },
      {
        text: 'Hòa mình vào lễ hội rộn ràng, xem múa lân, múa rối nước và cười sảng khoái cùng bạn bè.',
        characterId: 'labubu-chu-teu',
        vibe: 'Lạc quan, hóm hỉnh và tràn đầy năng lượng',
      },
      {
        text: 'Ghé một gian hàng thủ công mỹ nghệ, ngắm các nghệ nhân nặn tò he rực rỡ sắc màu.',
        characterId: 'sweetbean-to-he',
        vibe: 'Hồn nhiên, ngọt ngào và nâng niu ký ức',
      },
      {
        text: 'Một góc thư viện cổ kính thơm mùi sách cũ, có bàn gỗ và đèn vàng ấm áp để nghiền ngẫm.',
        characterId: 'hacipupu-si-tu',
        vibe: 'Hiếu học, kiên trì và dễ thương',
      },
      {
        text: 'Triển lãm thời trang nghệ thuật đương đại kết hợp ánh sáng neon ma mị và cổ phục hoàng gia.',
        characterId: 'skullpanda-nhat-binh',
        vibe: 'Kiêu kỳ, độc bản và dẫn đầu xu hướng',
      },
      {
        text: 'Đêm hội trăng rằm lung linh đèn hoa đăng, cùng bạn bè rước đèn ông sao ngắm trời sao.',
        characterId: 'pucky-ca-chep',
        vibe: 'Mộng mơ, trong trẻo và luôn hướng về ước mơ',
      },
    ],
  },
  {
    id: 2,
    question: 'Khi đối diện với những áp lực và bài thi cam go trong cuộc sống, bạn sẽ...',
    context: 'Cách bạn vượt qua thử thách định hình bản lĩnh của bạn.',
    options: [
      {
        text: 'Dùi mài miệt mài, dù thỉnh thoảng có ngủ gật một chút nhưng quyết không buông bút từ bỏ.',
        characterId: 'hacipupu-si-tu',
        vibe: 'Nỗ lực không ngừng nghỉ, hướng tới bảng vàng',
      },
      {
        text: 'Tìm một góc tĩnh lặng, bình tâm quan sát mọi thứ và để mọi xáo động lắng xuống tự nhiên.',
        characterId: 'hirono-tra-da',
        vibe: 'Tĩnh tại, chiêm nghiệm và thích nghi cao',
      },
      {
        text: 'Dùng nụ cười và sự hài hước để hóa giải âu lo, biến khó khăn thành trò chơi thú vị.',
        characterId: 'labubu-chu-teu',
        vibe: 'Tâm thế lạc quan xua tan nghịch cảnh',
      },
      {
        text: 'Tin vào sự thiện lương và lẽ phải, kiên trì tích lũy như hạt sen chờ ngày nở hoa thơm ngát.',
        characterId: 'crybaby-co-tam',
        vibe: 'Bền bỉ, nhân hậu và tái sinh rạng rỡ',
      },
      {
        text: 'Biến thử thách thành sàn diễn sáng tạo, tự tin thể hiện khí chất độc tôn của bản thân.',
        characterId: 'skullpanda-nhat-binh',
        vibe: 'Bản lĩnh kiêu sa và phong thái quý tộc',
      },
      {
        text: 'Nỗ lực bơi ngược dòng nước như cá chép vượt vũ môn để một ngày hóa thành rồng oai vệ.',
        characterId: 'pucky-ca-chep',
        vibe: 'Khát vọng vươn lên tầm cao mới',
      },
      {
        text: 'Giữ tâm hồn trong sáng giản đơn, nặn từng niềm vui nhỏ bé để xoa dịu những âu lo.',
        characterId: 'sweetbean-to-he',
        vibe: 'Hồn nhiên chữa lành mọi vết thương',
      },
    ],
  },
  {
    id: 3,
    question: 'Món đồ chơi hoặc kỷ vật dân gian nào sau đây chạm đến cảm xúc của bạn nhất?',
    context: 'Mỗi kỷ vật văn hóa đều ẩn chứa một thông điệp vô giá.',
    options: [
      {
        text: 'Chiếc đèn ông sao giấy kính màu đỏ vàng rực rỡ dưới ánh trăng rằm tuổi thơ.',
        characterId: 'pucky-ca-chep',
        vibe: 'Ngập tràn ánh sáng hy vọng và ước mơ',
      },
      {
        text: 'Que tò he bột nếp hình chú gà trống dũng mãnh hay bông hoa rực rỡ sắc màu.',
        characterId: 'sweetbean-to-he',
        vibe: 'Tinh hoa thủ công dung dị làng quê',
      },
      {
        text: 'Chiếc quạt mo cau giản dị và nụ cười Chú Tễu múa rối rẽ sóng trên mặt nước.',
        characterId: 'labubu-chu-teu',
        vibe: 'Hồn cốt dân dã Bắc Bộ ngàn năm',
      },
      {
        text: 'Dải cổ áo Nhật Bình thêu chỉ vàng ngũ sắc cùng chiếc trâm ngọc quý phái.',
        characterId: 'skullpanda-nhat-binh',
        vibe: 'Vẻ đẹp di sản hoàng cung đỉnh cao',
      },
      {
        text: 'Ly trà đá mát lạnh cùng chiếc ghế nhựa xanh trên vỉa hè rợp bóng cây cổ thụ.',
        characterId: 'hirono-tra-da',
        vibe: 'Hơi thở cuộc sống đô thị chân thực',
      },
      {
        text: 'Khăn mỏ quạ đen tuyền và đóa sen hồng ngậm sương thơm mát mùa hạ.',
        characterId: 'crybaby-co-tam',
        vibe: 'Nét duyên dáng thanh lịch kinh điển',
      },
      {
        text: 'Nghiên mực tàu, chiếc bút lông tre và cuốn thư tịch cổ ghi lời vàng ý ngọc.',
        characterId: 'hacipupu-si-tu',
        vibe: 'Văn hóa khoa bảng danh giá',
      },
    ],
  },
  {
    id: 4,
    question: 'Phong cách trang phục nào thể hiện đúng nhất cá tính thời trang của bạn?',
    context: 'Thời trang là tuyên ngôn không lời về thế giới quan của bạn.',
    options: [
      {
        text: 'Áo phông rộng oversized, quần túi hộp thoải mái, mang hơi hướng streetwear bụi bặm.',
        characterId: 'hirono-tra-da',
        vibe: 'Tự do, phóng khoáng, không cầu kỳ',
      },
      {
        text: 'Cổ phục cách tân cao cấp, đường cắt sắc sảo, phối màu ấn tượng và chi tiết phát sáng độc đáo.',
        characterId: 'skullpanda-nhat-binh',
        vibe: 'High-fashion, avant-garde, bí ẩn',
      },
      {
        text: 'Áo yếm lụa đào phối khăn nhẹ nhàng, tông màu pastel dịu mắt và chất liệu tự nhiên bay bổng.',
        characterId: 'crybaby-co-tam',
        vibe: 'Nữ tính, thanh tao, đậm chất Á Đông',
      },
      {
        text: 'Trang phục màu sắc tươi tắn, phụ kiện ngộ nghĩnh đáng yêu mang lại nụ cười cho người đối diện.',
        characterId: 'sweetbean-to-he',
        vibe: 'Ngọt ngào, tươi vui, lan tỏa năng lượng tích cực',
      },
      {
        text: 'Đồ linen tối giản, gọn gàng, phong thái thư sinh nho nhã như một học giả phương Đông.',
        characterId: 'hacipupu-si-tu',
        vibe: 'Tri thức, điềm đạm và đáng mến',
      },
      {
        text: 'Phong cách nghịch ngợm, đậm chất lễ hội dân gian với sắc đỏ - vàng bùng nổ cuốn hút.',
        characterId: 'labubu-chu-teu',
        vibe: 'Phá cách, hài hước và giàu sức sống',
      },
      {
        text: 'Trang phục lấp lánh sequin nhẹ hoặc phụ kiện trăng sao huyền ảo, lung linh như truyện cổ.',
        characterId: 'pucky-ca-chep',
        vibe: 'Mộng mơ, kỳ ảo và duy mỹ',
      },
    ],
  },
  {
    id: 5,
    question: 'Triết lý sống nào sau đây là kim chỉ nam cho hành trình của bạn?',
    context: 'Lựa chọn của bạn mở ra chiếc Art Toy định mệnh.',
    options: [
      {
        text: '"Gần bùn mà chẳng hôi tanh mùi bùn" – Giữ gìn sự trong sáng và lòng nhân ái dù cuộc đời bão giông.',
        characterId: 'crybaby-co-tam',
        vibe: 'Thanh bạch và cao đẹp',
      },
      {
        text: '"Một nụ cười bằng mười thang thuốc bổ" – Luôn tìm thấy niềm vui và biến cuộc đời thành sân khấu rực rỡ.',
        characterId: 'labubu-chu-teu',
        vibe: 'Lạc quan và hóm hỉnh',
      },
      {
        text: '"Sống chậm lại, lắng nghe nhiều hơn" – Tận hưởng từng khoảnh khắc giản dị nhất của thực tại.',
        characterId: 'hirono-tra-da',
        vibe: 'Thâm trầm và tự tại',
      },
      {
        text: '"Có công mài sắt, có ngày nên kim" – Kiên định với tri thức và mục tiêu của bản thân.',
        characterId: 'hacipupu-si-tu',
        vibe: 'Hiếu học và kiên trì',
      },
      {
        text: '"Cá chép vượt vũ môn hóa rồng" – Không ngừng vươn xa để chinh phục những chân trời rực rỡ.',
        characterId: 'pucky-ca-chep',
        vibe: 'Khát vọng và bứt phá',
      },
      {
        text: '"Di sản là cội nguồn của sự đổi mới" – Tự hào kế thừa bản sắc và định hình tương lai độc bản.',
        characterId: 'skullpanda-nhat-binh',
        vibe: 'Khí chất hoàng gia và tiên phong',
      },
      {
        text: '"Nuôi dưỡng đứa trẻ bên trong bạn" – Giữ mãi sự ngây thơ, ngọt ngào giữa thế giới người lớn.',
        characterId: 'sweetbean-to-he',
        vibe: 'Trong sáng và yêu thương',
      },
    ],
  },
];
