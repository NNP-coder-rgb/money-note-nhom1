-- Dữ liệu mẫu (Seed Data) cho TechMarket
-- Task: TF252F3 - Dữ liệu sản phẩm điện tử, danh mục, flash sale

-- 1. Insert Categories
INSERT INTO categories (id, name, slug, icon, description) VALUES
('cat-phone', 'Điện thoại', 'dien-thoai', '📱', 'iPhone, Samsung, Xiaomi chính hãng và lướt tuyển chọn'),
('cat-laptop', 'Laptop & Mac', 'laptop-mac', '💻', 'MacBook, ThinkPad, Dell XPS văn phòng và gaming'),
('cat-audio', 'Tai nghe & Âm thanh', 'tai-nghe-am-thanh', '🎧', 'AirPods, Sony, Marshall chống ồn cao cấp'),
('cat-camera', 'Máy ảnh & Ống kính', 'may-anh-ong-kinh', '📷', 'Sony, Canon, Fujifilm cho nhiếp ảnh gia'),
('cat-watch', 'Đồng hồ thông minh', 'dong-ho-thong-minh', '⌚', 'Apple Watch, Garmin, Galaxy Watch theo dõi sức khỏe')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Products (Sample New & Used Electronics)
INSERT INTO products (id, name, type, price, old_price, category_id, seller_id, rating, review_count, stock, location, condition_percent, serial, verified) VALUES
('prod-phone-001', 'iPhone 15 Pro Max 256GB - Titan Tự Nhiên (Chính Hãng VN/A)', 'new', 29490000, 34990000, 'cat-phone', 'seller-official-apple', 4.9, 342, 25, 'Hà Nội', NULL, NULL, FALSE),
('prod-phone-002', 'Samsung Galaxy S24 Ultra 512GB - Xám Titan AI', 'new', 28990000, 37490000, 'cat-phone', 'seller-samsung-store', 4.8, 198, 18, 'TP. Hồ Chí Minh', NULL, NULL, FALSE),
('prod-phone-003', 'iPhone 14 Pro 128GB Tím Deep Purple - Bản Quốc Tế Like New 98%', 'used', 17890000, 24990000, 'cat-phone', 'seller-tech-zone', 4.7, 89, 5, 'Hà Nội', 98, 'F2LW9881K8', TRUE),
('prod-phone-004', 'Samsung Galaxy Z Fold 4 256GB - Đen Phantom 96% Bản Hàn', 'used', 13990000, 22500000, 'cat-phone', 'seller-mobile-vip', 4.6, 42, 3, 'Đà Nẵng', 96, 'SS-ZF4-77312', TRUE),
('prod-lap-005', 'MacBook Pro 14 M3 Pro (18GB RAM / 512GB SSD) Space Black', 'new', 48990000, 52990000, 'cat-laptop', 'seller-official-apple', 5.0, 86, 12, 'Hà Nội', NULL, NULL, FALSE),
('prod-lap-006', 'Dell XPS 14 9440 (Core Ultra 7 155H / 16GB / 1TB / RTX 4050)', 'new', 43500000, 47900000, 'cat-laptop', 'seller-laptop-pro', 4.8, 54, 8, 'TP. Hồ Chí Minh', NULL, NULL, FALSE),
('prod-lap-007', 'MacBook Air M2 13.6 inch (8GB RAM / 256GB SSD) Like New 99%', 'used', 18490000, 24900000, 'cat-laptop', 'seller-mac-corner', 4.9, 127, 9, 'Hà Nội', 99, 'C02G99AM82', TRUE),
('prod-lap-008', 'Lenovo ThinkPad X1 Carbon Gen 10 (i7-1260P / 16GB / 512GB) Cũ 97%', 'used', 16990000, 28500000, 'cat-laptop', 'seller-business-laptop', 4.7, 63, 4, 'Hải Phòng', 97, 'PF3K88X1C', TRUE),
('prod-audio-009', 'Sony WH-1000XM5 - Tai nghe chụp tai chống ồn đỉnh cao', 'new', 7490000, 8990000, 'cat-audio', 'seller-sony-store', 4.9, 412, 35, 'TP. Hồ Chí Minh', NULL, NULL, FALSE),
('prod-audio-010', 'Apple AirPods Pro 2 (USB-C) MagSafe - Nguyên seal Chưa Active', 'new', 5390000, 6190000, 'cat-audio', 'seller-official-apple', 4.9, 680, 50, 'Hà Nội', NULL, NULL, FALSE),
('prod-audio-011', 'Bose QuietComfort 45 (QC45) Triple Black 95% Zin đẹp', 'used', 4190000, 6990000, 'cat-audio', 'seller-audio-vintage', 4.8, 78, 6, 'Đà Nẵng', 95, 'BOSE-QC45-9921', TRUE),
('prod-audio-012', 'Marshall Major IV Bluetooth Wireless Headphone Nâu Cũ 98%', 'used', 2190000, 3890000, 'cat-audio', 'seller-indie-sound', 4.7, 95, 8, 'Hà Nội', 98, 'MRSH-MJ4-5120', TRUE),
('prod-cam-013', 'Sony Alpha A7 IV (ILCE-7M4) Body - Chính hãng', 'new', 53990000, 59990000, 'cat-camera', 'seller-sony-store', 5.0, 67, 7, 'TP. Hồ Chí Minh', NULL, NULL, FALSE),
('prod-cam-014', 'Fujifilm X-T5 Mirrorless Body Silver - New 100% Box', 'new', 41500000, 44900000, 'cat-camera', 'seller-camera-hub', 4.9, 43, 5, 'Hà Nội', NULL, NULL, FALSE),
('prod-cam-015', 'Canon EOS R6 Body Cũ 97% - Chụp 14k shot sensor sạch đẹp', 'used', 33490000, 48000000, 'cat-camera', 'seller-photo-world', 4.8, 31, 2, 'Cần Thơ', 97, 'CN-R6-880912', TRUE),
('prod-cam-016', 'Sony Alpha A6400 kèm Lens Kit 16-50mm OSS 96% Zin tem', 'used', 13800000, 20500000, 'cat-camera', 'seller-vlog-camera', 4.7, 88, 4, 'TP. Hồ Chí Minh', 96, 'SN-A64-11029', TRUE),
('prod-wat-017', 'Apple Watch Ultra 2 GPS + Cellular 49mm Titanium Dây Alpine Loop', 'new', 20490000, 22990000, 'cat-watch', 'seller-official-apple', 5.0, 115, 14, 'Hà Nội', NULL, NULL, FALSE),
('prod-wat-018', 'Samsung Galaxy Watch 6 Classic 47mm LTE Viền xoay vật lý', 'new', 7890000, 9990000, 'cat-watch', 'seller-samsung-store', 4.8, 92, 20, 'TP. Hồ Chí Minh', NULL, NULL, FALSE),
('prod-wat-019', 'Apple Watch Series 8 45mm GPS Nhôm Đen Midnight Cũ 97%', 'used', 5890000, 9490000, 'cat-watch', 'seller-tech-zone', 4.8, 71, 6, 'Hà Nội', 97, 'AP-W8-45-7729', TRUE),
('prod-wat-020', 'Garmin Fenix 7 Solar Sapphire Titanium Cũ 96% Pin 18 ngày', 'used', 11990000, 19990000, 'cat-watch', 'seller-runner-shop', 4.9, 56, 3, 'Đà Nẵng', 96, 'GRM-FN7-5512', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Flash Sales (Thời hạn 8 tiếng tới)
INSERT INTO flash_sales (product_id, sale_price, discount_percent, sold_count, total_slot, ends_at) VALUES
('prod-phone-001', 27990000, 20, 19, 25, NOW() + INTERVAL '8 hours'),
('prod-lap-007', 16990000, 32, 7, 9, NOW() + INTERVAL '8 hours'),
('prod-audio-010', 4890000, 21, 42, 50, NOW() + INTERVAL '8 hours'),
('prod-wat-019', 5190000, 45, 5, 6, NOW() + INTERVAL '8 hours');
