const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultImage = document.querySelector(".scratch__result");

const $scratch = document.querySelector(".scratch");
const $scratchTxt = document.querySelector(".scratchTxt");
const $wrap = document.querySelector(".wrap");
const WIDTH = 800;
const HEIGHT = 400;
let fontSize = 7;
let lineHeight = fontSize * 18; // 줄 간격을 설정합니다.

// 초기값
let isDrawing = false;
let erasingThreshold = 0.45; // 45% 지워졌을 때의 비율

function textLine(fontSize, lineHeight) {
  const font = new FontFace(
    "PilseungGothic",
    "url(fonts/PilseungGothic.woff2)"
  );
  font.load().then((loadedFont) => {
    document.fonts.add(loadedFont);

    // 안내 문구 추가
    const text = "Portfolio \n Drow";
    const fontFamily = "PilseungGothic";
    if (window.innerWidth >= 1020) {
      ctx.font = `85px ${fontFamily}`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = text.split("\n"); // 줄바꿈을 기준으로 텍스트를 나눕니다.

      lines.forEach((line, index) => {
        const y =
          canvas.height / 2 -
          ((lines.length - 1) * lineHeight) / 2 +
          index * lineHeight;
        ctx.fillText(line, canvas.width / 2, y);
      });
      console.log(fontSize, "폰트사이즈");
      console.log(lineHeight, "높이");
    } else {
      ctx.font = `${fontSize}vw ${fontFamily}`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = text.split("\n"); // 줄바꿈을 기준으로 텍스트를 나눕니다.

      lines.forEach((line, index) => {
        const y =
          canvas.height / 2 -
          ((lines.length - 1) * lineHeight) / 2 +
          index * lineHeight;
        ctx.fillText(line, canvas.width / 2, y);
      });
      console.log(fontSize, "폰트사이즈");
      console.log(lineHeight, "높이");
    }
  });
}

function adjustViewport() {
  if (window.innerWidth >= 780) {
    fontSize = 7; // 새로운 폰트 크기
    lineHeight = fontSize * 18;
    // Canvas 크기 조정
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // 기존 텍스트 지우기
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 배경 다시 그리기
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, WIDTH);
    ctx.fill();
    textLine(fontSize, lineHeight);
  } else if (window.innerWidth >= 580) {
    erasingThreshold = 0.5;
    fontSize = 12; // 새로운 폰트 크기
    const newCanvasWidth = window.innerWidth;
    const newCanvasHeight = window.innerHeight;
    lineHeight = fontSize * 6;
    // Canvas 크기 조정
    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;

    // 기존 텍스트 지우기
    ctx.clearRect(0, 0, newCanvasWidth, newCanvasHeight);

    // 배경 다시 그리기
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, newCanvasWidth, newCanvasHeight);
    ctx.fill();
    textLine(fontSize, lineHeight);
  } else {
    erasingThreshold = 0.66;
    fontSize = 14; // 새로운 폰트 크기
    const newCanvasWidth = window.innerWidth;
    const newCanvasHeight = window.innerHeight;
    lineHeight = fontSize * 6;
    // Canvas 크기 조정
    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;

    // 기존 텍스트 지우기
    ctx.clearRect(0, 0, newCanvasWidth, newCanvasHeight);

    // 배경 다시 그리기
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, newCanvasWidth, newCanvasHeight);
    ctx.fill();
    textLine(fontSize, lineHeight);
  }
}

function draw(e) {
  if (isDrawing) {
    // 현재 캔버스의 픽셀 데이터 가져오기
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const pixelData = imageData.data;
    const totalPixels = pixelData.length / 4;

    // 지워진 픽셀의 비율 계산
    let erasedPixels = 0;
    for (let i = 0; i < totalPixels; i++) {
      // 투명한 픽셀(알파 채널이 0)을 세어서 지워진 픽셀 개수를 구합니다.
      if (pixelData[i * 4 + 3] === 0) {
        erasedPixels++;
      }
    }
    const erasedRatio = erasedPixels / totalPixels;

    // 비율이 일정 수준 이상이면 특정 태그에 클래스를 추가합니다.
    if (erasedRatio >= erasingThreshold) {
      $scratch.classList.add("show");
      $scratchTxt.classList.add("hidden");
      setTimeout(() => {
        $wrap.classList.add("change");
        window.location.href = "Home.html";
      }, 1300);
    }
  }
}
function drawTouchArea(x, y) {
  // 터치된 영역을 지우기
  const touchAreaSize = 150;
  const halfTouchSize = touchAreaSize / 2;
  ctx.clearRect(
    x - halfTouchSize,
    y - halfTouchSize,
    touchAreaSize,
    touchAreaSize
  );
}

// 마우스 이벤트 핸들러
function mouseDownHandler(e) {
  isDrawing = true;
  mouseHandler(e); // 클릭한 위치에 스크래치 효과 적용
  canvas.addEventListener("mousemove", mouseMoveHandler);
  console.log(e);
}

function mouseMoveHandler(e) {
  if (isDrawing) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - 30;
    const y = e.clientY - canvasRect.top - 70; // y 좌표를 10만큼 위쪽으로 이동
    drawTouchArea(x, y);
    draw(e); // 스크래치 효과 그리기
  }
}

function mouseUpHandler() {
  isDrawing = false;

  // 마우스 움직임 이벤트 핸들러 제거
  canvas.removeEventListener("mousemove", mouseMoveHandler);
}
// 클릭 이벤트 핸들러
function mouseHandler(e) {
  const canvasRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasRect.left;
  const y = e.clientY - canvasRect.top - 10; // y 좌표를 10만큼 위쪽으로 이동
  drawTouchArea(x, y); // 클릭한 위치에 스크래치 효과 적용
}

// 터치 이벤트
function touchStartHandler(e) {
  e.preventDefault(); // 기본 터치 이벤트 동작 방지하기
  isDrawing = true;
  const touch = e.touches[0];
  const canvasRect = canvas.getBoundingClientRect();
  const x = touch.clientX - canvasRect.left;
  const y = touch.clientY - canvasRect.top;
  drawTouchArea(x, y); // 첫 번째 터치 지점으로 지우기
}

function touchMoveHandler(e) {
  e.preventDefault(); // 기본 터치 이벤트 동작 방지하기
  if (isDrawing) {
    const touch = e.touches[0];
    const canvasRect = canvas.getBoundingClientRect();
    const x = touch.clientX - canvasRect.left;
    const y = touch.clientY - canvasRect.top;
    console.log(x, y);
    drawTouchArea(x, y); // 현재 터치 지점으로 지우기
    draw(e);
  }
}

function drawTouchArea(x, y) {
  // 터치된 영역을 지우기
  ctx.clearRect(x - 25, y - 25, 100, 100);
}
function touchEndHandler() {
  isDrawing = false;
}

// 초기 로드 시 및 리사이즈 시에 뷰포트 조정 함수 호출
window.addEventListener("load", adjustViewport);
window.addEventListener("resize", adjustViewport);

// 이벤트 핸들러 등록

canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", mouseUpHandler);
canvas.addEventListener("mouseleave", mouseUpHandler);

// 터치 이벤트 등록
canvas.addEventListener("touchstart", touchStartHandler);
canvas.addEventListener("touchmove", touchMoveHandler);
canvas.addEventListener("touchend", touchEndHandler);
canvas.addEventListener("touchcancel", touchEndHandler);
