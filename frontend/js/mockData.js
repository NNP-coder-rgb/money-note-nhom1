/**
 * Mock Data for TechMarket E-Commerce Platform
 * Task: TF252F3 - Dữ liệu giả sản phẩm điện tử, danh mục, flash sale, thống kê và footer
 */

// Helper tạo thời gian kết thúc flash sale luôn đếm ngược tính từ lúc tải trang
function getFutureISOString(hours = 8, minutes = 45, seconds = 30) {
  const now = new Date();
  const futureTime = new Date(now.getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000);
  return futureTime.toISOString();
}

// 1. Danh mục sản phẩm (5 danh mục điện tử chính)
export const mockCategories = [
  {
    id: "cat-phone",
    name: "Điện thoại",
    slug: "dien-thoai",
    icon: "📱",
    description: "iPhone, Samsung, Xiaomi chính hãng và lướt tuyển chọn"
  },
  {
    id: "cat-laptop",
    name: "Laptop & Mac",
    slug: "laptop-mac",
    icon: "💻",
    description: "MacBook, ThinkPad, Dell XPS văn phòng và gaming"
  },
  {
    id: "cat-audio",
    name: "Tai nghe & Âm thanh",
    slug: "tai-nghe-am-thanh",
    icon: "🎧",
    description: "AirPods, Sony, Marshall chống ồn cao cấp"
  },
  {
    id: "cat-camera",
    name: "Máy ảnh & Ống kính",
    slug: "may-anh-ong-kinh",
    icon: "📷",
    description: "Sony, Canon, Fujifilm cho nhiếp ảnh gia"
  },
  {
    id: "cat-watch",
    name: "Đồng hồ thông minh",
    slug: "dong-ho-thong-minh",
    icon: "⌚",
    description: "Apple Watch, Garmin, Galaxy Watch theo dõi sức khỏe"
  }
];

// Mẫu 15 tiêu chuẩn kiểm định độc quyền dành riêng cho đồ điện tử cũ
const standardInspectionSteps = [
  { step: 1, name: "Ngoại quan & Thân vỏ", status: "passed", note: "Khung sườn nguyên bản, không cấn móp, trầy xước viền cực nhỏ" },
  { step: 2, name: "Màn hình & Cảm ứng", status: "passed", note: "Màn zin chuẩn màu, không điểm chết, cảm ứng mượt mà toàn diện" },
  { step: 3, name: "Tình trạng Pin & Cổng sạc", status: "passed", note: "Dung lượng chuẩn >88%, chu kỳ sạc ổn định, nhận sạc nhanh" },
  { step: 4, name: "Camera trước, sau & OIS", status: "passed", note: "Ống kính trong suốt, lấy nét tự động siêu nhanh, chống rung tốt" },
  { step: 5, name: "Bảo mật & Sinh trắc học", status: "passed", note: "Face ID / Vân tay nhận diện nhạy trong 0.2s" },
  { step: 6, name: "Hệ thống Loa & Micro", status: "passed", note: "Âm thanh nổi stereo tách bạch, micro đàm thoại khử ồn rõ ràng" },
  { step: 7, name: "Mainboard & Linh kiện gốc", status: "passed", note: "Bo mạch nguyên bản, chưa qua sửa chữa, keo kháng ẩm đạt chuẩn" },
  { step: 8, name: "Kết nối Wi-Fi, Bluetooth, 5G", status: "passed", note: "Bắt sóng mạnh, tốc độ truyền tải cao, GPS định vị chính xác" },
  { step: 9, name: "Khay SIM & eSIM", status: "passed", note: "Bản quốc tế vĩnh viễn, nhận 2 SIM ổn định, sóng khỏe" },
  { step: 10, name: "Nút bấm vật lý & Rung", status: "passed", note: "Nút nguồn, âm lượng đàn hồi tốt; motor rung Taptic Engine êm" },
  { step: 11, name: "Cảm biến tiệm cận & Ánh sáng", status: "passed", note: "Tự động tắt màn hình khi áp tai nghe gọi, chỉnh sáng tức thì" },
  { step: 12, name: "Kiểm tra nhiệt độ & Tản nhiệt", status: "passed", note: "Chạy stress test 15 phút nhiệt độ duy trì ổn định < 41°C" },
  { step: 13, name: "Chống nước & Giấy quỳ tím", status: "passed", note: "Giấy quỳ còn nguyên màu trắng, không có dấu hiệu ngấm ẩm" },
  { step: 14, name: "Nguồn & Chu kỳ khởi động", status: "passed", note: "Không khởi động lại bất thường, tắt mở nguồn trơn tru" },
  { step: 15, name: "Khóa bảo mật & Tài khoản", status: "passed", note: "Đã đăng xuất hoàn toàn iCloud / Google / Knox, sẵn sàng active" }
];

