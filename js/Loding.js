const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultImage = document.querySelector(".scratch__result");

const $scratch = document.querySelector(".scratch");
const $scratchTxt = document.querySelector(".scratchTxt");
const $wrap = document.querySelector(".wrap");
const WIDTH = 800;
const HEIGHT = 400;
canvas.width = WIDTH;
canvas.height = HEIGHT;
// ctx.scale(dpr, dpr);

// 배경으로 덮기
ctx.fillStyle = "black";
ctx.beginPath();
ctx.fillRect(0, 0, WIDTH, HEIGHT);
ctx.fill();

// 안내 문구 추가
const text = "Portfolio \n Drow";
// const text = "긁어주세용";
const fontSize = 5;
const fontFamily = "PilseungGothic";

ctx.font = `${fontSize}vw ${fontFamily}`;
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

const lines = text.split("\n"); // 줄바꿈을 기준으로 텍스트를 나눕니다.
const lineHeight = fontSize * 18; // 줄 간격을 설정합니다.

lines.forEach((line, index) => {
  const y =
    canvas.height / 2 -
    ((lines.length - 1) * lineHeight) / 2 +
    index * lineHeight;
  ctx.fillText(line, canvas.width / 2, y);
});

// 초기값
let isDrawing = false;
const erasingThreshold = 0.45; // 60% 지워졌을 때의 비율
// 마우스 이벤트 핸들러
function mouseDownHandler(e) {
  isDrawing = true;
  draw(e);
}

function mouseMoveHandler(e) {
  if (isDrawing) {
    draw(e);
  }
}

function mouseUpHandler() {
  isDrawing = false;
}

function draw(e) {
  // 클릭된 영역을 지우기
  ctx.clearRect(e.offsetX - 25, e.offsetY - 25, 100, 100);

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

// 이벤트 핸들러 등록
canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", mouseUpHandler);
canvas.addEventListener("mouseleave", mouseUpHandler);
