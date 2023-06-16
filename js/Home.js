const $slideCon = document.querySelector(".contentCon ul");
const $slides = document.querySelectorAll(".contentCon li");
const $dotNav = document.querySelector(".dotnavi");
const $dotNavSpan = $dotNav.querySelectorAll("span");
const footer = document.querySelector(".copyWriter");
let slideWidth;

let dotIndex = ""; // 도트 초기화
let intervalId; // interval초기화셋팅
// 싱글페이지 구현으로 라우트기능
const headLink = document.querySelectorAll(".gnb > a");
const slideText = document.querySelector(".slideText");
const texts = ["끊임없이 도전하는", "끊임없이 성장하는", "오늘과 내일이 다른"]; // 변경할 글자들
let currentIndex = 0;
slideText.textContent = texts[currentIndex];

// URL가져오기
function getCurrentURL() {
  return window.location.pathname;
}
// 라우팅함수
function showMenu(menuId) {
  const menu = document.querySelectorAll("main");
  menu.forEach((menu) => {
    menu.classList.remove("on");
  });
  const selectedMenu = document.querySelector(`.${menuId}`);
  selectedMenu.classList.add("on");
  if (menuId == "/") {
    const selectedMenu = document.querySelector("main.Home");
    selectedMenu.classList.add("on");
  }
  if (menuId == "Project") {
    slideWidth = $slides[0].offsetWidth; // 슬라이드 1개의 크기
    // 프로젝트 슬라이드 구현
  }
}

// HOME 자기소개 자동슬라이드
function slideTextAnimation() {
  currentIndex = (currentIndex + 1) % texts.length;
  slideText.textContent = texts[currentIndex];
}
setInterval(slideTextAnimation, 2500);

// 라우트기능
headLink.forEach((link, i) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const linkURL = link.getAttribute("href");
    const mainPath = linkURL.substring(1);
    showMenu(mainPath);
    headLink.forEach((link) => {
      link.classList.remove("on");
    });
    link.classList.add("on");
  });
});
showMenu("Home");

// 스킬텝메뉴 구현
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

// 슬라이드 시작
let currentSlide = 0; // 증가값 초기화
let sliderCount = $slides.length; // 슬라이드 갯수
// 화면크기에 따른 슬라이드 반응형
window.addEventListener("resize", () => {
  slideWidth = $slides[0].offsetWidth;
});
let action;
// 슬라이드 갯수만큼 도트 생성
$slides.forEach((item, i) => {
  item.dataset.index = i + 1;
  dotIndex += `<span class='dot${i + 1}' data-index="${i}" style=" left :${
    (i + 1) * 30
  }px;"></span>`;
});
$dotNav.innerHTML = dotIndex;

// 라우트 기능 오픈시 삭제 코드
// slideWidth = $slides[0].offsetWidth;
// const $slideCon = document.querySelector(".contentCon ul");
// const $slides = document.querySelectorAll(".contentCon li");
// 자동슬라이드 콜백함수
function loopMove() {
  $slideCon.style.transition = "0.5s";
  $slideCon.style.marginLeft = `-${slideWidth}px`;

  setTimeout(() => {
    $slideCon.appendChild($slideCon.firstElementChild);
    $slideCon.style.transition = "none";
    $slideCon.style.marginLeft = "0";
  }, 500);
}

intervalId = setInterval(loopMove, 3000);
