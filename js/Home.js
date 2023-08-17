const $slideCon = document.querySelector(".contentCon ul");
let $slides;
const $dotNav = document.querySelector(".dotnavi");
const footer = document.querySelector(".copyWriter");
let slideWidth;
const $projcetgoing = document.querySelector(".projcetgoing");

let dotIndex = ""; // 도트 초기화
let intervalId; // interval초기화셋팅
// 싱글페이지 구현으로 라우트기능
const headLink = document.querySelectorAll(".gnb > a");
const slideText = document.querySelector(".slideText");
let currentIndex = 0;
const texts = ["끊임없이 도전하는", "끊임없이 성장하는", "오늘과 내일이 다른"]; // 변경할 글자들
slideText.textContent = texts[currentIndex];

// 라우팅함수
function showMenu(menuId) {
  const menu = document.querySelectorAll("main");

  menu.forEach((menu) => {
    menu.classList.remove("on");
  });
  const selectedMenu = document.querySelector(`.${menuId}`);
  selectedMenu.classList.add("on");
  const $copyWriter = document.querySelector(".copyWriter");
  if (menuId == "About") {
    $copyWriter.classList.add("block");
  } else {
    $copyWriter.classList.remove("block");
  }
  if (menuId === "Project") {
    if (!dotIndex) {
      $slideCon.innerHTML = `
              <li class="project1">
                <h2>#01</h2>
                <div class="left">
                  <p class="title">WITH(장애인편의시설제공웹사이트)</p>
                  <p class="subtitle">RESPONSIVE WEBSITE</p>
                  <p class="content">
                    React 기반으로 기획 및 사이트 제작 <br />
                    장애를 가지고 있는 분 또는 가족, 지인이 이동할 위치에 맞는
                    <br />
                    장애인 편의시설을 한눈에 확인 할 수 있도록 검색 사이트 제작
                  </p>
                  <p class="hastag">
                    <span>#React</span><span>#KAKAOMAP API</span>
                  </p>
                  <div class="btnCon">
                    <a
                      href="https://eunsoly.github.io/Project04_React/"
                      class="btn"
                      target="_blank"
                      >Demo</a
                    >
                    <a
                      href="https://github.com/EUNSOLY/Project04_React#react-project_with"
                      class="btn"
                      target="_blank"
                      >Github</a
                    >
                  </div>
                </div>
                <div class="right">
                  <img src="./image/project1.png" alt="project1" />
                </div>
              </li>

              <li class="project2">
                <h2>#02</h2>
                <div class="left">
                  <p class="title">React Disney CloneProject</p>
                  <p class="subtitle">RESPONSIVE WEBSITE</p>
                  <p class="content">
                   React 라이브러리를 사용한 <br/>
                   Disney HomePage Clone <br/><br/>

                   1. Swiper 슬라이드사용 <br/>
                   2. fireBase 로그인 구현 및 배포

                   
                  </p>
                  <p class="hastag">
                    <span>#React</span>
                    <span>#StyledComponent</span>
                    <span>#Javascript</span>
                    <span>#Axios</span>
                    <span>#LocalStorage</span>
                  </p>
                  <div class="btnCon">
                    <a href="https://react-disney-plus-app-ab04b.firebaseapp.com/" class="btn" target="_blank">Demo</a>
                    <a href="https://github.com/EUNSOLY/React_DisneyPlus#react_disneyplus-clone" class="btn" target="_blank">Github</a>
                  </div>
                </div>
                <div class="right">
                  <img src="./image/project2.png" alt="project2" />
                </div>
              </li>

              <li class="project3">
                <h2>#03</h2>
                <div class="left">
                  <p class="title">HAPPY GIFT</p>
                  <p class="subtitle">MOBILE FIXED</p>
                  <p class="content">
                    Chat Opne API를 활용한 선물 추천 웹앱 개발 <br />
                    대화형식으로 추가 질문이 가능
                  </p>
                  <p class="hastag">
                    <span>#HTML</span><span>#CSS</span>
                    <span>#Javascript</span>
                  </p>
                  <div class="btnCon">
                    <a href="https://etourguide.pages.dev/" class="btn"  target="_blank">Demo</a>
                    <a href="https://github.com/EUNSOLY/ChatGPT_Gift#chatgpt%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%84%A0%EB%AC%BC-%EC%B6%94%EC%B2%9C%EB%B0%9B%EB%8A%94-%EC%82%AC%EC%9D%B4%ED%8A%B8" class="btn"  target="_blank">Github</a>
                  </div>
                </div>
                <div class="right">
                  <img src="./image/project3.png" alt="project3" />
                </div>
              </li>

              <li class="project4">
                <h2>#04</h2>
                <div class="left">
                  <p class="title">술담화 홈페이지 리뉴얼</p>
                  <p class="subtitle">RESPONSIVE WEBSITE</p>
                  <p class="content">
                    웹사이트에 맞는 홈페이지의 레이아웃 변형과 <br />
                    사이트에 들어왔을 때 회사에 대해 알리는 것을 중점으로 반응형
                    리뉴얼 <br />
                    외부 라이브러리 사용 <br />
                    <span>Swiper</span>
                  </p>
                  <p class="hastag">
                    <span>#HTML</span><span>#CSS</span>
                    <span>#Javascript</span>
                  </p>
                  <div class="btnCon">
                    <a href="https://eunsoly.github.io/SDW_renewal/" class="btn"  target="_blank">Demo</a>
                    <a href="https://github.com/EUNSOLY/SDW_renewal#%EC%88%A0%EB%8B%B4%ED%99%94%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A6%AC%EB%89%B4%EC%96%BC-%EB%8D%B0%EB%AA%A8" class="btn"  target="_blank">Github</a>
                  </div>
                </div>
                <div class="right">
                  <img src="./image/project4.png" alt="project4" />
                </div>
              </li>

              <li class="project5">
                <h2>#05</h2>
                <div class="left">
                  <p class="title">대전시민천문대 리뉴얼</p>
                  <p class="subtitle">RESPONSIVE WEBSITE</p>
                  <p class="content">
                    홈페이지를 이용자의 편의성을 증대하기 위한 UI 개선
                    <br />
                    1. 중복되는 메뉴 구조와 복잡한 사이트맵의 재구성 <br />
                    2. 반응형에 무너지지않는 레이아웃
                  </p>
                  <p class="hastag">
                    <span>#HTML</span><span>#CSS</span><span>#Javascript</span>
                  </p>
                  <div class="btnCon">
                    <a href="https://eunsoly.github.io/DCAO_renewal/index.html" class="btn"  target="_blank">Demo</a>
                    <a href="https://github.com/EUNSOLY/DCAO_renewal#%EB%8C%80%EC%A0%84%EC%8B%9C%EB%AF%BC%EC%B2%9C%EB%AC%B8%EB%8C%80-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A6%AC%EB%89%B4%EC%96%BC" class="btn"  target="_blank">Github</a>
                  </div>
                </div>
                <div class="right">
                  <img src="./image/project5.png" alt="project5" />
                </div>
              </li>

              <li class="project6">
                <h2>#06</h2>
                <div class="left">
                  <p class="title">스타벅스 클론코딩</p>
                  <p class="subtitle">FIXED WEBSITE</p>
                  <p class="content">
                    외부 라이브러리를 사용한 스타벅스 클론코딩
                    <br />
                    <span>Swiper</span> <br />
                    <span> GSAP & ScrollToPlugin </span> <br />
                    <span>ScrollMagic</span>
                  </p>
                  <p class="hastag">
                    <span>#HTML</span><span>#CSS</span><span>#Javascript</span>
                  </p>
                  <div class="btnCon">
                    <a href="https://resilient-youtiao-3625d5.netlify.app/" class="btn"  target="_blank">Demo</a>
                    <a href="https://github.com/EUNSOLY/starbucksClone#%EB%8D%B0%EB%AA%A8" class="btn"  target="_blank">Github</a>
                  </div>
                </div>
                <div class="right">
                  <img src="./image/project6.png" alt="project6" />
                </div>
              </li>
      `;
      $slides = document.querySelectorAll(".contentCon li");
      slideWidth = $slides[0].offsetWidth; // 슬라이드 1개의 크기

      // 슬라이드 갯수만큼 도트 생성
      $slides.forEach((item, i) => {
        item.dataset.index = i + 1;
        dotIndex += `<span class='dot${i + 1}' data-index="${
          i + 1
        }" style=" left :${(i + 1) * 30}px;"></span>`;
      });
      $dotNav.innerHTML = dotIndex;
      slideSet();
    }
  } else {
    dotIndex = ""; // 도트 초기화
    $dotNav.innerHTML = ""; // 도트 삭제
    clearInterval(intervalId);
  }
}

