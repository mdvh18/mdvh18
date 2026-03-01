document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");

  let index = 0;
  const total = slide.length;

  function showSlide(i) {
    slides.style.transform = `translateX(-${i * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % total;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + total) % total;
    showSlide(index);
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  setInterval(nextSlide, 5000);
});