// Helper tạo 15 bước kiểm định cho đồ cũ
function createInspection(passedCount = 15, customSerial = "VN-TECH-2026") {
  return standardInspectionSteps.map((item, idx) => ({
    ...item,
    passed: idx < passedCount,
    status: idx < passedCount ? "passed" : "warning",
    note: idx < passedCount ? item.note : "Có vết xước răm nhỏ theo thời gian, không ảnh hưởng chức năng"
  }));
}

// 2. Danh sách 20 sản phẩm điện tử (10 Mới - 10 Cũ chia đều 5 danh mục)
export const mockProducts = [
  // ===================== ĐIỆN THOẠI (4 sản phẩm: 2 mới, 2 cũ) =====================
  {
    id: "prod-phone-001",
    name: "iPhone 15 Pro Max 256GB - Titan Tự Nhiên (Chính Hãng VN/A)",
    type: "new",
    price: 29490000,
    oldPrice: 34990000,
    categoryId: "cat-phone",
    sellerId: "seller-official-apple",
    rating: 4.9,
    reviewCount: 342,
    stock: 25,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Màn hình": "6.7 inch Super Retina XDR OLED 120Hz",
      "Chip": "Apple A17 Pro (3nm)",
      "RAM": "8GB",
      "Bộ nhớ trong": "256GB",
      "Camera chính": "48MP + 12MP + 12MP (Zoom quang 5x)",
      "Pin": "4422 mAh, sạc nhanh 20W"
    }
  },
  {
    id: "prod-phone-002",
    name: "Samsung Galaxy S24 Ultra 512GB - Xám Titan AI",
    type: "new",
    price: 28990000,
    oldPrice: 37490000,
    categoryId: "cat-phone",
    sellerId: "seller-samsung-store",
    rating: 4.8,
    reviewCount: 198,
    stock: 18,
    location: "TP. Hồ Chí Minh",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Màn hình": "6.8 inch Dynamic AMOLED 2X, QHD+, 120Hz",
      "Chip": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM": "12GB",
      "Bộ nhớ trong": "512GB",
      "Camera chính": "200MP + 50MP + 12MP + 10MP (Zoom 100x)",
      "Bút": "S-Pen tích hợp sẵn trong thân máy"
    }
  },
  {
    id: "prod-phone-003",
    name: "iPhone 14 Pro 128GB Tím Deep Purple - Bản Quốc Tế Like New 98%",
    type: "used",
    price: 17890000,
    oldPrice: 24990000,
    categoryId: "cat-phone",
    sellerId: "seller-tech-zone",
    rating: 4.7,
    reviewCount: 89,
    stock: 5,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Màn hình": "6.1 inch Dynamic Island, OLED 120Hz ProMotion",
      "Chip": "Apple A16 Bionic",
      "RAM": "6GB",
      "Bộ nhớ trong": "128GB",
      "Pin thực tế": "91% (Nguyên bản theo máy)"
    },
    conditionPercent: 98,
    serial: "F2LW9881K8",
    verified: true,
    inspectionSteps: createInspection(15, "F2LW9881K8")
  },
  {
    id: "prod-phone-004",
    name: "Samsung Galaxy Z Fold 4 256GB - Đen Phantom 96% Bản Hàn",
    type: "used",
    price: 13990000,
    oldPrice: 22500000,
    categoryId: "cat-phone",
    sellerId: "seller-mobile-vip",
    rating: 4.6,
    reviewCount: 42,
    stock: 3,
    location: "Đà Nẵng",
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Màn hình chính": "7.6 inch QXGA+ Dynamic AMOLED 2X gập",
      "Màn hình phụ": "6.2 inch Dynamic AMOLED 2X",
      "Chip": "Snapdragon 8+ Gen 1",
      "RAM": "12GB",
      "Bản lề": "Gập mở chắc chắn không kêu"
    },
    conditionPercent: 96,
    serial: "SS-ZF4-77312",
    verified: true,
    inspectionSteps: createInspection(14, "SS-ZF4-77312")
  },

  // ===================== LAPTOP & MAC (4 sản phẩm: 2 mới, 2 cũ) =====================
  {
    id: "prod-lap-005",
    name: "MacBook Pro 14 M3 Pro (18GB RAM / 512GB SSD) - Space Black Mới 100%",
    type: "new",
    price: 48990000,
    oldPrice: 52990000,
    categoryId: "cat-laptop",
    sellerId: "seller-official-apple",
    rating: 5.0,
    reviewCount: 86,
    stock: 12,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Vi xử lý": "Apple M3 Pro 11-core CPU, 14-core GPU",
      "RAM": "18GB Unified Memory",
      "Ổ cứng": "512GB SSD siêu tốc",
      "Màn hình": "14.2 inch Liquid Retina XDR 120Hz ProMotion"
    }
  },
  {
    id: "prod-lap-006",
    name: "Dell XPS 14 9440 (Core Ultra 7 155H / 16GB / 1TB / RTX 4050)",
    type: "new",
    price: 43500000,
    oldPrice: 47900000,
    categoryId: "cat-laptop",
    sellerId: "seller-laptop-pro",
    rating: 4.8,
    reviewCount: 54,
    stock: 8,
    location: "TP. Hồ Chí Minh",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Vi xử lý": "Intel Core Ultra 7 155H tích hợp NPU AI",
      "Card đồ họa": "NVIDIA GeForce RTX 4050 6GB GDDR6",
      "RAM": "16GB LPDDR5x 7467MHz",
      "Ổ cứng": "1TB PCIe Gen 4 SSD",
      "Màn hình": "14.5 inch 3.2K OLED 120Hz Touch"
    }
  },
  {
    id: "prod-lap-007",
    name: "MacBook Air M2 13.6 inch (8GB RAM / 256GB SSD) Midnight Like New 99%",
    type: "used",
    price: 18490000,
    oldPrice: 24900000,
    categoryId: "cat-laptop",
    sellerId: "seller-mac-corner",
    rating: 4.9,
    reviewCount: 127,
    stock: 9,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Vi xử lý": "Apple M2 8-core CPU, 8-core GPU",
      "RAM": "8GB Unified Memory",
      "Ổ cứng": "256GB SSD",
      "Số lần sạc": "42 lần, Pin 97%"
    },
    conditionPercent: 99,
    serial: "C02G99AM82",
    verified: true,
    inspectionSteps: createInspection(15, "C02G99AM82")
  },
  {
    id: "prod-lap-008",
    name: "Lenovo ThinkPad X1 Carbon Gen 10 (i7-1260P / 16GB / 512GB) Cũ 97%",
    type: "used",
    price: 16990000,
    oldPrice: 28500000,
    categoryId: "cat-laptop",
    sellerId: "seller-business-laptop",
    rating: 4.7,
    reviewCount: 63,
    stock: 4,
    location: "Hải Phòng",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Vi xử lý": "Intel Core i7-1260P vPro (12 nhân 16 luồng)",
      "RAM": "16GB LPDDR5 5200MHz",
      "Bàn phím": "Hành trình phím trứ danh chống tràn nước",
      "Trọng lượng": "Chỉ 1.12 kg vỏ sợi carbon siêu bền"
    },
    conditionPercent: 97,
    serial: "PF3K88X1C",
    verified: true,
    inspectionSteps: createInspection(15, "PF3K88X1C")
  },

  // ===================== TAI NGHE & ÂM THANH (4 sản phẩm: 2 mới, 2 cũ) =====================
  {
    id: "prod-audio-009",
    name: "Sony WH-1000XM5 - Tai nghe chụp tai chống ồn đỉnh cao (Chính hãng)",
    type: "new",
    price: 7490000,
    oldPrice: 8990000,
    categoryId: "cat-audio",
    sellerId: "seller-sony-store",
    rating: 4.9,
    reviewCount: 412,
    stock: 35,
    location: "TP. Hồ Chí Minh",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Thời lượng pin": "30 giờ liên tục khi bật chống ồn ANC",
      "Khử ồn": "Chip V1 & QN1 điều khiển 8 micro",
      "Codec": "LDAC, AAC, SBC chuẩn Hi-Res Audio Wireless",
      "Trọng lượng": "250g đệm da êm ái"
    }
  },
  {
    id: "prod-audio-010",
    name: "Apple AirPods Pro 2 (USB-C) MagSafe - Nguyên seal Chưa Active",
    type: "new",
    price: 5390000,
    oldPrice: 6190000,
    categoryId: "cat-audio",
    sellerId: "seller-official-apple",
    rating: 4.9,
    reviewCount: 680,
    stock: 50,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Chip xử lý": "Apple H2 cho chất âm vượt trội",
      "Chống ồn": "Chống ồn chủ động gấp 2 lần bản trước",
      "Cổng sạc": "USB-C, MagSafe, sạc Apple Watch",
      "Kháng nước": "IP54 cả tai nghe và hộp sạc"
    }
  },
  {
    id: "prod-audio-011",
    name: "Bose QuietComfort 45 (QC45) Triple Black 95% Zin đẹp",
    type: "used",
    price: 4190000,
    oldPrice: 6990000,
    categoryId: "cat-audio",
    sellerId: "seller-audio-vintage",
    rating: 4.8,
    reviewCount: 78,
    stock: 6,
    location: "Đà Nẵng",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Chống ồn": "Acoustic Noise Cancelling độc quyền Bose",
      "Pin": "Khoảng 22 giờ, sạc 15 phút nghe 3 giờ",
      "Phụ kiện": "Tặng kèm túi đựng cứng và cáp audio 3.5mm"
    },
    conditionPercent: 95,
    serial: "BOSE-QC45-9921",
    verified: true,
    inspectionSteps: createInspection(14, "BOSE-QC45-9921")
  },
  {
    id: "prod-audio-012",
    name: "Marshall Major IV Bluetooth Wireless Headphone Nâu Cũ 98%",
    type: "used",
    price: 2190000,
    oldPrice: 3890000,
    categoryId: "cat-audio",
    sellerId: "seller-indie-sound",
    rating: 4.7,
    reviewCount: 95,
    stock: 8,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Pin": "Kỷ lục 80 giờ chơi nhạc không dây",
      "Sạc": "Hỗ trợ sạc không dây chuẩn Qi",
      "Thiết kế": "Phong cách rock vintage cổ điển sang trọng"
    },
    conditionPercent: 98,
    serial: "MRSH-MJ4-5120",
    verified: true,
    inspectionSteps: createInspection(15, "MRSH-MJ4-5120")
  },

  // ===================== MÁY ẢNH & ỐNG KÍNH (4 sản phẩm: 2 mới, 2 cũ) =====================
  {
    id: "prod-cam-013",
    name: "Sony Alpha A7 IV (ILCE-7M4) Body - Bảo hành chính hãng 24 tháng",
    type: "new",
    price: 53990000,
    oldPrice: 59990000,
    categoryId: "cat-camera",
    sellerId: "seller-sony-store",
    rating: 5.0,
    reviewCount: 67,
    stock: 7,
    location: "TP. Hồ Chí Minh",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Cảm biến": "Full-Frame Exmor R CMOS 33.0 Megapixels",
      "Bộ xử lý": "BIONZ XR thế hệ mới",
      "Quay phim": "4K 60p 10-bit 4:2:2 All-Intra",
      "Lấy nét": "759 điểm theo pha, AI nhận diện mắt chim/thú/người"
    }
  },
  {
    id: "prod-cam-014",
    name: "Fujifilm X-T5 Mirrorless Body Silver - New 100% Box",
    type: "new",
    price: 41500000,
    oldPrice: 44900000,
    categoryId: "cat-camera",
    sellerId: "seller-camera-hub",
    rating: 4.9,
    reviewCount: 43,
    stock: 5,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Cảm biến": "40.2 MP X-Trans CMOS 5 HR",
      "Chống rung": "IBIS 5 trục lên đến 7 stops",
      "Film Simulation": "19 chế độ giả lập màu film huyền thoại",
      "Màn hình": "LCD lật 3 chiều tiện dụng"
    }
  },
  {
    id: "prod-cam-015",
    name: "Canon EOS R6 Body Cũ 97% - Chụp 14k shot sensor sạch đẹp",
    type: "used",
    price: 33490000,
    oldPrice: 48000000,
    categoryId: "cat-camera",
    sellerId: "seller-photo-world",
    rating: 4.8,
    reviewCount: 31,
    stock: 2,
    location: "Cần Thơ",
    images: [
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Cảm biến": "Full-Frame CMOS 20.1 MP",
      "Số shot chụp": "14.280 shots (Màn trập tuổi thọ 300k)",
      "Chống rung": "In-body Image Stabilization 8 stops",
      "Khe cắm": "2 khe cắm thẻ SD UHS-II"
    },
    conditionPercent: 97,
    serial: "CN-R6-880912",
    verified: true,
    inspectionSteps: createInspection(15, "CN-R6-880912")
  },
  {
    id: "prod-cam-016",
    name: "Sony Alpha A6400 kèm Lens Kit 16-50mm OSS 96% Zin tem",
    type: "used",
    price: 13800000,
    oldPrice: 20500000,
    categoryId: "cat-camera",
    sellerId: "seller-vlog-camera",
    rating: 4.7,
    reviewCount: 88,
    stock: 4,
    location: "TP. Hồ Chí Minh",
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Cảm biến": "APS-C Exmor CMOS 24.2 MP",
      "Màn hình": "Lật 180 độ hoàn hảo cho vlogging",
      "Lấy nét": "Real-time Eye AF & Real-time Tracking 0.02s",
      "Tình trạng lens": "Thấu kính đẹp, không mốc rễ tre"
    },
    conditionPercent: 96,
    serial: "SN-A64-11029",
    verified: true,
    inspectionSteps: createInspection(14, "SN-A64-11029")
  },

  // ===================== ĐỒNG HỒ THÔNG MINH (4 sản phẩm: 2 mới, 2 cũ) =====================
  {
    id: "prod-wat-017",
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium Dây Alpine Loop",
    type: "new",
    price: 20490000,
    oldPrice: 22990000,
    categoryId: "cat-watch",
    sellerId: "seller-official-apple",
    rating: 5.0,
    reviewCount: 115,
    stock: 14,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Vỏ & Mặt": "Titanium cấp hàng không vũ trụ, kính Sapphire",
      "Độ sáng": "Màn hình 3000 nits sáng nhất từng có",
      "Pin": "36 giờ dùng thông thường, 72 giờ chế độ tiết kiệm",
      "Độ sâu": "Đo độ sâu lặn chứng nhận EN13319 tới 40m"
    }
  },
  {
    id: "prod-wat-018",
    name: "Samsung Galaxy Watch 6 Classic 47mm LTE Viền xoay vật lý",
    type: "new",
    price: 7890000,
    oldPrice: 9990000,
    categoryId: "cat-watch",
    sellerId: "seller-samsung-store",
    rating: 4.8,
    reviewCount: 92,
    stock: 20,
    location: "TP. Hồ Chí Minh",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Viền bezel": "Vòng xoay vật lý điều khiển mượt mà",
      "Sức khỏe": "Đo điện tâm đồ ECG, huyết áp, phân tích thành phần cơ thể BIA",
      "Kính": "Sapphire Crystal chống trầy xước",
      "Kết nối": "eSIM độc lập nghe gọi không cần điện thoại"
    }
  },
  {
    id: "prod-wat-019",
    name: "Apple Watch Series 8 45mm GPS Nhôm Đen Midnight Cũ 97%",
    type: "used",
    price: 5890000,
    oldPrice: 9490000,
    categoryId: "cat-watch",
    sellerId: "seller-tech-zone",
    rating: 4.8,
    reviewCount: 71,
    stock: 6,
    location: "Hà Nội",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Màn hình": "Retina Always-On OLED sắc nét",
      "Cảm biến": "Cảm biến nhiệt độ cổ tay, phát hiện va chạm xe Car Crash",
      "Pin thực tế": "94% dung lượng đỉnh cao",
      "Phụ kiện": "Tặng kèm dây cao su zin và cáp sạc nhanh Type-C"
    },
    conditionPercent: 97,
    serial: "AP-W8-45-7729",
    verified: true,
    inspectionSteps: createInspection(15, "AP-W8-45-7729")
  },
  {
    id: "prod-wat-020",
    name: "Garmin Fenix 7 Solar Sapphire Titanium Cũ 96% Pin 18 ngày",
    type: "used",
    price: 11990000,
    oldPrice: 19990000,
    categoryId: "cat-watch",
    sellerId: "seller-runner-shop",
    rating: 4.9,
    reviewCount: 56,
    stock: 3,
    location: "Đà Nẵng",
    images: [
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Sạc năng lượng mặt trời": "Kính Power Sapphire nạp pin qua ánh nắng",
      "Pin": "Lên tới 18 - 22 ngày ở chế độ smartwatch",
      "Bản đồ": "Bản đồ Topo đa lục địa chi tiết dẫn đường offline",
      "Chống sốc": "Độ bền quân đội Hoa Kỳ MIL-STD-810G"
    },
    conditionPercent: 96,
    serial: "GRM-FN7-5512",
    verified: true,
    inspectionSteps: createInspection(15, "GRM-FN7-5512")
  }
];

