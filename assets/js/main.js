function pituRender() {

    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    let lastSegment = segments.pop() || "index";

    const currentPageId = lastSegment.replace(".html", "");

    console.log("ID Game thực tế bốc được là:", currentPageId);

    const game = PITU_DATABASE.find(item => item.id === currentPageId);

    if (!game) {
        console.error("Không tìm thấy data cho ID:", currentPageId);
        console.log("Danh sách ID hiện có:", PITU_DATABASE.map(g => g.id));
        return;
    }

    const bannerWrapper = document.querySelector('.game-banner');

    if (bannerWrapper) {
        const actualImg = bannerWrapper.querySelector('img');

        if (actualImg) {
            actualImg.src = game.banner;
            actualImg.alt = game.name + " Banner";
            actualImg.setAttribute('fetchpriority', 'high');
            actualImg.width = 1093;
            actualImg.height = 468;
            actualImg.style.width = "100%";
            actualImg.style.height = "100%";
            actualImg.style.display = "block";
        }
    }

    const previews = document.querySelectorAll('.image-grid img');

    previews.forEach((img, i) => {
        if (game.previews[i]) {
            img.src = game.previews[i];
            img.alt = game.name + " Việt Hóa Screenshot " + (i + 1);
            img.setAttribute('loading', 'lazy');
            img.width = 533;
            img.height = 300;
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.objectFit = "cover";
        }
    });
}

document.addEventListener("DOMContentLoaded", pituRender);

function renderGridImages() {
    // 1. Kiểm tra xem Database có tồn tại không
    if (typeof PITU_DATABASE === "undefined") {
        console.error("LỖI CỰC NẶNG: PITU_DATABASE chưa được nạp vào trang này!");
        return; 
    }

    const gridImages = document.querySelectorAll('.grid-pitu-img');
    console.log("Tìm thấy " + gridImages.length + " ảnh cần load banner.");

    gridImages.forEach(img => {
        const pituId = img.getAttribute('data-pitu');
        
        // Tìm trong mảng
        const game = PITU_DATABASE.find(item => item.id === pituId);
        
        if (game && game.banner) {
            img.src = game.banner;
            img.style.objectFit = "cover";
            // Đánh dấu đã load xong
            img.classList.add('loaded'); 
        } else {
            // Nếu báo lỗi này, nghĩa là ID bốc được (pituId) KHÔNG KHỚP với ID trong Database
            console.warn("Hụt ID: [" + pituId + "]. Check lại database xem có ID này không?");
            img.src = "https://via.placeholder.com/350x200?text=Check+ID+" + pituId;
        }
    });
}

// Gọi hàm ngay và luôn
if (document.readyState === 'complete') {
    renderGridImages();
} else {
    window.addEventListener('load', renderGridImages);
}

// Theo dõi nếu có bài viết mới hiện ra (Dành cho trang Tag)
const observer = new MutationObserver((mutations) => {
    renderGridImages();
});
observer.observe(document.body, { childList: true, subtree: true });
function handleFakePagination() {
    const btn = document.getElementById('btn-load-more');
    // Nếu không thấy nút (tức là đang ở Index), thoát luôn không làm gì cả
    if (!btn) return;
let itemsShown = 21; // Số lượng game hiện mỗi lần
const itemsPerLoad = 21;

function handleFakePagination() {
    const items = document.querySelectorAll('.pitu-item');
    const btn = document.getElementById('btn-load-more');
    
    if (!items.length) return;

    // Hiện số lượng bài đầu tiên
    for (let i = 0; i < itemsShown && i < items.length; i++) {
        items[i].style.display = 'flex';
    }

    // Nếu hiện hết rồi thì ẩn nút Xem thêm
    if (itemsShown >= items.length) {
        if(btn) btn.style.display = 'none';
    }

    // Sự kiện khi bấm nút
    if (btn) {
        btn.onclick = function() {
            let nextMax = itemsShown + itemsPerLoad;
            for (let i = itemsShown; i < nextMax && i < items.length; i++) {
                items[i].style.display = 'flex';
            }
            itemsShown = nextMax;
            
            // Sau khi hiện thêm bài, phải gọi lại hàm bốc ảnh banner
            if (typeof renderGridImages === "function") renderGridImages();

            if (itemsShown >= items.length) {
                btn.style.display = 'none';
            }
        };
    }
}

// Gọi hàm khi load trang
document.addEventListener("DOMContentLoaded", handleFakePagination);
