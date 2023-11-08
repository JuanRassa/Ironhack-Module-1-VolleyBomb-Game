class Game {
  constructor(canvasWidth = 1000, canvasHeight = 500, maxScore = 5) {
    // ATTRIBUTES
    this.body = document.querySelector('body');
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.gameCanvas = document.getElementById('game-canvas');
    this.endGameScreen = document.getElementById('end-game-screen');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.net = new Net(this.gameCanvas, 10, 50, canvasWidth / 2, 'gold');
    this.playerOne = new Player(this.gameCanvas, canvasWidth / 8, 120, 60, './assets/Player1.png', true);
    this.playerTwo = new Player(this.gameCanvas, canvasWidth - canvasWidth / 8 - 200, 120, 60, './assets/Player2.png', false);
    this.ball = new Ball(this.gameCanvas, canvasWidth, canvasHeight, this.canvasWidth / 8 + 38, 50, 44, 44, this.playerOne, this.playerTwo);

    this.p1Score = 0;
    this.p2Score = 0;
    this.maxScore = maxScore;
    this.winner = '';
    this.p2WonRound = false;

    this.isRoundOver = false;
  }
  d;
  // METHODS
  start() {
    this.gameCanvas.style.width = `${this.canvasWidth}px`;
    this.gameCanvas.style.height = `${this.canvasHeight}px`;

    this.gameScreen.classList.remove('display-none');
    this.gameScreen.classList.toggle('opacity-out');
    this.welcomeScreen.classList.toggle('display-none');
    this.body.classList.remove('body-welcome-state');
    this.loop();
  }

  loop() {
    if (this.isGameOver()) {
      this.endGame();
      return;
    }
    if (this.isRoundOver) {
      return setTimeout(() => {
        this.restartRound();
      }, 1000);
    }
    this.update();
    this.checkScore();

    window.requestAnimationFrame(() => this.loop());
  }
  restartRound() {
    // Init State-Position of Ball
    this.ball.velocityX = 0;
    this.ball.velocityY = 8;
    this.ball.top = 50;
    if (this.p2WonRound) {
      this.ball.left = this.canvasWidth - this.canvasWidth / 8 - 200 + 38;
    } else {
      this.ball.left = this.canvasWidth / 8 + 38;
    }
    // Init State-Position of P1
    this.playerOne.left = this.canvasWidth / 8;
    this.playerOne.x_velocity = 0;
    this.playerOne.y_velocity = 0;
    // Init State-Position of P2
    this.playerTwo.left = this.canvasWidth - this.canvasWidth / 8 - 200;
    this.playerTwo.x_velocity = 0;
    this.playerTwo.y_velocity = 0;
    this.isRoundOver = false;
    this.loop();
  }
  update() {
    this.playerOne.move();
    this.playerTwo.move();
    this.ball.moveBall();
    this.detectCollision();
  }
  checkScore() {
    if (this.ball.didHitGround()) {
      const ballElementDOM = this.ball.element_DOM;
      const ballRect = ballElementDOM.getBoundingClientRect();

      if (Math.floor(ballRect.x + 20 - 112) + 20 > 0 && Math.floor(ballRect.x + 20 - 112) < this.canvasWidth / 2) {
        this.p2Score++;
        this.p2WonRound = true;
        this.isRoundOver = true;
      }
      if (Math.floor(ballRect.x + 20 - 112) > this.canvasWidth / 2 && Math.floor(ballRect.x + 20 - 112) < this.canvasWidth) {
        this.p1Score++;
        this.p2WonRound = false;
        this.isRoundOver = true;
      }
    }
    const playerOneScoreDOM = document.getElementById('player-one-number-score');
    playerOneScoreDOM.innerText = this.p1Score;
    const playerTwoScoreDOM = document.getElementById('player-two-number-score');
    playerTwoScoreDOM.innerText = this.p2Score;
  }
  detectCollision() {
    //  Ball's data:
    const ball = this.ball.element_DOM;
    const ballRect = ball.getBoundingClientRect();
    const ball_leftPos = ballRect.left;
    const ball_rightPos = ballRect.right;
    const ball_topPos = ballRect.top;
    const ball_bottomPos = ballRect.bottom;
    const ball_centerPos = this.ball.width / 2;
    //  Player 1 data:
    const p1 = this.playerOne.playerElement;
    const p1Rect = p1.getBoundingClientRect();
    const p1_leftPos = p1Rect.left;
    const p1_rightPos = p1Rect.right;
    const p1_topPos = p1Rect.top;
    const p1_bottomPos = p1Rect.bottom;
    const p1_centerPos = this.playerOne.width / 2;
    //  Player 2 data:
    const p2 = this.playerTwo.playerElement;
    const p2Rect = p2.getBoundingClientRect();
    const p2_leftPos = p2Rect.left;
    const p2_rightPos = p2Rect.right;
    const p2_topPos = p2Rect.top;
    const p2_bottomPos = p2Rect.bottom;
    const p2_centerPos = this.playerTwo.width / 2;

    if (p1 && p2 && ball) {
      // Detect collision with P1
      if (ball_rightPos > p1_leftPos && ball_leftPos < p1_rightPos && ball_topPos < p1_bottomPos && ball_bottomPos > p1_topPos) {
        // Ball touches the top of the player 1, bounces straight up:
        if (Math.floor(ball_leftPos + ball_centerPos) === Math.floor(p1_leftPos + p1_centerPos)) {
          this.ball.velocityX = 0;
        }
        // Ball touches the back of P1 -> Ball's direction is negative (left)
        else if (ball_leftPos + ball_centerPos > p1_leftPos && ball_leftPos + ball_centerPos < p1_leftPos + p1_centerPos) {
          if (this.ball.velocityX === 0) this.ball.velocityX = -8;
          this.ball.velocityX = -Math.abs(this.ball.velocityX);
        }
        // Ball touches the front of P1 -> Ball's direction is positive (right)
        else if (ball_leftPos + ball_centerPos > p1_leftPos + p1_centerPos && ball_leftPos + ball_centerPos < p1_rightPos) {
          if (this.ball.velocityX === 0) this.ball.velocityX = 8;
          this.ball.velocityX = Math.abs(this.ball.velocityX);
        }

        if (this.ball.velocityY > 0) {
          this.ball.velocityY = -this.ball.velocityY;
        }
      }

      // Detect collision with P2
      if (ball_rightPos > p2_leftPos && ball_leftPos < p2_rightPos && ball_topPos < p2_bottomPos && ball_bottomPos > p2_topPos) {
        // console.log('Ball', Math.floor(ball_leftPos + ball_centerPos));
        // console.log('P2', Math.floor(p2_leftPos + p2_centerPos));
        // Ball touches the top of the player 1, bounces straight up:
        if (Math.floor(ball_leftPos + ball_centerPos) === Math.floor(p2_leftPos + p2_centerPos)) {
          this.ball.velocityX = 0;
        }
        // Ball touches the front of P2 -> Ball's direction is negative (left)
        else if (ball_leftPos + ball_centerPos > p2_leftPos && ball_leftPos + ball_centerPos < p2_leftPos + p2_centerPos) {
          if (this.ball.velocityX === 0) this.ball.velocityX = -8;
          this.ball.velocityX = -Math.abs(this.ball.velocityX);
        }
        // Ball touches the back of P2 -> Ball's direction is positive (right)
        else if (ball_leftPos + ball_centerPos > p2_leftPos + p2_centerPos && ball_leftPos + ball_centerPos < p2_rightPos) {
          if (this.ball.velocityX === 0) this.ball.velocityX = 8;
          this.ball.velocityX = Math.abs(this.ball.velocityX);
        }
        if (this.ball.velocityY > 0) {
          this.ball.velocityY = -this.ball.velocityY;
        }
      }
    }
  }
  // ******
  endGame() {
    this.gameScreen.style.display = 'none';
    this.endGameScreen.style.display = 'block';
  }

  isGameOver() {
    if (this.p1Score === this.maxScore) {
      this.winner = 'Player One';
      alert('P1 Wins!');
      return true;
    }
    if (this.p2Score === this.maxScore) {
      this.winner = 'Player Two';
      alert('P2 Wins!');
      return true;
    }
    return false;
  }
}
