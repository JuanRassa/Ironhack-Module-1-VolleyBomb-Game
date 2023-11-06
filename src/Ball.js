class Ball {
  constructor(gameCanvas, gameCanvasWidth, gameCanvasHeight, left, top, width, height, radius, velocityX, velocityY) {
    this.gameCanvas = gameCanvas;
    this.gameCanvasWidth = gameCanvasWidth;
    this.gameCanvasHeight = gameCanvasHeight;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.velocityX = 8;
    this.velocityY = 8;
    this.gravity = 0.5;
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
    // console.log(this.left);
    // X-Axis movement direction control:
    this.velocityY += this.gravity;
    if (this.left + this.width >= this.gameCanvasWidth) {
      this.velocityX = -this.velocityX; // Change the x direction
      this.left = this.gameCanvasWidth - this.width; // Repositioning inside the canvas
    }
    if (this.left <= 0) {
      this.velocityX = -this.velocityX; // Change the x direction
      this.left = 0; // Repositioning inside the canvas
    }

    // Y-axis movement direction control
    if (this.top + this.height >= this.gameCanvasHeight) {
      this.velocityY = -this.velocityY; // Change the y direction
      this.top = this.gameCanvasHeight - this.height; // Repositioning inside the canvas
    }
    if (this.top <= 0) {
      this.velocityY = -this.velocityY; // Change the y direction
      this.top = 0; // Repositioning inside the canvas
    }

    // Update ball position
    this.left += this.velocityX;
    this.top += this.velocityY;

    this.updatedPosition();
  }

  updatedPosition() {
    this.ball.style.top = `${this.top}px`;
    this.ball.style.left = `${this.left}px`;
  }
  didHitGround() {
    if (this.top + this.height >= this.gameCanvasHeight) {
      return true;
    } else {
      return false;
    }
  }
}
