const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// 캔버스 크기 설정
canvas.width = 1200; // 적절한 너비 값으로 변경해 주세요.
canvas.height = 800; // 적절한 높이 값으로 변경해 주세요.

const image = new Image();
image.src = "../image/TicketSvg.svg";

image.onload = function () {
  // 이미지 비율 계산
  const imageRatio = image.width / image.height;

  // 캔버스에 맞춰서 이미지를 그리기 위한 가로와 세로 크기 계산
  let drawWidth = canvas.width;
  let drawHeight = drawWidth / imageRatio;
  console.log(drawWidth);
  if (drawHeight > canvas.height) {
    drawHeight = canvas.height;
    drawWidth = drawHeight * imageRatio;
  }

  // 이미지를 중앙에 그리기 위한 좌표 계산
  const drawX = (canvas.width - drawWidth) / 2;
  const drawY = (canvas.height - drawHeight) / 2;

  // 배경색 설정
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 텍스트 설정
  const text = "Portfolio \n Drow";
  const fontSize = 8;
  const fontFamily = "PilseungGothic";

  ctx.font = `${fontSize}vw ${fontFamily}`;
  ctx.fillStyle = "black";
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

  // 이미지를 캔버스에 그리기
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
};
