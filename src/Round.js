class Round {
  constructor() {
    this.isOver = false;
    this.timer = 60;
  }

  start() {
    if (
      this.game.playerOneScore === this.game.maxScore ||
      this.game.playerTwoScore === this.game.maxScore
    ) {
      this.game.endGame();
    } else {
      this.loop();
    }
  }
  loop() {
    window.requestAnimationFrame(() => this.game.gameLoop());
    this.update();
  }
  update() {
    if (this.ball.didHitGround() === false) {
      return this.loop();
    } else {
      this.isOver = true;
    }
  }
  end() {
    // this.game.playerOne.reposition(100);
    // this.game.playerTwo.reposition(800);
  }
}
