/* ============================================================
   PITU GAME ENGINE - CHỐT HẠ FIX LỖI DATABASE
   ============================================================ */

// 1. Hàm Render Ảnh cho TRANG BÀI VIẾT (Banner & Previews)
function pituRender() {
    // Đợi Database sẵn sàng
    if (typeof PITU_DATABASE === "undefined") {
        setTimeout(pituRender, 100);
        return;
    }

    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    let lastSegment = segments.pop() || "index";
    
    // Bốc ID từ URL, loại bỏ .html
    const currentPageId = lastSegment.replace(".html", "").trim();

    // Tìm game trong Database (Dùng trim() để tránh lỗi khoảng trắng)
    const game = PITU_DATABASE.find(item => item.id.trim() === currentPageId);

    if (!game) {
        console.warn("Không tìm thấy data cho ID bài viết:", currentPageId);
        return;
    }

    // Load Banner chính
    const bannerImg = document.querySelector('.game-banner img');
    if (bannerImg && game.banner) {
        bannerImg.src = game.banner;
        bannerImg.alt = (game.name || "Game") + " Banner";
        bannerImg.style.display = "block";
        bannerImg.style.width = "100%";
        bannerImg.style.height = "100%";
        bannerImg.style.objectFit = "cover";
    }

    // Load ảnh Screenshots (Previews)
    const previews = document.querySelectorAll('.image-grid img');
    if (game.previews && previews.length > 0) {
        previews.forEach((img, i) => {
            if (game.previews[i]) {
                img.src = game.previews[i];
                img.style.width = "100%";
                img.style.height = "auto";
                img.style.objectFit = "cover";
            }
        });
    }
}

// 2. Hàm Render Ảnh cho TRANG CHỦ & TRANG TAG (Grid)
function renderGridImages() {
    if (typeof PITU_DATABASE === "undefined") {
        setTimeout(renderGridImages, 100);
        return;
    }

    const gridImages = document.querySelectorAll('.grid-pitu-img');
    
    gridImages.forEach(img => {
        const pituId = img.getAttribute('data-pitu');
        if (!pituId) return;

        const game = PITU_DATABASE.find(item => item.id.trim() === pituId.trim());
        
        if (game && game.banner) {
            img.src = game.banner;
            img.style.objectFit = "cover";
            img.classList.add('loaded'); 
        } else {
            console.warn("Hụt ID Grid:", pituId);
            img.src = "https://via.placeholder.com/350x200?text=Check+ID+" + pituId;
        }
    });
}

// ============================================================
// KHỞI CHẠY (EXECUTION)
// ============================================================

// Chạy khi toàn bộ tài nguyên (bao gồm cả file Database lớn) load xong
window.addEventListener('load', () => {
    pituRender();
    renderGridImages();
});

// Quan sát thay đổi DOM (Dành cho Infinite Scroll / Tag filtering)
const observer = new MutationObserver(() => {
    renderGridImages();
});
observer.observe(document.body, { childList: true, subtree: true });