// 3. Danh sách Flash Sale (Giá sốc & endsAt tính động từ lúc nạp trang để đồng hồ luôn đếm ngược)
export const mockFlashSales = [
  {
    productId: "prod-phone-001",
    salePrice: 27990000,
    discountPercent: 20,
    soldCount: 19,
    totalSlot: 25,
    endsAt: getFutureISOString(7, 42, 15)
  },
  {
    productId: "prod-lap-007",
    salePrice: 16990000,
    discountPercent: 32,
    soldCount: 7,
    totalSlot: 9,
    endsAt: getFutureISOString(7, 42, 15)
  },
  {
    productId: "prod-audio-010",
    salePrice: 4890000,
    discountPercent: 21,
    soldCount: 42,
    totalSlot: 50,
    endsAt: getFutureISOString(7, 42, 15)
  },
  {
    productId: "prod-wat-019",
    salePrice: 5190000,
    discountPercent: 45,
    soldCount: 5,
    totalSlot: 6,
    endsAt: getFutureISOString(7, 42, 15)
  }
];

// 4. Số liệu thống kê hiển thị trang chủ
export const mockHomeStats = {
  inspectedDevices: 128450,
  activeSellers: 9820,
  successRate: 99.6,
  inspectionCriteriaCount: 15,
  warrantyDaysGuarantee: 30
};

