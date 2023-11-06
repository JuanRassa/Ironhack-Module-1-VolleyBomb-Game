class Game {
  constructor(width = 1000, height = 500, gravity) {
    // ATTRIBUTES
    this.body = document.querySelector('body');
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.gameCanvas = document.getElementById('game-canvas');
    this.endGameScreen = document.getElementById('end-game-screen');

    this.net = new Net(this.gameCanvas, 10, 100, width / 2, 'black');
    this.playerOne = new Player(this.gameCanvas, width / 8, 120, 60, './assets/Player1.png', true);
    this.playerTwo = new Player(this.gameCanvas, width - width / 8 - 200, 120, 60, './assets/Player2.png', false);
    this.ball = new Ball(this.gameCanvas, width, height, 800, 50, 44, 44, this.playerOne, this.playerTwo);

    this.width = width;
    this.height = height;
    this.gravity = gravity;
    this.isGameOver = false;
  }

  // METHODS
  start() {
    this.gameCanvas.style.width = `${this.width}px`;
    this.gameCanvas.style.height = `${this.height}px`;

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
    this.playerOne.move();
    this.playerTwo.move();
    this.ball.moveBall();
    this.detectCollision();

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

    const playerOneScoreDOM = document.getElementById('player-one-number-score');
    const playerTwoScoreDOM = document.getElementById('player-two-number-score');
  }

  detectCollision() {
    const playerOne = this.playerOne.playerElement;
    const playerTwo = this.playerTwo.playerElement;
    const ball = this.ball.ball;
    console.log('kick the ball');
    const playerOneRect = playerOne.getBoundingClientRect();
    const playerTwoRect = playerTwo.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    // console.log('Player One Rect:', playerOneRect);

    if (playerOne && playerTwo && ball) {
      if (
        ballRect.right > playerOneRect.left &&
        ballRect.left < playerOneRect.right &&
        ballRect.top < playerOneRect.bottom &&
        ballRect.bottom > playerOneRect.top
      ) {
        // console.log('Collision with Player One');
        if (this.ball.velocityX > 0) {
          // console.log('Changing direction for Player One');
          this.ball.velocityX = -this.ball.velocityX;
        }
      }

      if (
        ballRect.right > playerTwoRect.left &&
        ballRect.left < playerTwoRect.right &&
        ballRect.top < playerTwoRect.bottom &&
        ballRect.bottom > playerTwoRect.top
      ) {
        // console.log('Collision with Player Two');
        if (this.ball.velocityX > 0) {
          // console.log('Changing direction for Player Two');
          this.ball.velocityX = -this.ball.velocityX;
        }
      }
    }
  }
}
