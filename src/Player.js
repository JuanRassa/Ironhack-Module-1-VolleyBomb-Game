class Player {
  constructor(gameCanvas, left, width, height, imgSrc, isFirstPlayer) {
    this.gameCanvas = gameCanvas;
    this.left = left;
    this.width = width;
    this.height = height;
    this.bottom = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.isFirstPlayer = isFirstPlayer;
    this.playerElement = document.createElement('img');
    this.gravity = -0.5;

    this.addPlayer(imgSrc);
  }

  addPlayer(imgSrc) {
    //  Adding the player to the screen
    this.playerElement.src = imgSrc;
    this.playerElement.style.position = 'absolute';
    this.playerElement.style.width = `${this.width}px`;
    this.playerElement.style.height = `${this.height}px`;
    this.playerElement.style.left = `${this.left}px`;
    this.playerElement.style.bottom = `${this.bottom}px`;
    this.playerElement.id = this.isFirstPlayer ? 'player-one' : 'player-two';
    this.gameCanvas.appendChild(this.playerElement);
  }

  move() {
    this.left += this.directionX;
    this.bottom += this.directionY;

    if (this.left < 60) {
      this.left = 60;
    }
    if (this.bottom < 0) {
      this.bottom = 0;
    }

    //  Handles the right side of the road. We use the road width minus the car width and minus the 10 margin.
    if (this.left > this.gameCanvas.offsetWidth - this.width - 60) {
      this.left = this.gameCanvas.offsetWidth - this.width - 60;
    }
    const bottomMaxValue = this.gameCanvas.offsetHeight - this.height - 10;
    if (this.top > bottomMaxValue) {
      this.top = bottomMaxValue;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.playerElement.style.left = `${this.left}px`;
    this.playerElement.style.bottom = `${this.bottom}px`;
  }
}
