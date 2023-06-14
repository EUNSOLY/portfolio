// 싱글페이지 구현으로 라우트기능
function getCurrentURL() {
  return window.location.pathname;
}
const headLink = document.querySelectorAll(".gnb > a");
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
}

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

const slideText = document.querySelector(".slideText");
const texts = ["끊임없이 도전하는", "끊임없이 성장하는", "오늘과 내일이 다른"]; // 변경할 글자들
let currentIndex = 0;

slideText.textContent = texts[currentIndex];

// HOME 자기소개 자동슬라이드
function slideTextAnimation() {
  currentIndex = (currentIndex + 1) % texts.length;
  slideText.textContent = texts[currentIndex];
}

setInterval(slideTextAnimation, 2500);

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

// 프로젝트 슬라이드 구현
//
const $slideCon = document.querySelector(".contentCon ul");
const $slides = document.querySelectorAll(".contentCon li");
const $dotNav = document.querySelector(".dotnavi");

let currentSlide = 0; // 증가값 초기화
let sliderCount = $slides.length; // 슬라이드 갯수
let slideWidth = $slides[0].offsetWidth; // 슬라이드 1개의 크기
let dotIndex = ""; // 도트 초기화
let intervalId; // interval초기화셋팅

// 화면크기에 따른 슬라이드 반응형
window.addEventListener("resize", () => {
  slideWidth = $slides[0].offsetWidth;
});

// 도트 생성
$slides.forEach((item, i) => {
  i === currentSlide ? (active = "on") : (active = "");
  dotIndex += `<span class='dot ${active}' data-index="${i}"></span>`;
  $dotNav.innerHTML = dotIndex;
});

// 도트 실행
function dotActive() {
  let $dot = $dotNav.querySelectorAll("span");
  $dot.forEach((item, i) => {
    item.classList.remove("on");
    $dot[currentSlide].classList.add("on");
  });
}

// 도트클릭이벤트
let $dot = $dotNav.querySelectorAll("span");
$dot.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    const clickedIndex = dot.getAttribute("data-index");
    currentSlide = parseInt(clickedIndex) - 1;
    clearInterval(intervalId);
    moveSlide();
    intervalId = setInterval(moveSlide, 3000);
  });
});

//슬라이드구현
$slideCon.appendChild($slides[0].cloneNode(true)); // 첫 번째 슬라이드를 복사하여 뒤에 추가

// 슬라이드 콜백함수
function moveSlide() {
  $slideCon.style.transition = "0.5s";
  $slideCon.style.marginLeft = `-${slideWidth * (currentSlide + 1)}px`;

  console.log(currentSlide, "++전");

  currentSlide++;

  console.log(`-${slideWidth * (currentSlide + 1)}px`);
  if (currentSlide === sliderCount) {
    // 마지막 슬라이드에 도달한 경우 첫 번째 슬라이드로 되돌아감
    setTimeout(() => {
      $slideCon.style.transition = "none";
      $slideCon.style.marginLeft = "0";
      // 첫 번째 슬라이드 복사본 삭제
    }, 1000);
    currentSlide = 0;
  }
  dotActive(currentSlide);
}

intervalId = setInterval(moveSlide, 3000); // 자동슬라이드 실행
