const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultImage = document.querySelector(".scratch__result");

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
let isDrawing = false;

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
  ctx.clearRect(e.offsetX - 25, e.offsetY - 25, 30, 30);
}

// 배경 이미지 로드 후 그리기
// const backgroundImage = new Image();
// backgroundImage.src = "./image/MainImage.jpg";
// backgroundImage.onload = function () {
//   ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
// };
// 이벤트 핸들러 등록
canvas.addEventListener("mousedown", mouseDownHandler);
canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("mouseup", mouseUpHandler);
canvas.addEventListener("mouseleave", mouseUpHandler);
