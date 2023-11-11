class Game {
  constructor(canvasWidth = 1000, canvasHeight = 500, maxScore = 5, bombTimer = 20) {
    // ATTRIBUTES
    this.body = document.querySelector('body');
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.gameCanvas = document.getElementById('game-canvas');
    this.endGameScreen = document.getElementById('end-game-screen');
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.net = new Net(this.gameCanvas, 10, 50, this.canvasWidth / 2, 'gold');
    this.playerOne = new Player(this.gameCanvas, this.canvasWidth / 2 - this.canvasWidth / 4 - 120, 120, 60, './assets/Player1.png', true);
    this.playerTwo = new Player(this.gameCanvas, this.canvasWidth / 2 + this.canvasWidth / 4, 120, 60, './assets/Player2.png', false);
    this.ball = new Ball(
      this.gameCanvas,
      canvasWidth,
      canvasHeight,
      // this.canvasWidth / 2 - this.canvasWidth / 4 - 82,
      this.canvasWidth / 2 + this.canvasWidth / 4 + 37,
      50,
      44,
      44,
      this.playerOne,
      this.playerTwo
    );
    this.gameBallVelocity = 11;

    this.p1Score = 0;
    this.p2Score = 0;
    this.maxScore = maxScore;
    this.winner = '';
    this.p2WonRound = false;

    this.isRoundOver = false;
    this.round = new Round(this.isGameOver, this.timer);

    this.bombTimer = bombTimer; // Time of the round in seconds
    this.timerElement = document.getElementById('timer-bomb');
    this.timeLeft = this.bombTimer;
    this.timerInterval = null;
    this.hasBombExploded = false;

    this.gameResult = document.getElementById('game-result');
    this.playerOneFinalScore = document.getElementById('player-one-finalscore');
    this.playerTwoFinalScore = document.getElementById('player-two-finalscore');

    this.explosionSound = new Audio('/assets/audio/bomb-explosion.wav');
    this.playerAudio = new Audio('/assets/audio/player-sound.wav');
    this.playerAudio.playbackRate = 1;
  }

  // METHODS
  start() {
    this.gameCanvas.style.width = `${this.canvasWidth}px`;
    this.gameCanvas.style.height = `${this.canvasHeight}px`;

    this.gameScreen.classList.remove('display-none');
    this.gameScreen.classList.toggle('opacity-out');
    this.welcomeScreen.classList.toggle('display-none');
    this.body.classList.remove('body-welcome-state');
    setTimeout(() => {
      this.startRoundTimer();
      this.loop();
    }, 1000);
  }

  startRoundTimer() {
    this.timeLeft = this.bombTimer;
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft === 0) {
        this.stopRoundTimer();
        this.hasBombExploded = true;
        // this.isRoundOver = true;
      }
    }, 1000);
  }

  stopRoundTimer() {
    clearInterval(this.timerInterval);
  }

  updateTimerDisplay() {
    this.timerElement.innerText = `${this.timeLeft}s`;
  }

  loop() {
    if (this.isGameOver()) {
      this.ball.explosion();
      this.stopRoundTimer();
      setTimeout(() => {
        this.endGame();
      }, 600);
      return;
    }
    if (this.isRoundOver) {
      this.ball.explosion();
      return setTimeout(() => {
        this.stopRoundTimer();
        this.restartRound();
      }, 1000);
    }
    this.update();
    this.checkScore();

    window.requestAnimationFrame(() => this.loop());
  }

  restartRound() {
    // Init State-Position of Ball
    this.ball.element_DOM.style.display = 'block';
    this.ball.explosion_element_DOM.remove();
    this.ball.velocityX = 0;
    this.ball.velocityY = this.gameBallVelocity;
    this.ball.top = 50;
    if (this.p2WonRound) {
      this.ball.left = this.canvasWidth / 2 + this.canvasWidth / 4 + 38;
    } else {
      this.ball.left = this.canvasWidth / 2 - this.canvasWidth / 4 - 82;
    }
    // Init State-Position of P1
    this.playerOne.left = this.canvasWidth / 2 - this.canvasWidth / 4 - 120;
    this.playerOne.x_velocity = 0;
    this.playerOne.y_velocity = 0;
    // Init State-Position of P2
    this.playerTwo.left = this.canvasWidth / 2 + this.canvasWidth / 4;
    this.playerTwo.x_velocity = 0;
    this.playerTwo.y_velocity = 0;
    this.isRoundOver = false;
    this.hasBombExploded = false;

    this.startRoundTimer();
    this.timeLeft = this.bombTimer;
    this.updateTimerDisplay();
    this.loop();
  }
  update() {
    this.playerOne.move();
    this.playerTwo.move();
    this.ball.moveBall();
    this.detectCollision();
  }
  checkScore() {
    if (this.ball.didHitGround() || this.hasBombExploded) {
      const ballElementDOM = this.ball.element_DOM;
      const ballRect = ballElementDOM.getBoundingClientRect();
      const gameCanvasRect = this.gameCanvas.getBoundingClientRect();
      this.explosionSound.play();
      if (Math.floor(ballRect.x + 22 - gameCanvasRect.x) > 0 && Math.floor(ballRect.x + 22 - gameCanvasRect.x) < this.canvasWidth / 2) {
        this.p2Score++;
        this.p2WonRound = true;
        this.isRoundOver = true;
      }
      if (
        Math.floor(ballRect.x + 22 - gameCanvasRect.x) > this.canvasWidth / 2 &&
        Math.floor(ballRect.x + 22 - gameCanvasRect.x) < this.canvasWidth
      ) {
        this.p1Score++;
        this.p2WonRound = false;
        this.isRoundOver = true;
      }
    }
    const playerOneScoreDOM = document.getElementById('score-player-1');
    playerOneScoreDOM.innerText = this.p1Score;
    const playerTwoScoreDOM = document.getElementById('score-player-2');
    playerTwoScoreDOM.innerText = this.p2Score;
  }
  explosionScore() {
    if (
      Math.floor(ballRect.x + 22 - this.gameCanvas.getBoundingClientRect().x) > 0 &&
      Math.floor(ballRect.x + 22 - this.gameCanvas.getBoundingClientRect().x) < this.canvasWidth / 2
    ) {
      this.p2Score++;
      this.p2WonRound = true;
      this.isRoundOver = true;
    }
    if (
      Math.floor(ballRect.x + 22 - this.gameCanvas.getBoundingClientRect().x) > this.canvasWidth / 2 &&
      Math.floor(ballRect.x + 22 - this.gameCanvas.getBoundingClientRect().x) < this.canvasWidth
    ) {
      this.p1Score++;
      this.p2WonRound = false;
      this.isRoundOver = true;
    }
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

    // if (p1 && p2 && ball) {
    // Detect collision with P1
    if (ball_rightPos > p1_leftPos && ball_leftPos < p1_rightPos && ball_topPos < p1_bottomPos && ball_bottomPos > p1_topPos) {
      this.playerAudio.play();
      // Ball touches the top of the player 1, bounces straight up:
      if (Math.floor(ball_leftPos + ball_centerPos) === Math.floor(p1_leftPos + p1_centerPos)) {
        this.ball.velocityX = 0;
      }
      // Ball touches the back of P1 -> Ball's direction is negative (left)
      else if (ball_rightPos > p1_leftPos && ball_rightPos < p1_leftPos + p1_centerPos) {
        if (this.ball.velocityX === 0) this.ball.velocityX = -this.gameBallVelocity;
        this.ball.velocityX = -Math.abs(this.ball.velocityX);
      }
      // Ball touches the front of P1 -> Ball's direction is positive (right)
      else if (ball_leftPos >= p1_leftPos + p1_centerPos && ball_leftPos <= p1_rightPos) {
        if (this.ball.velocityX === 0) this.ball.velocityX = this.gameBallVelocity;
        this.ball.velocityX = Math.abs(this.ball.velocityX);
      }

      if (this.ball.velocityY > 0) {
        this.ball.velocityY = -this.ball.velocityY;
      }
    }

    // Detect collision with P2
    if (ball_rightPos > p2_leftPos && ball_leftPos < p2_rightPos && ball_topPos < p2_bottomPos && ball_bottomPos > p2_topPos) {
      this.playerAudio.play();
      // Ball touches the top of the player 1, bounces straight up:
      if (Math.floor(ball_leftPos + ball_centerPos) === Math.floor(p2_leftPos + p2_centerPos)) {
        this.ball.velocityX = 0;
      }
      // Ball touches the front of P2 -> Ball's direction is negative (left)
      else if (ball_rightPos >= p2_leftPos && ball_rightPos <= p2_leftPos + p2_centerPos) {
        // alert('<-');
        if (this.ball.velocityX === 0) this.ball.velocityX = -this.gameBallVelocity;
        this.ball.velocityX = -Math.abs(this.ball.velocityX);
      }
      // Ball touches the back of P2 -> Ball's direction is positive (right)
      else if (ball_leftPos > p2_leftPos + p2_centerPos && ball_leftPos < p2_rightPos) {
        // alert('->');
        if (this.ball.velocityX === 0) this.ball.velocityX = this.gameBallVelocity;
        this.ball.velocityX = Math.abs(this.ball.velocityX);
      }
      if (this.ball.velocityY > 0) {
        this.ball.velocityY = -this.ball.velocityY;
      }
    }

    // }
  }
  // ******
  endGame() {
    this.gameScreen.style.display = 'none';
    this.endGameScreen.style.display = 'flex';
  }

  isGameOver() {
    this.playerOneFinalScore.innerText = `Player 1 Score: ${this.p1Score}`;
    this.playerTwoFinalScore.innerText = `Player 2 Score: ${this.p2Score}`;

    if (this.p1Score === this.maxScore) {
      this.winner = 'Player One';
      // alert('P1 Wins!');
      this.gameResult.innerText = `${this.winner} Wins!`;
      return true;
    }
    if (this.p2Score === this.maxScore) {
      this.winner = 'Player Two';
      // alert('P2 Wins!');
      this.gameResult.innerText = `${this.winner} Wins!`;
      return true;
    }

    return false;
  }
}
