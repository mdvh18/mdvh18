function pituRender() {
    // 1. Lấy toàn bộ đường dẫn, lọc bỏ các phần rỗng
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    
    // 2. Lấy phần tử cuối cùng (chính là 'agoat')
    let filename = pathSegments.pop() || "index";
    
    // 3. Xử lý xóa đuôi .html nếu lỡ còn sót lại
    const currentPageId = filename.replace(".html", "");
    
    console.log("ID Game chốt hạ:", currentPageId);

    // 4. Tìm trong Database (PITU_DATABASE)
    const game = PITU_DATABASE.find(item => item.id === currentPageId);
    
    if (!game) {
        console.error("Lỗi: Không tìm thấy game có ID '" + currentPageId + "' trong pitumdgame.js");
        return;
    }

    // ... (Phần đổ ảnh Banner và Previews giữ nguyên) ...
}
    // 3. Đổ Banner
    // --- CÁCH 2: TÌM THẺ IMG BÊN TRONG CLASS GAME-BANNER ---
    const bannerWrapper = document.querySelector('.game-banner');
    if (bannerWrapper) {
        // Tìm thẻ img thực sự nằm trong cái div .game-banner
        const actualImg = bannerWrapper.querySelector('img');
        
        if (actualImg) {
            actualImg.src = game.banner;
            actualImg.alt = game.name + " Banner";
            actualImg.setAttribute('fetchpriority', 'high');
            
            // Tối ưu Pagespeed nhưng không làm vỡ layout của div cha
            actualImg.width = 1093; 
            actualImg.height = 468;
            actualImg.style.width = "100%"; 
            actualImg.style.height = "100%"; 
            actualImg.style.display = "block"; // Đảm bảo không bị khoảng trống lạ
            
            console.log("Đã nạp ảnh vào thẻ img bên trong .game-banner");
        }
    }

    // 4. Đổ Previews vào image-grid
    const previews = document.querySelectorAll('.image-grid img');
    previews.forEach((img, i) => {
        if (game.previews[i]) {
            img.src = game.previews[i];
            img.alt = game.name + " Việt Hóa Screenshot " + (i + 1);
            img.setAttribute('loading', 'lazy');
            // Tối ưu Pagespeed
            img.width = 533; img.height = 300;
            img.style.width = "100%"; img.style.height = "auto"; img.style.objectFit = "cover";
        }
    });
}

document.addEventListener('DOMContentLoaded', pituRender);
