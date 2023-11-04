class Ball {
  constructor(
    gameCanvas,
    gameCanvasWidth,
    gameCanvasHeight,
    left,
    top,
    width,
    height,
    radius,
    velocityX,
    velocityY
  ) {
    this.gameCanvas = gameCanvas;
    this.gameCanvasWidth = gameCanvasWidth;
    this.gameCanvasHeight = gameCanvasHeight;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.radius = width / 2;
    this.velocityX = 15;
    this.velocityY = 10;
    this.bounce = 0.7;
    this.gravity = -0;
    this.xDirection = 'right';
    this.yDirection = 'bottom';
    this.ball = document.createElement('div');

    this.addBall();
  }

  addBall() {
    this.ball.style.top = `${this.top}px`;
    this.ball.style.left = `${this.left}px`;
    this.ball.style.width = `${this.width}px`;
    this.ball.style.height = `${this.height}px`;
    this.ball.style.position = 'absolute';

    this.ball.classList.add('ball');
    this.gameCanvas.appendChild(this.ball);
    console.log(this.gameCanvasWidth);
  }

  moveBall() {
    console.log(this.left);
    // X-Axis movement direction control:
    if (this.left + this.width >= this.gameCanvasWidth) {
      this.xDirection = 'left';
    }
    if (this.left <= 0) this.xDirection = 'right';
    // Ternary operation that will define the direction of the x-axis:
    this.left += this.xDirection === 'right' ? this.velocityX : -this.velocityX;

    this.velocityY -= this.gravity;

    // Y-Axis movement direction control:
    if (this.top + this.height >= this.gameCanvasHeight) {
      this.yDirection = 'top';
    }
    if (this.top <= 0) this.yDirection = 'bottom';
    this.top += this.yDirection === 'bottom' ? this.velocityY : -this.velocityY;

    this.updatedPosition();
  }

  updatedPosition() {
    this.ball.style.top = `${this.top}px`;
    this.ball.style.left = `${this.left}px`;
  }
}
