/**
 * Application Core Logic - TechMarket
 * Task: TF252F3 - Xử lý hiển thị Trang chủ, Flash Sale, Catalog và Tiêu chuẩn Kiểm định
 */

import {
  mockCategories,
  mockProducts,
  mockFlashSales,
  mockHomeStats,
  mockFooterData
} from "./mockData.js";

// State quản lý bộ lọc
let currentTypeFilter = "all"; // 'all' | 'new' | 'used'
let currentCategoryFilter = null;
let currentSearchTerm = "";
let currentSort = "default";

// Định dạng tiền tệ VNĐ
function formatVND(num) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
}

// Fallback ảnh placeholder SVG nếu mất kết nối internet
function getSvgPlaceholder(text = "Tech Device") {
  return `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22bold%22%20fill%3D%22%2364748b%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3E${encodeURIComponent(text)}%3C%2Ftext%3E%3C%2Fsvg%3E`;
}

// 1. Render Thống Kê Trang Chủ (Mục 5)
function renderHomeStats() {
  const container = document.getElementById("homeStatsContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="stat-item">
      <div class="stat-icon">🛡️</div>
      <div>
        <div class="stat-num">${mockHomeStats.inspectedDevices.toLocaleString("vi-VN")}+</div>
        <div class="stat-label">Thiết bị đã kiểm định thành công</div>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">🏪</div>
      <div>
        <div class="stat-num">${mockHomeStats.activeSellers.toLocaleString("vi-VN")}+</div>
        <div class="stat-label">Người bán công nghệ uy tín</div>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">⭐</div>
      <div>
        <div class="stat-num">${mockHomeStats.successRate}%</div>
        <div class="stat-label">Tỉ lệ giao dịch thành công</div>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">✅</div>
      <div>
        <div class="stat-num">${mockHomeStats.inspectionCriteriaCount} Bước</div>
        <div class="stat-label">Tiêu chuẩn kiểm định độc quyền</div>
      </div>
    </div>
  `;
}

// 2. Render Danh mục sản phẩm (Mục 1)
function renderCategories() {
  const container = document.getElementById("categoriesContainer");
  if (!container) return;

  container.innerHTML = mockCategories.map(cat => `
    <div class="category-card ${currentCategoryFilter === cat.id ? "active" : ""}" data-category-id="${cat.id}">
      <span class="category-icon">${cat.icon}</span>
      <div>
        <div class="category-name">${cat.name}</div>
        <div class="category-desc">${cat.description.substring(0, 32)}...</div>
      </div>
    </div>
  `).join("");

  // Bắt sự kiện chọn danh mục để lọc catalog
  container.querySelectorAll(".category-card").forEach(el => {
    el.addEventListener("click", () => {
      const catId = el.getAttribute("data-category-id");
      currentCategoryFilter = currentCategoryFilter === catId ? null : catId;
      renderCategories();
      renderCatalog();
    });
  });
}

// 3. Render Flash Sale & Đồng hồ đếm ngược (Mục 4)
function renderFlashSales() {
  const container = document.getElementById("flashSaleContainer");
  if (!container) return;

  const cardsHtml = mockFlashSales.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    if (!product) return "";

    const percentSold = Math.round((item.soldCount / item.totalSlot) * 100);

    return `
      <div class="product-card">
        <div class="product-img-box">
          <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='${getSvgPlaceholder(product.name)}'">
          <span class="product-badge-type badge-new" style="background: #fee2e2; color: #dc2626; border-color: #fca5a5;">
            ⚡ GIẢM ${item.discountPercent}%
          </span>
        </div>
        <div class="product-body">
          <h3 class="product-title" title="${product.name}">${product.name}</h3>
          
          <div class="product-meta">
            <span class="meta-rating">★ ${product.rating}</span>
            <span>📍 ${product.location}</span>
          </div>

          <div style="margin-bottom: 10px;">
            <div style="font-size: 0.74rem; color: #dc2626; font-weight: 700; margin-bottom: 4px;">
              ĐÃ BÁN ${item.soldCount}/${item.totalSlot} SẢN PHẨM
            </div>
            <div style="background: #fee2e2; border-radius: 9999px; height: 6px; overflow: hidden;">
              <div style="background: #ef4444; width: ${percentSold}%; height: 100%;"></div>
            </div>
          </div>

          <div class="product-pricing">
            <span class="price-current">${formatVND(item.salePrice)}</span>
            <span class="price-old">${formatVND(product.oldPrice)}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = cardsHtml;

  // Khởi động đồng hồ đếm ngược liên tục
  startCountdown(mockFlashSales[0].endsAt);
}

function startCountdown(targetISOString) {
  const targetDate = new Date(targetISOString).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById("timerHours").innerText = "00";
      document.getElementById("timerMinutes").innerText = "00";
      document.getElementById("timerSeconds").innerText = "00";
      return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");
    document.getElementById("timerHours").innerText = pad(hours);
    document.getElementById("timerMinutes").innerText = pad(minutes);
    document.getElementById("timerSeconds").innerText = pad(seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// 4. Render Catalog Sản Phẩm (Mục 1, 2, 3)
function renderCatalog() {
  const container = document.getElementById("catalogContainer");
  const countBadge = document.getElementById("productCountBadge");
  if (!container) return;

  // Lọc sản phẩm
  let filtered = [...mockProducts];

  // Lọc theo loại (new / used)
  if (currentTypeFilter !== "all") {
    filtered = filtered.filter(p => p.type === currentTypeFilter);
  }

  // Lọc theo danh mục
  if (currentCategoryFilter) {
    filtered = filtered.filter(p => p.categoryId === currentCategoryFilter);
  }

  // Lọc theo tìm kiếm
  if (currentSearchTerm.trim() !== "") {
    const term = currentSearchTerm.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term) ||
      (p.serial && p.serial.toLowerCase().includes(term))
    );
  }

  // Sắp xếp
  if (currentSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating-desc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Cập nhật số lượng
  if (countBadge) {
    countBadge.innerText = `Hiển thị ${filtered.length} / ${mockProducts.length} sản phẩm`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🔍</div>
        <h4 style="font-size: 1.1rem; color: #475569;">Không tìm thấy sản phẩm phù hợp</h4>
        <p style="color: #94a3b8; font-size: 0.88rem; margin-top: 4px;">Hãy thử xóa bộ lọc hoặc tìm kiếm từ khóa khác.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isUsed = product.type === "used";
    const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

    // Lấy 2 specs tiêu biểu hiển thị pill
    const specsEntries = Object.entries(product.specs || {}).slice(0, 3);

    return `
      <div class="product-card">
        <div class="product-img-box">
          <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='${getSvgPlaceholder(product.name)}'">
          
          <span class="product-badge-type ${isUsed ? "badge-used" : "badge-new"}">
            ${isUsed ? `Cũ ${product.conditionPercent}%` : "Mới 100%"}
          </span>

          ${isUsed && product.verified ? `
            <span class="badge-verified-flag" title="Đã qua 15 bước kiểm định kỹ thuật">
              🛡️ Đã kiểm định
            </span>
          ` : ""}
        </div>

        <div class="product-body">
          <h3 class="product-title" title="${product.name}">${product.name}</h3>

          <div class="product-meta">
            <span class="meta-rating">★ ${product.rating}</span>
            <span>(${product.reviewCount} đánh giá)</span>
            <span>📍 ${product.location}</span>
          </div>

          <div class="product-specs-pills">
            ${specsEntries.map(([k, v]) => `
              <span class="spec-pill" title="${k}: ${v}"><strong>${k}:</strong> ${v}</span>
            `).join("")}
          </div>

          <div class="product-pricing">
            <span class="price-current">${formatVND(product.price)}</span>
            <span class="price-old">${formatVND(product.oldPrice)}</span>
            <span class="price-discount">-${discount}%</span>
          </div>

          <div class="product-footer-actions">
            ${isUsed ? `
              <button class="btn-inspect-view btn-open-modal" data-product-id="${product.id}">
                🛡️ Xem 15 bước kiểm định
              </button>
            ` : `
              <button class="btn-inspect-view" style="background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe;" onclick="alert('Đã thêm ${product.name} vào giỏ hàng!')">
                🛒 Mua ngay
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Bắt sự kiện mở modal kiểm định cho đồ cũ
  container.querySelectorAll(".btn-open-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      const prodId = btn.getAttribute("data-product-id");
      openInspectionModal(prodId);
    });
  });
}