// home에서 project바로가기
$projcetgoing.addEventListener("click", (e) => {
  e.preventDefault();
  const linkURL = e.target.getAttribute("href");
  const mainPath = linkURL.substring(1);
  headLink.forEach((link) => {
    if (mainPath == link.getAttribute("href").substring(1)) {
      link.classList.add("on");
    } else {
      link.classList.remove("on");
    }
  });

  showMenu(mainPath);
});
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

// HOME 자기소개 자동슬라이드
function slideTextAnimation() {
  currentIndex = (currentIndex + 1) % texts.length;
  slideText.textContent = texts[currentIndex];
}
setInterval(slideTextAnimation, 2500);

// 슬라이드콜백함수
function slideSet() {
  slideWidth = $slides[0].offsetWidth;
  // 개별 도트 담기
  let $dotNavSpan = $dotNav.querySelectorAll("span");

  // 도트 클릭이벤트
  $dotNavSpan.forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
      const nodes = [...e.target.parentElement.children];
      const index = nodes.indexOf(e.target);
      dotActive(index);
      clearInterval(intervalId); // 이전 interval 제거
      intervalId = setInterval(loopMove, 4000);
      nextMove(index);
    });
  });
  // 도트 클릭 시 실행함수

  function dotActive(i) {
    for (let b = 0; b < i; b++) {
      $dotNav.appendChild($dotNavSpan[0]);
      $dotNavSpan = $dotNav.querySelectorAll("span");
    }
  }

  function nextMove(i) {
    for (let b = 0; b < i; b++) {
      $slideCon.appendChild($slideCon.firstElementChild);
    }
    $slideCon.style.marginLeft = "0px";
  }

  // 자동슬라이드 콜백함수
  function loopMove() {
    $dotNav.appendChild($dotNavSpan[0]);
    $dotNavSpan = $dotNav.querySelectorAll("span");
    $slideCon.style.transition = "0.5s";
    $slideCon.style.marginLeft = `-${slideWidth}px`;

    setTimeout(() => {
      $slideCon.appendChild($slideCon.firstElementChild);
      $slideCon.style.transition = "none";
      $slideCon.style.marginLeft = "0";
    }, 800);
  }

  intervalId = setInterval(loopMove, 4000);
  // 화면 크기에 따른 슬라이드 반응형
  function handleResize() {
    $slides = document.querySelectorAll(".contentCon li");
    slideWidth = $slides[0].offsetWidth;
    console.log(slideWidth, "반응형");
    clearInterval(intervalId); // 이전 interval 제거
    intervalId = setInterval(loopMove, 4000); // 새로운 interval 시작
  }
  window.addEventListener("resize", handleResize); // resize 이벤트 핸들러 등록
  // 초기 호출
  handleResize();
}

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
