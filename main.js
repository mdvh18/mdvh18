function renderPituGame() {
    const container = document.getElementById('pitu-game-display');
    if (!container) return;

    let html = '';

    PITU_DATABASE.forEach(game => {
        // 1. Phần Banner (Ưu tiên cao, không lazy)
        html += `
            <div class="game-post" style="margin-bottom: 50px; border-bottom: 1px solid #333; padding-bottom: 20px;">
                <h2 style="color: #ff69b4;">${game.name}</h2>
                <div class="banner-box" style="margin: 15px 0;">
                    <img alt="${game.name} Banner" 
                         src="${game.banner}" 
                         width="1093" height="468" 
                         fetchpriority="high" 
                         style="width: 100%; height: auto; border-radius: 8px; object-fit: cover; aspect-ratio: 1093/468;">
                </div>
        `;

        // 2. Phần Ảnh Previews (Tải lười - Loading Lazy)
        html += `<div class="previews-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">`;
        game.previews.forEach((imgLink, index) => {
            html += `
                <img alt="${game.name} Preview ${index + 1}" 
                     src="${imgLink}" 
                     width="533" height="300" 
                     loading="lazy" 
                     style="width: 100%; height: auto; border-radius: 4px; object-fit: cover; aspect-ratio: 533/300;">
            `;
        });
        html += `</div>`;
    container.innerHTML = html;
}

// Chạy lệnh khi web sẵn sàng
document.addEventListener('DOMContentLoaded', renderPituGame);
