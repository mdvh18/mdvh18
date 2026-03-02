// 1. Hiển thị link (Show Links)
function showLinks() {
    const realLinks = document.getElementById("real-links");
    const btnShow = document.getElementById("btn-show");
    if (realLinks) realLinks.style.display = "block";
    if (btnShow) btnShow.style.display = "none";
}

// 2. Header đổi màu khi Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector(".header-section");
    if (header) {
        if (window.pageYOffset > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
    
    // Nút Back to Top
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 3. Xử lý Back to Top Click
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// 4. Tìm kiếm (Search Engine)
let posts = [];
const searchUrl = typeof Jekyll !== 'undefined' ? "{{ '/search.json' | relative_url }}" : '/search.json';

fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
        posts = data;
        console.log("Loaded posts:", posts.length);
    })
    .catch(err => console.error("Search JSON lỗi:", err));

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('search-toggle');
    const box = document.getElementById('search-box');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    if (toggle && box && input) {
        toggle.addEventListener('click', () => {
            box.classList.toggle('active');
            input.focus();
        });

        input.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            if (!results) return;
            results.innerHTML = '';
            if (!query) { results.style.display = 'none'; return; }

            const filtered = posts.filter(post => post.title.toLowerCase().includes(query));

            filtered.slice(0, 10).forEach(post => {
                const a = document.createElement('a');
                a.href = post.url;
                a.classList.add("search-item");
                
                // Kiểm tra database ảnh (PITU)
                const game = (typeof PITU_DATABASE !== 'undefined') ? PITU_DATABASE.find(item => item.id === post.pitu_id) : null;
                const banner = game ? game.banner : "https://via.placeholder.com/70x40?text=No+Img";

                a.innerHTML = `
                    <div style="display:flex; align-items:center; gap:10px; padding:8px;">
                      <img src="${banner}" style="width:70px; height:40px; object-fit:cover; border-radius:4px;">
                      <span style="color:#eee; font-size:13px;">${post.title}</span>
                    </div>
                `;
                results.appendChild(a);
            });
            results.style.display = filtered.length ? 'block' : 'none';
        });
    }
});

// 5. Toggle Menu (Sửa lỗi trùng lặp)
function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    if (sideMenu) sideMenu.classList.toggle('active');
    if (overlay) {
        overlay.style.display = (overlay.style.display === 'block') ? 'none' : 'block';
    }
}

// 6. Máy lọc link Redirect (MDVH18)
(function() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/mdvh18/')) {
        const newUrl = currentUrl.replace('/mdvh18/', '/');
        window.location.replace(newUrl);
    }
})();

// 7. Chống copy/Redirect tên miền (Đoạn mã hóa hex của bro)
(function() {
    var _0x4212=["hostname","mdvh18.github.io","innerHTML","body","<div style=\"background:#000;color:#ff4a7b;height:100vh;display:flex;align-items:center;justify-content:center;font-size:25px;font-weight:bold;text-align:center;family:sans-serif;\">BẢN DỊCH CỦA MDVH18 BỊ CƯỚP!<br>ĐANG CHUYỂN VỀ TRANG CHÍNH CHỦ...</div>","href","location","https://mdvh18.github.io/mdvh18/"];
    if(window[_0x4212[6]][_0x4212[0]] !== _0x4212[1]){
        document[_0x4212[3]][_0x4212[2]] = _0x4212[4];
        setTimeout(function(){
            window[_0x4212[6]][_0x4212[5]] = _0x4212[7];
        }, 3000);
    }
})();
