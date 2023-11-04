let ballX = 100;
let ballY = 100;
this.ball.style.top = `${ballY}px`;
this.ball.style.left = `${ballX}px`;
this.gameCanvas.appendChild(this.ball);
this.ball = document.createElement('div');
this.ball.classList.add('ball');
