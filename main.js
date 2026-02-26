function pituOptimizer() {
    // 1. Lấy ID game từ tên file trên thanh địa chỉ
    const path = window.location.pathname;
    const currentPageId = path.split("/").pop().replace(".html", "");
    
    // 2. Tìm game trong kho dữ liệu
    const game = PITU_DATABASE.find(item => item.id === currentPageId);
    if (!game) {
        console.error("Không tìm thấy ID game này trong database!");
        return;
    }

    // 3. Tìm tất cả các thẻ img có đánh dấu 'pitu-auto'
    const images = document.querySelectorAll('.pitu-auto');

    images.forEach(img => {
        const type = img.getAttribute('data-pitu'); // banner hoặc preview

        if (type === 'banner') {
            img.src = game.banner;
            img.alt = game.name + " Banner";
            img.setAttribute('fetchpriority', 'high'); // Ưu tiên banner tải trước
            // Tối ưu PageSpeed: set kích thước banner
            img.width = 1093;
            img.height = 468;
        } 
        else if (type === 'preview') {
            const index = parseInt(img.getAttribute('data-index'));
            if (game.previews[index]) {
                img.src = game.previews[index];
                img.alt = game.name + " Preview " + (index + 1);
                img.setAttribute('loading', 'lazy'); // Ảnh review thì tải sau (lazy)
                // Tối ưu PageSpeed: set kích thước preview
                img.width = 533;
                img.height = 300;
            }
        }
        
        // Thêm CSS cơ bản để ảnh không bị méo
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "cover";
        img.style.display = "block";
    });
}

// Chạy script khi trang web load xong
document.addEventListener('DOMContentLoaded', pituOptimizer);
