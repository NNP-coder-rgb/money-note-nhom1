# TechMarket - Sàn Giao Dịch Đồ Điện Tử & Thiết Bị Kiểm Định (Sprint 1)

> **Mã Task:** `TF252F3`  
> **Người thực hiện:** Chu Đình Minh (PTIT-HN-047)  
> **Nhánh:** `feature/tf252f3-mock-data`

---

## 📌 1. Mục tiêu & Tiêu chí chấp nhận (Acceptance Criteria)
- Cung cấp toàn bộ dữ liệu giả lập (mock data) về sản phẩm điện tử, danh mục, flash sale, số liệu thống kê trang chủ và footer để đội ngũ developer dựng và kiểm tra giao diện khi chưa có backend.
- **Tiêu chí nghiệm thu:** Trang chủ và catalog có đầy đủ dữ liệu để hiển thị trực quan mà không phải nhập tay thêm bất kỳ dữ liệu nào.

---

## 📋 2. Chi tiết các hạng mục đã hoàn thành

### 1. Danh mục & Sản phẩm điện tử (~20 sản phẩm chia đều mới/cũ)
- **Bỏ dữ liệu cũ** (rau củ, thịt cá), thay thế toàn bộ bằng 5 danh mục công nghệ cốt lõi:
  1. `cat-phone`: Điện thoại (iPhone 15 Pro Max, Galaxy S24 Ultra, iPhone 14 Pro 98%, Galaxy Z Fold 4 96%)
  2. `cat-laptop`: Laptop & Mac (MacBook Pro M3 Pro, Dell XPS 14, MacBook Air M2 99%, ThinkPad X1 Carbon 97%)
  3. `cat-audio`: Tai nghe & Âm thanh (Sony WH-1000XM5, AirPods Pro 2, Bose QC45 95%, Marshall Major IV 98%)
  4. `cat-camera`: Máy ảnh & Ống kính (Sony A7 IV, Fujifilm X-T5, Canon EOS R6 97%, Sony A6400 96%)
  5. `cat-watch`: Đồng hồ thông minh (Apple Watch Ultra 2, Galaxy Watch 6 Classic, Apple Watch Series 8 97%, Garmin Fenix 7 96%)
- Tổng cộng **20 sản phẩm** chia đều **10 sản phẩm Mới (New 100%)** và **10 sản phẩm Cũ (Used Like New)**.

### 2. Cấu trúc trường dữ liệu của từng sản phẩm
Mỗi sản phẩm có đầy đủ các trường:
- `id`: Mã định danh duy nhất (VD: `prod-phone-001`)
- `name`: Tên sản phẩm chi tiết
- `type`: `"new"` | `"used"`
- `price`: Giá bán hiện tại (VNĐ)
- `oldPrice`: Giá niêm yết cũ (VNĐ)
- `categoryId`: Mã danh mục liên kết
- `sellerId`: Mã định danh người bán
- `rating`: Đánh giá trung bình sao (1.0 - 5.0)
- `reviewCount`: Số lượng lượt đánh giá
- `stock`: Số lượng tồn kho
- `location`: Khu vực người bán (Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ, Hải Phòng)
- `images`: Mảng URL ảnh đại diện chất lượng cao (có fallback SVG an toàn)
- `specs`: Object thông số kỹ thuật chi tiết

### 3. Dữ liệu chuyên biệt cho Đồ Cũ (Used)
- `conditionPercent`: Tỷ lệ độ mới (95% - 99%)
- `serial`: Số serial phần cứng định danh máy
- `verified`: `true` (chứng chỉ bảo chứng kiểm định)
- `inspectionSteps`: **Đầy đủ 15 tiêu chí kiểm định phần cứng chuyên sâu**:
  1. Ngoại quan & Thân vỏ
  2. Màn hình & Cảm ứng
  3. Tình trạng Pin & Cổng sạc
  4. Camera trước, sau & OIS
  5. Bảo mật & Sinh trắc học (Face ID / Vân tay)
  6. Hệ thống Loa & Micro
  7. Mainboard & Linh kiện gốc
  8. Kết nối Wi-Fi, Bluetooth, 5G
  9. Khay SIM & eSIM
  10. Nút bấm vật lý & Rung
  11. Cảm biến tiệm cận & Ánh sáng
  12. Kiểm tra nhiệt độ & Tản nhiệt
  13. Chống nước & Giấy quỳ tím
  14. Nguồn & Chu kỳ khởi động
  15. Khóa bảo mật & Tài khoản (iCloud / Knox sạch)

### 4. Danh sách Flash Sale & Countdown Timer
- `productId`, `salePrice`, `discountPercent`, `soldCount`, `totalSlot`.
- `endsAt`: Được tính động từ thời điểm tải trang (`Date.now() + 8 giờ 45 phút`), giúp đồng hồ đếm ngược luôn luôn chạy trực quan trong suốt quá trình demo / review.

### 5. Số liệu Trang chủ & Cột Footer
- **Thống kê trang chủ:** Số thiết bị đã kiểm định (`128,450+`), Người bán uy tín (`9,820+`), Tỉ lệ thành công (`99.6%`), Quy trình 15 bước.
- **Footer:** Đầy đủ thông tin thương hiệu, 4 cột điều hướng: *Về TechMarket*, *Chính sách & Bảo hành*, *Hỗ trợ khách hàng*, *Phương thức thanh toán & Chứng nhận an toàn*.

---

## 💻 3. Hướng dẫn chạy thử giao diện
Chỉ cần mở file `frontend/index.html` trong trình duyệt hoặc sử dụng bất kỳ HTTP Server tĩnh nào:

```bash
# Cách 1: Sử dụng Python HTTP server
cd frontend
python -m http.server 3000

# Sau đó mở trình duyệt tại: http://localhost:3000
```
