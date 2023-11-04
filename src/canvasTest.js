// let canvas = document.getElementById('game-canvas');
// let ctx = canvas.getContext('2d');
// let x = canvas.width / 2;
// let y = canvas.height / 2;
// let dx = 2;
// let dy = -2;
// const ballRadius = 5;

// const paddleHeight = 10;
// const paddleWidth = 75;
// let paddleX = (canvas.width - paddleWidth) / 2;

// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//   ctx.fillStyle = '#0095DD';
//   ctx.fill();
//   ctx.closePath();
// }
// function drawPaddle() {
//   ctx.beginPath();
//   ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//   ctx.fillStyle = '#0095DD';
//   ctx.fill();
//   ctx.closePath();
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawBall();
//   drawPaddle();
//   x += dx;
//   y += dy;

//   if (y + dy > canvas.height || y + dy < 0) {
//     dy = -dy;
//   }
//   if (x + dx > canvas.width || x + dx < 0) {
//     dx = -dx;
//   }
// }

// setInterval(draw, 10);

let canvas, ctx, container;
canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');
let ball;
let message = 'gravity simulator';

// Velocity x
let vx = 5.0;
// Velocity y - randomly set
let vy;

let gravity = 0.5;
let bounce = 0.7;
let xFriction = 0.1;

function init() {
  setupCanvas();
  vy = Math.random() * -15 + -5;
  ball = { x: canvas.width / 2, y: 100, radius: 20, status: 0, color: 'red' };
} //end init method

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //display some text
  ctx.fillStyle = 'blue';
  ctx.font = '20px Arial';
  ctx.fillText(message, 20, 20);

  //draw cirlce
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  ballMovement();
}

setInterval(draw, 1000 / 35);

function ballMovement() {
  ball.x += vx;
  ball.y += vy;
  vy += gravity;

  //If either wall is hit, change direction on x axis
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    vx *= -1;
  }

  // Ball hits the floor
  if (ball.y + ball.radius > canvas.height) {
    // ||

    // Re-positioning on the base
    ball.y = canvas.height - ball.radius;
    //bounce the ball
    vy *= -bounce;
    //do this otherwise, ball never stops bouncing
    if (vy < 0 && vy > -2.1) vy = 0;
    //do this otherwise ball never stops on xaxis
    if (Math.abs(vx) < 1.1) vx = 0;

    xF();
  }
}

function xF() {
  if (vx > 0) vx = vx - xFriction;
  if (vx < 0) vx = vx + xFriction;
}

function setupCanvas() {
  //setup canvas

  container = document.createElement('div');
  container.className = 'container';

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(container);
  container.appendChild(canvas);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
}

init();
