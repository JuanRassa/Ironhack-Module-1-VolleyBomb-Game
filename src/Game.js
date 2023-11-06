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
    this.ball = new Ball(this.gameCanvas, width, height, -30, 50, 44, 44, this.playerOne, this.playerTwo);

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
    // console.log('kick the ball');
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
        console.log('*****');
        console.log('Ball Left:', ballRect.left);
        console.log('Ball Right:', ballRect.right);
        console.log('-----');
        console.log('Player Left:', playerOneRect.left);
        console.log('Player Right:', playerOneRect.right);
        console.log('*****');

        // To the Left
        if (ballRect.left + 20 > playerOneRect.left && ballRect.left + 20 < playerOneRect.left + 60) {
          this.ball.velocityX = -Math.abs(this.ball.velocityX);
          // alert(`
          //   LEFT! Ball X: ${ballRect.left + 20};
          //   Player Left: ${playerOneRect.left}
          //   Player Half: ${playerOneRect.left + 60}
          //   VelocityX: ${this.ball.velocityX}
          //   `);
        }
        // To the Right
        if (ballRect.left + 20 > playerOneRect.left + 60 && ballRect.left + 20 < playerOneRect.right) {
          this.ball.velocityX = Math.abs(this.ball.velocityX);
          //   alert(`
          //     RIGHT! Ball X: ${ballRect.left + 20};
          //     Player Half: ${playerOneRect.left + 60}
          //     Player Right: ${playerOneRect.right}
          //     VelocityX: ${this.ball.velocityX}
          // `);
        }

        if (this.ball.velocityY > 0) {
          this.ball.velocityY = -this.ball.velocityY;
        }
      }

      if (
        ballRect.right > playerTwoRect.left &&
        ballRect.left < playerTwoRect.right &&
        ballRect.top < playerTwoRect.bottom &&
        ballRect.bottom > playerTwoRect.top
      ) {
        console.log('Collision with Player Two');
        // To the Left
        if (ballRect.left + 20 > playerTwoRect.left && ballRect.left + 20 < playerTwoRect.left + 60) {
          this.ball.velocityX = -Math.abs(this.ball.velocityX);
          // alert(`
          //   LEFT! Ball X: ${ballRect.left + 20};
          //   Player Left: ${playerOneRect.left}
          //   Player Half: ${playerOneRect.left + 60}
          //   VelocityX: ${this.ball.velocityX}
          //   `);
        }
        // To the Right
        if (ballRect.left + 20 > playerTwoRect.left + 60 && ballRect.left + 20 < playerTwoRect.right) {
          this.ball.velocityX = Math.abs(this.ball.velocityX);
          //   alert(`
          //     RIGHT! Ball X: ${ballRect.left + 20};
          //     Player Half: ${playerOneRect.left + 60}
          //     Player Right: ${playerOneRect.right}
          //     VelocityX: ${this.ball.velocityX}
          // `);
        }
        if (this.ball.velocityY > 0) {
          this.ball.velocityY = -this.ball.velocityY;
        }
      }
    }
  }
}
