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
        return;}

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
            actualImg.style.display = "block";}}

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
    if (typeof PITU_DATABASE === "undefined") {
        console.error("LỖI CỰC NẶNG: PITU_DATABASE chưa được nạp vào trang này!");
        return; 
    }

    const gridImages = document.querySelectorAll('.grid-pitu-img');
    console.log("Tìm thấy " + gridImages.length + " ảnh cần load banner.");

    gridImages.forEach(img => {
      const pituId = img.getAttribute('data-pitu');
   
        const game = PITU_DATABASE.find(item => item.id === pituId);
        
        if (game && game.banner) {
            img.src = game.banner;
            img.style.objectFit = "cover";
            img.classList.add('loaded'); 
        } else {
            console.warn("Hụt ID: [" + pituId + "]. Check lại database xem có ID này không?");
            img.src = "https://via.placeholder.com/350x200?text=Check+ID+" + pituId;
        }
    });
}
if (document.readyState === 'complete') {
    renderGridImages();
} else {
    window.addEventListener('load', renderGridImages);
}
const observer = new MutationObserver((mutations) => {
    renderGridImages();
});

observer.observe(document.body, { childList: true, subtree: true });
const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {backToTopBtn.classList.add('show');} else {backToTopBtn.classList.remove('show');}});
    backToTopBtn.addEventListener('click', () => {window.scrollTo({top: 0,behavior: 'smooth'});});

let currentSlide = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Ẩn slide hiện tại (hoặc xử lý logic trượt của bạn ở đây)
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;
    
    // Ví dụ đơn giản: Cuộn đến slide tiếp theo
    const sliderContainer = document.querySelector('.slides');
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function showLinks() {
    document.getElementById("real-links").style.display = "block"; document.getElementById("btn-show").style.display = "none";}
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
window.onscroll = function() {
    var header = document.querySelector(".header-section"); if (window.pageYOffset > 50){header.classList.add("scrolled");}else {header.classList.remove("scrolled");}};