// 5. Nội dung các cột Footer
export const mockFooterData = {
  company: {
    brandName: "TechMarket",
    slogan: "Sàn giao dịch công nghệ & Thiết bị kiểm định uy tín số 1",
    headquarters: "Tầng 8, Tòa nhà Công nghệ FPT, Cầu Giấy, Hà Nội",
    hotline: "1900 6868 (8:00 - 21:30 hàng ngày)",
    email: "support@techmarket.vn",
    license: "Giấy phép TMĐT số 01088921 do Sở Kế Hoạch & Đầu Tư Hà Nội cấp"
  },
  columns: [
    {
      title: "Về TechMarket",
      links: [
        { label: "Giới thiệu nền tảng", url: "#about" },
        { label: "Quy chế hoạt động sàn", url: "#terms" },
        { label: "Quy trình kiểm định 15 bước", url: "#inspection" },
        { label: "Tuyển dụng chuyên gia phần cứng", url: "#careers" },
        { label: "Tin tức công nghệ", url: "#news" }
      ]
    },
    {
      title: "Chính sách & Bảo hành",
      links: [
        { label: "Bảo hành 1 đổi 1 trong 30 ngày", url: "#warranty-30" },
        { label: "Cam kết hoàn tiền 100% nếu sai mô tả", url: "#refund" },
        { label: "Chính sách kiểm hàng tại chỗ", url: "#shipping-check" },
        { label: "Tiêu chuẩn phân cấp Like New 95-99%", url: "#grading" },
        { label: "Bảo mật thông tin khách hàng", url: "#privacy" }
      ]
    },
    {
      title: "Hỗ trợ khách hàng",
      links: [
        { label: "Trung tâm trợ giúp & FAQ", url: "#faq" },
        { label: "Hướng dẫn mua hàng an toàn", url: "#buyer-guide" },
        { label: "Quy trình mở shop người bán", url: "#seller-guide" },
        { label: "Tra cứu chứng thư kiểm định", url: "#lookup" },
        { label: "Góp ý & Khiếu nại dịch vụ", url: "#feedback" }
      ]
    },
    {
      title: "Phương thức & Đối tác",
      payments: ["Visa / Mastercard", "VNPay-QR", "MoMo", "Chuyển khoản VietQR", "Trả góp 0% Fundiin"],
      certifications: ["Đã thông báo Bộ Công Thương", "Chứng chỉ bảo mật SSL 256-bit", "Đối tác uỷ quyền dịch vụ"],
      socials: [
        { name: "Facebook", icon: "fb", url: "https://facebook.com" },
        { name: "YouTube", icon: "yt", url: "https://youtube.com" },
        { name: "TikTok", icon: "tt", url: "https://tiktok.com" }
      ]
    }
  ]
};
