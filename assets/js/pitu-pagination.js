/* ============================================================
   PITU GAME GRID ENGINE - GIẢI QUYẾT ẢNH & PHÂN TRANG GIẢ
   ============================================================ */

const CONFIG = {
    itemsPerLoad: 21,
    currentShown: 21
};

function initPituEngine() {
    // 1. Kiểm tra Database
    if (typeof PITU_DATABASE === "undefined") {
        console.warn("Đang đợi PITU_DATABASE...");
        setTimeout(initPituEngine, 200);
        return;
    }

    const items = document.querySelectorAll('.pitu-item');
    const btn = document.getElementById('btn-load-more');

    if (items.length === 0) return;

    // 2. Hàm gán ảnh Banner dựa trên pitu_id
    function loadVisibleImages() {
        items.forEach(item => {
            // Chỉ load ảnh cho những Card đang hiển thị (display != none)
            if (window.getComputedStyle(item).display !== 'none') {
                const img = item.querySelector('.grid-pitu-img');
                if (img && img.src.startsWith('data:image')) {
                    const pituId = img.getAttribute('data-pitu');
                    const gameData = PITU_DATABASE.find(g => g.id.trim() === pituId.trim());
                    
                    if (gameData && gameData.banner) {
                        img.src = gameData.banner;
                        img.style.objectFit = "cover";
                    } else {
                        console.warn("Hụt ảnh Banner cho ID:", pituId);
                        img.src = "https://via.placeholder.com/350x200?text=No+Banner";
                    }
                }
            }
        });
    }

    // 3. Logic Hiển thị "Xem thêm"
    function updateDisplay() {
        items.forEach((item, index) => {
            if (index < CONFIG.currentShown) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Ẩn nút nếu đã hiện hết bài
        if (btn) {
            if (CONFIG.currentShown >= items.length) {
                btn.parentElement.style.display = 'none';
            } else {
                btn.parentElement.style.display = 'block';
            }
        }
        
        // Load ảnh cho những thằng vừa hiện
        loadVisibleImages();
    }

    // 4. Bắt sự kiện Click nút (Fix lỗi không bấm được)
    if (btn) {
        // Xóa bỏ onclick cũ nếu có để tránh trùng lặp
        btn.onclick = null; 
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            CONFIG.currentShown += CONFIG.itemsPerLoad;
            updateDisplay();
        });
    }

    // Chạy lần đầu
    updateDisplay();
}

// Khởi chạy khi DOM sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPituEngine);
} else {
    initPituEngine();
}
