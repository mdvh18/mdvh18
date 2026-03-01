const scrollContainer = document.getElementById("slides");
const leftBtn = document.getElementById("left-button");
const rightBtn = document.getElementById("right-button");

function slideNext() {
    let containerWidth = scrollContainer.clientWidth;
    if (scrollContainer.scrollLeft + containerWidth >= scrollContainer.scrollWidth - 10) {
        scrollContainer.scrollLeft = 0;
    } else {
        scrollContainer.scrollLeft += containerWidth;
    }
}

function slidePrev() {
    let containerWidth = scrollContainer.clientWidth;
    if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    } else {
        scrollContainer.scrollLeft -= containerWidth;
    }
}

// Tự động chạy
let autoSlide = setInterval(slideNext, 5000);

// Dừng khi di chuột vào
scrollContainer.addEventListener("mouseover", () => clearInterval(autoSlide));
scrollContainer.addEventListener("mouseout", () => autoSlide = setInterval(slideNext, 5000));

// Sự kiện nút bấm
rightBtn.addEventListener("click", slideNext);
leftBtn.addEventListener("click", slidePrev);
