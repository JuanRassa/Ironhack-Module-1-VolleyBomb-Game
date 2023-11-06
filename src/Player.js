class Player {
  constructor(gameCanvas, left, width, height, imgSrc, isFirstPlayer) {
    this.gameCanvas = gameCanvas;
    this.left = left;
    this.bottom = 0;
    this.width = width;
    this.height = height;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.gravity = 0.5;
    this.isFirstPlayer = isFirstPlayer;
    this.playerElement = document.createElement('img');

    this.left_dir = false;
    this.right_dir = false;
    this.up_dir = false;
    this.jumping = true;
    this.score = 0;

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
    this.y_velocity -= this.gravity; // gravity
    this.left += this.x_velocity;
    this.bottom += this.y_velocity;
    this.x_velocity *= 0.9; // friction
    // this.y_velocity *= 0.9; // friction

    //  Jumping/Up Direction Movement
    if (this.up_dir && this.jumping == false) {
      this.y_velocity += 13;
      this.jumping = true;
    }

    // Left Direction Movement
    if (this.left_dir) {
      this.x_velocity -= 0.8;
    }

    // Right Direction Movements
    if (this.right_dir) {
      this.x_velocity += 0.8;
    }

    //  Prevent the player to go beneath the ground :)
    if (this.bottom <= 0) {
      this.jumping = false;
      this.bottom = 1;
      this.y_velocity = 0;
    }
    if (this.isFirstPlayer) {
      // Prevent the player 1 to go far LEFT
      if (this.left < 0) {
        this.left = 0;
      }
      // Prevent the player 1 to go far RIGHT
      if (this.left > this.gameCanvas.offsetWidth / 2 - this.width) {
        this.left = this.gameCanvas.offsetWidth / 2 - this.width;
      }
    } else {
      // Prevent the player 2 to go far LEFT
      if (this.left <= this.gameCanvas.offsetWidth / 2 + 10) {
        this.left = this.gameCanvas.offsetWidth / 2 + 10;
      }
      // Prevent the player 2 to go far RIGHT
      if (this.left > this.gameCanvas.offsetWidth - this.width) {
        this.left = this.gameCanvas.offsetWidth - this.width;
      }
    }

    this.updatePosition();
  }

  movementController(event) {
    let key_state = event.type == 'keydown' ? true : false;
    if (this.isFirstPlayer) {
      // Player 1 (left)
      switch (event.keyCode) {
        case 65: // A key
          this.left_dir = key_state;
          break;
        case 87: // W key
          this.up_dir = key_state;
          break;
        case 68: // D key
          this.right_dir = key_state;
          break;
      }
    } else {
      // Player 2 (right)
      switch (event.keyCode) {
        case 37: // arrow left key
          this.left_dir = key_state;
          break;
        case 38: // arrow up key
          this.up_dir = key_state;
          break;
        case 39: // arrow right key
          this.right_dir = key_state;
          break;
      }
    }

    this.updatePosition();
  }

  updatePosition() {
    this.playerElement.style.left = `${this.left}px`;
    this.playerElement.style.bottom = `${this.bottom}px`;
  }
}
