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
let Mdraw = false;
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
      fontSize = 85;
      ctx.font = `${fontSize}px ${fontFamily}`;
    } else {
      ctx.font = `${fontSize}vw ${fontFamily}`;
    }
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
    lineHeight = fontSize * 6;
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
  } else {
    erasingThreshold = 0.5;
    fontSize = 14; // 새로운 폰트 크기\
    lineHeight = fontSize * 5;
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
  }
}

function draw(e) {
  // console.log("드로우", e);
  if (isDrawing) {
    if (Mdraw) {
      const touch = e.touches[0];
      const canvasRect = canvas.getBoundingClientRect();

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
      if (window.innerWidth <= 480) {
        const x = touch.clientX;
        const y = touch.clientY;
        drawTouchArea(x, y);
      } else {
        const x = touch.clientX - canvasRect.left;
        const y = touch.clientY - canvasRect.top;
        drawTouchArea(x, y);
      }
    } else {
      const canvasRect = canvas.getBoundingClientRect();
      // drawTouchArea(x, y);
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
      if (window.innerWidth <= 480) {
        const x = e.clientX;
        const y = e.clientY;
        drawTouchArea(x, y, e);
      } else {
        const x = e.clientX - canvasRect.left - 100;
        const y = e.clientY - canvasRect.top - 130;
        drawTouchArea(x, y, e);
      }
    }
  }
}

function drawTouchArea(x, y, e) {
  // 터치된 영역을 지우기

  const touchAreaSize = 160;

  if (isDrawing && Mdraw) {
    if (window.innerWidth > 1400) {
      ctx.clearRect(x - 50, y - 90, touchAreaSize, touchAreaSize);
      console.log("1400");
    } else if (window.innerWidth >= 1200) {
      ctx.clearRect(x, y + 20, touchAreaSize, touchAreaSize);
      console.log("1200");
    } else if (window.innerWidth >= 980) {
      ctx.clearRect(x + 90, y + 40, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 790) {
      ctx.clearRect(x + 150, y + 50, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 680) {
      ctx.clearRect(x + 50, y - 150, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 580) {
      ctx.clearRect(x + 120, y - 150, 130, 130);
    } else if (window.innerWidth >= 440) {
      ctx.clearRect(x + 130, y - 300, 120, 120);
    } else {
      ctx.clearRect(x + 115, y - 300, 90, 90);
    }
  } else if (isDrawing) {
    if (window.innerWidth > 1840) {
      ctx.clearRect(x, y - 20, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth > 1400) {
      ctx.clearRect(x, y + 50, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 1200) {
      ctx.clearRect(x, y + 110, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 980) {
      ctx.clearRect(x + 90, y + 110, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 790) {
      ctx.clearRect(x + 150, y + 110, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 680) {
      ctx.clearRect(x + 50, y - 150, touchAreaSize, touchAreaSize);
    } else if (window.innerWidth >= 580) {
      ctx.clearRect(x + 120, y - 150, 130, 130);
    } else if (window.innerWidth >= 440) {
      ctx.clearRect(x + 130, y - 300, 100, 100);
    } else {
      ctx.clearRect(x + 110, y - 250, 80, 80);
    }
  }
}

// 마우스 이벤트 핸들러
function mouseDownHandler() {
  isDrawing = true;
}

function mouseMoveHandler(e) {
  if (isDrawing) {
    draw(e);
  }
}

function mouseUpHandler() {
  isDrawing = false;
}

// 터치 이벤트
function touchStartHandler(e) {
  e.preventDefault(); // 기본 터치 이벤트 동작 방지하기
  isDrawing = true;
  Mdraw = true;
}

function touchMoveHandler(e) {
  e.preventDefault(); // 기본 터치 이벤트 동작 방지하기
  if (isDrawing) {
    draw(e);
  }
}

function touchEndHandler() {
  isDrawing = false;
  Mdraw = false;
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