// 5. Modal Xem Chi Tiết 15 Bước Kiểm Định (Mục 3)
function openInspectionModal(productId) {
  const product = mockProducts.find(p => p.id === productId);
  if (!product || !product.inspectionSteps) return;

  const modal = document.getElementById("inspectionModal");
  document.getElementById("modalProductName").innerText = product.name;
  document.getElementById("modalSerial").innerText = product.serial || "N/A";
  document.getElementById("modalCondition").innerText = `${product.conditionPercent}% Like New`;

  const stepsList = document.getElementById("modalStepsList");
  stepsList.innerHTML = product.inspectionSteps.map(step => `
    <div class="step-row ${step.status === "warning" ? "warning" : ""}">
      <span class="step-number">${step.step}</span>
      <div class="step-info">
        <div class="step-title">
          <span>${step.passed ? "✅ ĐẠT" : "⚠️ LƯU Ý"}: ${step.name}</span>
        </div>
        <div class="step-note">${step.note}</div>
      </div>
    </div>
  `).join("");

  modal.classList.add("open");
}

function initModalHandlers() {
  const modal = document.getElementById("inspectionModal");
  const closeBtn = document.getElementById("modalCloseBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  }
}

// 6. Render Footer Toàn Diện (Mục 5)
function renderFooter() {
  const container = document.getElementById("footerTopContainer");
  if (!container) return;

  const { company, columns } = mockFooterData;

  container.innerHTML = `
    <div class="footer-brand">
      <h3>⚡ ${company.brandName}</h3>
      <p>${company.slogan}</p>
      <div class="footer-contact-item">📍 ${company.headquarters}</div>
      <div class="footer-contact-item">📞 Hotline: <strong>${company.hotline}</strong></div>
      <div class="footer-contact-item">✉️ Email: <strong>${company.email}</strong></div>
      <div style="font-size: 0.76rem; color: #64748b; margin-top: 8px;">${company.license}</div>
    </div>

    ${columns.map(col => `
      <div class="footer-col">
        <h4>${col.title}</h4>
        ${col.links ? `
          <ul class="footer-links">
            ${col.links.map(l => `<li><a href="${l.url}">${l.label}</a></li>`).join("")}
          </ul>
        ` : ""}
        ${col.payments ? `
          <div style="font-size: 0.82rem; color: #94a3b8; margin-bottom: 8px;">Phương thức thanh toán:</div>
          <div class="footer-pills">
            ${col.payments.map(p => `<span class="footer-pill">${p}</span>`).join("")}
          </div>
          <div style="font-size: 0.82rem; color: #94a3b8; margin: 12px 0 6px 0;">Chứng nhận an toàn:</div>
          <div class="footer-pills">
            ${col.certifications.map(c => `<span class="footer-pill" style="color: #38bdf8;">✓ ${c}</span>`).join("")}
          </div>
        ` : ""}
      </div>
    `).join("")}
  `;
}

// 7. Gắn các sự kiện điều khiển UI
function initControls() {
  // Tabs lọc: Tất cả / Mới / Cũ
  const tabs = document.querySelectorAll("#typeFilterTabs .tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentTypeFilter = tab.getAttribute("data-type");
      renderCatalog();
    });
  });

  // Nút Lọc nhanh Hàng kiểm định trên header
  const btnFilterUsed = document.getElementById("btnFilterUsed");
  if (btnFilterUsed) {
    btnFilterUsed.addEventListener("click", () => {
      tabs.forEach(t => {
        if (t.getAttribute("data-type") === "used") {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });
      currentTypeFilter = "used";
      renderCatalog();
      window.scrollTo({ top: document.querySelector(".catalog-section").offsetTop - 80, behavior: "smooth" });
    });
  }

  // Sắp xếp
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Tìm kiếm
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value;
      renderCatalog();
    });
  }
}

// Khởi chạy ứng dụng
document.addEventListener("DOMContentLoaded", () => {
  renderHomeStats();
  renderCategories();
  renderFlashSales();
  renderCatalog();
  renderFooter();
  initControls();
  initModalHandlers();
});
