const slideText = document.querySelector(".slideText");
const texts = ["끊임없이 도전하는", "끊임없이 성장하는", "오늘과 내일이 다른"]; // 변경할 글자들
let currentIndex = 0;

slideText.textContent = texts[currentIndex];

function slideTextAnimation() {
  currentIndex = (currentIndex + 1) % texts.length;
  slideText.textContent = texts[currentIndex];
}

setInterval(slideTextAnimation, 2500);
