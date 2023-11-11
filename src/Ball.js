class Ball {
  constructor(gameCanvas, gameCanvasWidth, gameCanvasHeight, left, top, width, height) {
    this.gameCanvas = gameCanvas;
    this.gameCanvasWidth = gameCanvasWidth;
    this.gameCanvasHeight = gameCanvasHeight;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 8;
    this.gravity = 0.5;

    this.element_DOM = document.createElement('div');
    this.explosion_element_DOM = undefined;
    this.wallAudio = new Audio('/assets/audio/wall-sound-short.wav');
    this.wallAudio.volume = 0.6;
    this.addBall();
  }

  addBall() {
    this.element_DOM.style.top = `${this.top}px`;
    this.element_DOM.style.left = `${this.left}px`;
    this.element_DOM.style.width = `${this.width}px`;
    this.element_DOM.style.height = `${this.height}px`;
    this.element_DOM.style.position = 'absolute';

    this.element_DOM.classList.add('ball');
    this.gameCanvas.appendChild(this.element_DOM);
  }

  moveBall() {
    // X-Axis movement direction control:
    this.velocityY += this.gravity;
    if (this.left + this.width >= this.gameCanvasWidth) {
      this.velocityX = -this.velocityX; // Change the x direction
      this.left = this.gameCanvasWidth - this.width; // Repositioning inside the canvas
      this.wallAudio.play();
    }
    if (this.left <= 0) {
      this.velocityX = -this.velocityX; // Change the x direction
      this.left = 0; // Repositioning inside the canvas
      this.wallAudio.play();
    }

    // Y-axis movement direction control
    if (this.top + this.height >= this.gameCanvasHeight) {
      this.velocityY = -this.velocityY; // Change the y direction
      this.top = this.gameCanvasHeight - this.height; // Repositioning inside the canvas
      this.wallAudio.play();
    }
    if (this.top <= 0) {
      this.velocityY = -this.velocityY; // Change the y direction
      this.top = 0; // Repositioning inside the canvas
    }

    // Update ball position
    this.left += this.velocityX;
    this.top += this.velocityY;

    if (this.velocityX > 0) this.element_DOM.style.rotate = '-60deg';
    if (this.velocityX < 0) this.element_DOM.style.rotate = '60deg';
    if (this.velocityX === 0) this.element_DOM.style.rotate = '0deg';

    this.updatedPosition();
  }

  updatedPosition() {
    this.element_DOM.style.top = `${this.top}px`;
    this.element_DOM.style.left = `${this.left}px`;
  }
  didHitGround() {
    if (this.top + this.height >= this.gameCanvasHeight) {
      return true;
    } else {
      return false;
    }
  }
  reposition(newLeft, newBottom) {
    if (this.didHitGround() === true) {
      this.left = newLeft;
      this.bottom = newBottom;
    }
  }
  explosion() {
    const explotionPosition = this.element_DOM.getBoundingClientRect();

    this.element_DOM.style.display = 'none';
    this.explosion_element_DOM = document.createElement('div');
    this.explosion_element_DOM.style.position = `absolute`;
    this.explosion_element_DOM.style.top = `${explotionPosition.top - 100}px`;
    this.explosion_element_DOM.style.left = `${explotionPosition.left - this.gameCanvas.getBoundingClientRect().x}px`;
    this.explosion_element_DOM.classList.add('explosion');
    this.gameCanvas.appendChild(this.explosion_element_DOM);
  }
}
