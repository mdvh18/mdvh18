(function() {
    const CONFIG = {
        itemsPerLoad: 21,
        currentShown: 21
    };

    function initPituEngine() {
        if (typeof PITU_DATABASE === "undefined") {
            setTimeout(initPituEngine, 200);
            return;
        }

        const items = document.querySelectorAll('.pitu-item');
        const btn = document.getElementById('btn-load-more');
        const container = document.getElementById('load-more-container');

        if (items.length === 0) return;

        function loadVisibleImages() {
            items.forEach(item => {
                if (item.style.display !== 'none') {
                    const img = item.querySelector('.grid-pitu-img');
                    if (img && img.src.startsWith('data:image')) {
                        const pituId = img.getAttribute('data-pitu');
                        const gameData = PITU_DATABASE.find(g => g.id.trim() === pituId.trim());
                        if (gameData && gameData.banner) {
                            img.src = gameData.banner;
                        }
                    }
                }
            });
        }

        function updateDisplay() {
            items.forEach((item, index) => {
                if (index < CONFIG.currentShown) {
                    item.style.display = 'flex';
                    item.classList.add('is-visible'); // Thêm hiệu ứng fadeIn
                } else {
                    item.style.display = 'none';
                }
            });

            if (container) {
                container.style.display = (CONFIG.currentShown >= items.length) ? 'none' : 'block';
            }
            loadVisibleImages();
        }

        // TỰ ĐỘNG: Load khi cuộn chuột
        let isLoading = false; // Biến chặn để không load chồng chéo

window.addEventListener('scroll', () => {
    if (!isLoading && CONFIG.currentShown < items.length) {
        const triggerPoint = window.innerHeight + window.scrollY;
        if (triggerPoint >= document.body.offsetHeight - 400) {
            isLoading = true; // Khóa lại
            
            // Tạo độ trễ nhẹ cho chuyên nghiệp
            setTimeout(() => {
                CONFIG.currentShown += CONFIG.itemsPerLoad;
                updateDisplay();
                isLoading = false; // Mở khóa
            }, 300); 
        }
    }
});

        // BẤM NÚT: Vẫn giữ để sơ cua
        if (btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                CONFIG.currentShown += CONFIG.itemsPerLoad;
                updateDisplay();
            };
        }

        updateDisplay();
    }

    window.addEventListener('load', initPituEngine);
})();
