
// 1. Định dạng tiền Việt Nam
export function formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(amount);
}

// 2. Định dạng ngày tháng
export function formatDate(date) {
    const value = new Date(date);

    if (isNaN(value.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(value);
}

// 3. Hiển thị thông báo
export function toast(message, type = "success") {
    let container = document.getElementById("toast-container");

    // Tạo vùng chứa nếu chưa có
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";

        Object.assign(container.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: "9999"
        });

        document.body.appendChild(container);
    }

    // Tạo thông báo
    const item = document.createElement("div");
    item.textContent = message;

    Object.assign(item.style, {
        background: type === "error" ? "#dc2626" : "#16a34a",
        color: "#fff",
        padding: "12px 20px",
        marginBottom: "10px",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    });

    container.appendChild(item);

    // Tự động xóa sau 3 giây
    setTimeout(() => {item.remove();}, 3000);
}

// 4. Mở modal
export function openModal(modal) {
    const element = typeof modal === "string"
        ? document.querySelector(modal)
        : modal;

    if (!element) {
        console.error("Không tìm thấy modal");
        return;
    }

    element.classList.add("open");
}

// 5. Xác nhận hành động
export function confirm(message) {
    return window.confirm(message);
}

// 6. Đếm ngược thời gian
export function startCountdown(endsAt, element, onEnd) {
    // Chuyển thời gian kết thúc thành mili giây
    const targetTime = new Date(endsAt).getTime();

    // Tìm phần tử HTML cần hiển thị thời gian
    const timerElement = typeof element === "string"
        ? document.querySelector(element)
        : element;

    // Kiểm tra dữ liệu đầu vào
    if (!timerElement || isNaN(targetTime)) {
        console.error("Thời gian hoặc phần tử đếm ngược không hợp lệ");
        return;
    }

    // Biến lưu bộ đếm thời gian
    let timer = null;
    let hasEnded = false;

    // Hàm cập nhật thời gian
    function updateCountdown() {
        const now = Date.now();
        const distance = targetTime - now;

        // Kiểm tra nếu đã hết thời gian
        if (distance <= 0) {
            timerElement.textContent = "00:00:00";

            if (timer !== null) {
                clearInterval(timer);
            }

            // Gọi hàm onEnd khi hết thời gian
            if (!hasEnded) {
                hasEnded = true;

                if (typeof onEnd === "function") {
                    onEnd();
                }
            }

            return;
        }

        // Tính số giờ, phút và giây còn lại
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Hiển thị thời gian theo định dạng HH:MM:SS
        timerElement.textContent = [
            hours,
            minutes,
            seconds
        ].map(value => String(value).padStart(2, "0")).join(":");
    }

    // Cập nhật thời gian ngay lần đầu
    updateCountdown();

    // Tạo bộ đếm nếu thời gian chưa kết thúc
    if (!hasEnded) {
        timer = setInterval(updateCountdown, 1000);
    }

    // Trả về hàm dùng để dừng bộ đếm
    return function stopCountdown() {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    };
}

// 7. Hiển thị số sao đánh giá
export function renderStars(rating) {
    // Giới hạn điểm đánh giá từ 0 đến 5
    rating = Math.max(0, Math.min(5, Number(rating) || 0));

    // Làm tròn điểm đánh giá đến nửa sao gần nhất
    rating = Math.round(rating * 2) / 2;

    // Tính số sao đầy, nửa sao và sao rỗng
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 === 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    // Ghép các loại sao thành chuỗi
    return "★".repeat(fullStars) + (halfStar ? "⯪" : "") + "☆".repeat(emptyStars);
}

// 8. Lọc danh sách sản phẩm
export function filterProducts(list, criteria = {}) {
    return list.filter(product => {
        // Lọc theo loại sản phẩm
        const matchType = !criteria.type
            || criteria.type === "all"
            || product.type === criteria.type;

        // Lọc theo danh mục
        const matchCategory = !criteria.categoryId
            || criteria.categoryId === "all"
            || product.categoryId === criteria.categoryId;

        // Lọc theo từ khóa tìm kiếm
        const searchTerm = String(criteria.searchTerm || "")
            .toLowerCase()
            .trim();

        const productInfo = (
            (product.name || "") + " "
            + (product.location || "") + " "
            + (product.serial || "")
        ).toLowerCase();

        const matchSearch = productInfo.includes(searchTerm);

        // Lọc theo giá thấp nhất
        const minPrice = criteria.minPrice === undefined
            || criteria.minPrice === ""
            ? null
            : Number(criteria.minPrice);

        const matchMinPrice = minPrice === null
            || (Number.isFinite(minPrice) && product.price >= minPrice);

        // Lọc theo giá cao nhất
        const maxPrice = criteria.maxPrice === undefined
            || criteria.maxPrice === ""
            ? null
            : Number(criteria.maxPrice);

        const matchMaxPrice = maxPrice === null
            || (Number.isFinite(maxPrice) && product.price <= maxPrice);

        // Chỉ giữ sản phẩm thỏa mãn tất cả điều kiện
        return matchType
            && matchCategory
            && matchSearch
            && matchMinPrice
            && matchMaxPrice;
    });
}

// 9. Sắp xếp danh sách sản phẩm
export function sortProducts(list, key) {
    // Tạo bản sao để không làm thay đổi danh sách ban đầu
    const products = [...list];

    // Sắp xếp theo giá từ thấp đến cao
    if (key === "price-asc") {
        return products.sort((a, b) =>
            (Number(a.price) || 0) - (Number(b.price) || 0)
        );
    }

    // Sắp xếp theo giá từ cao đến thấp
    if (key === "price-desc") {
        return products.sort((a, b) =>
            (Number(b.price) || 0) - (Number(a.price) || 0)
        );
    }

    // Sắp xếp theo đánh giá từ cao đến thấp
    if (key === "rating-desc") {
        return products.sort((a, b) =>
            (Number(b.rating) || 0) - (Number(a.rating) || 0)
        );
    }

    // Nếu không có kiểu sắp xếp phù hợp, giữ nguyên thứ tự
    return products;
}


// 10. Phân trang danh sách sản phẩm
export function paginate(list, page, size) {
    // Đảm bảo số trang và số sản phẩm mỗi trang hợp lệ
    page = Math.max(1, Math.floor(Number(page) || 1));
    size = Math.max(1, Math.floor(Number(size) || 1));

    // Tổng số sản phẩm
    const total = list.length;

    // Tính tổng số trang
    const totalPages = Math.ceil(total / size);

    // Đảm bảo trang hiện tại không vượt quá tổng số trang
    page = Math.min(page, Math.max(1, totalPages));

    // Tính vị trí bắt đầu và kết thúc
    const start = (page - 1) * size;
    const end = start + size;

    // Lấy danh sách sản phẩm của trang hiện tại
    const items = list.slice(start, end);

    // Trả về kết quả phân trang
    return {
        items,
        page,
        totalPages,
        total
    };
}