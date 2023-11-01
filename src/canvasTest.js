let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;
const ballRadius = 5;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;

  if (y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
  }
  if (x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
  }
}

setInterval(draw, 10);
