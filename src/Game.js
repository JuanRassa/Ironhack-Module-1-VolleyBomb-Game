class Game {
  constructor(width = 1000, height = 500, velocityX, velocityY) {
    // ATTRIBUTES
    this.body = document.querySelector('body');
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.gameCanvas = document.getElementById('game-canvas');
    this.endGameScreen = document.getElementById('end-game-screen');
    this.ball = new Ball(this.gameCanvas, width, height, width / 8, 50, 44, 44);

    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.isGameOver = false;

    // this.playerOne = new Player(this.gameScreen, 200, 500, 50, 80, './images/car.png');
    // this.playerTwo = new Player(this.gameScreen, 200, 500, 50, 80, './images/car.png');
    // this.Net = new Net();
  }

  // METHODS
  start() {
    console.log('it worked');

    //  setting the game screen size
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.gameScreen.classList.remove('display-none');
    this.gameScreen.classList.toggle('opacity-out');
    this.welcomeScreen.classList.toggle('display-none');
    this.body.classList.remove('body-welcome-state');

    this.gameLoop();
  }

  gameLoop() {
    // console.log('Inside the game loop...');
    if (this.isGameOver) {
      return;
    }
    this.update();
    this.updateStats();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.ball.moveBall();

    /*
    this.obstacles.forEach((obstacle, index) => {
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(index, 1);

        this.lives--;
      } else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles.splice(index, 1);
        this.score++;
      }
    });
    */
    if (this.lives === 0) {
      this.endGame();
    }
  }
  endGame() {
    // this.player.element.remove();
    this.obstacles.forEach(obs => obs.element.remove());
    this.isGameOver = true;

    this.gameScreen.style.display = 'none';
    this.endGameScreen.style.display = 'block';
  }
  updateStats() {
    //  Call to the BallBomb() method that evaluates if:
    //  - it touched the ground
    //  - which was the last player to touch the ball

    const playerOneScoreDOM = document.getElementById(
      'player-one-number-score'
    );
    const playerTwoScoreDOM = document.getElementById(
      'player-two-number-score'
    );
  }
}
