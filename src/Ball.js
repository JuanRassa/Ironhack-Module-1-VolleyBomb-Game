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
    this.directionX = 100;
    this.directionY = 100;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.bounce = 0.7;
    this.gravity = -0;
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
    this.velocityX = 20;
    this.velocityY = 5.0;
    // this.top += this.velocityY;
    this.left += this.velocityX;
    this.velocityY -= this.gravity;

    // this.directionX += this.velocityX;
    // this.directionY -= this.gravity;
    // this.gameCanvas();

    if (this.left + this.width >= this.gameCanvasWidth) {
      this.left -= this.velocityX;
    }

    // if (this.top + this.radius > this.gameCanvasHeight) {
    //   this.top = this.gameCanvasHeight - this.radius;
    //   //bounce the ball
    //   this.top *= -this.bounce;
    //   //do this otherwise, ball never stops bouncing
    //   if (this.top < 0 && this.top > -2.1) this.top = 0;
    //   //do this otherwise ball never stops on xaxis
    //   if (Math.abs(this.left) < 1.1) this.left = 0;

    //   // this.friction();
    // }

    this.updatedPosition();
  }

  // friction (){
  //   if (this.left > 0) this.left = this.left - xFriction;
  // if (this.left < 0) vx = vx + xFriction;
  // }

  updatedPosition() {
    // this.ball.style.top = `${this.top}px`;
    this.ball.style.left = `${this.left}px`;
  }
}
