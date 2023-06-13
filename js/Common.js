const slideText = document.querySelector(".slideText");
const texts = ["끊임없이 도전하는", "끊임없이 성장하는", "오늘과 내일이 다른"]; // 변경할 글자들
let currentIndex = 0;

slideText.textContent = texts[currentIndex];

function slideTextAnimation() {
  currentIndex = (currentIndex + 1) % texts.length;
  slideText.textContent = texts[currentIndex];
}

setInterval(slideTextAnimation, 2500);

// 스킬
const $tapBox = document.querySelector(".tapBox");
const $skillIcon = document.querySelectorAll(".skillList > li");
let listData;
fetch("./data/skillTextData.json")
  .then((response) => response.json())
  .then((data) => {
    listData = data;
    // JSON 데이터를 사용하는 로직 작성
    listData.forEach((item, i) => {
      let HTML = ``;
      if (Array.isArray(item.title)) {
        // "Graphics" 및 "Cooperation" 객체의 경우
        const graphicsSkills1 = item.skills
          .slice(0, 2) // 배열의 0번째부터 1번째까지만 추출
          .map((skill) => {
            const imgSrc = `./image/SKILL/${skill}.svg`;
            return `<li><img src="${imgSrc}" alt="${skill}" /></li>`;
          })
          .join("");

        const graphicsSkills2 = item.skills
          .slice(2, 5) // 배열의 2번째부터 4번째까지만 추출
          .map((skill) => {
            const imgSrc = `./image/SKILL/${skill}.svg`;
            return `<li><img src="${imgSrc}" alt="${skill}" /></li>`;
          })
          .join("");
        // console.log(graphicsSkills1, "확인값1");
        // console.log(graphicsSkills2, "확인값2");
        HTML += `
          <div class="skillTextCon">
          <h3>${item.title[0]}</h3>
          <ul class="skillText skillImgCon">
          ${graphicsSkills1}
          </ul> 
          <h3>${item.title[1]}</h3>
          <ul class="skillText skillImgCon">
          ${graphicsSkills2}
          </ul>
          </div>
          `;
      } else {
        const skillItems = item.skills
          .map((skill) => `<li>${skill}</li>`)
          .join("");

        HTML += `
          <div class="skillTextCon">
          <h3>${item.title}</h3>
          <ul class="skillText">
          ${skillItems}
          </ul>
          </div>
          `;
      }

      $tapBox.innerHTML += HTML;
    });

    // 스킬 텝메뉴 구현
    const $skillText = $tapBox.querySelectorAll("div");
    $skillText[0].classList.add("on");
    $skillIcon.forEach((iconitem, index) => {
      iconitem.addEventListener("click", () => {
        $skillIcon.forEach((icon, i) => {
          icon.classList.remove("on");
          if (index == i) {
            icon.classList.add("on");
          }
        });
        $skillText.forEach((item, textIndex) => {
          item.classList.remove("on");
        });
        $skillText[index].classList.add("on");
      });
    });
  })
  .catch((error) => {
    // 오류 처리
    console.log("Error:", error);
  });

// 프로젝트 슬라이드 구현
const $slideCon = document.querySelector(".contentCon ul");
const $slides = document.querySelectorAll(".contentCon li");
const $dotNav = document.querySelector(".dotnavi");
const slideInterval = 3000; // 슬라이드 간격 설정 (3초)

let currentSlide = 0;
let sliderCount = $slides.length;
let slideWidth = $slides[0].offsetWidth;

window.addEventListener("resize", () => {
  slideWidth = $slides[0].offsetWidth;
});

// 첫 번째 슬라이드를 복사하여 뒤에 추가
$slideCon.appendChild($slides[0].cloneNode(true));
setInterval(() => {
  $slideCon.style.transition = "0.5s";
  $slideCon.style.marginLeft = `-${slideWidth * (currentSlide + 1)}px`;
  currentSlide++;
  if (currentSlide === sliderCount) {
    // 마지막 슬라이드에 도달한 경우 첫 번째 슬라이드로 되돌아감

    setTimeout(() => {
      $slideCon.style.transition = "none";
      $slideCon.style.marginLeft = "0";
      // 첫 번째 슬라이드 복사본 삭제
    }, 1000);
    currentSlide = 0;
  }
}, 3000);

// $slideCon.append($slideCon.firstElementChild);

console.log($slideCon.firstElementChild);

// 도트생성콜백함수
function creactDotNavigation() {
  for (let i = 0; i < $slides.length; i++) {
    const dot = document.createElement("span");
    $dotNav.appendChild(dot);
  }
}
// 도트 콜백함수 실행
creactDotNavigation();
