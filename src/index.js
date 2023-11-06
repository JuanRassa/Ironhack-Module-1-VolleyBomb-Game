window.onload = function () {
  const startButton = document.querySelector('.start-button');
  const game = new Game(1200, 480);

  startButton.addEventListener('click', () => {
    game.start();
  });

  window.addEventListener('keydown', e => game.playerOne.movementController(e));
  window.addEventListener('keyup', e => game.playerOne.movementController(e));
  window.addEventListener('keydown', e => game.playerTwo.movementController(e));
  window.addEventListener('keyup', e => game.playerTwo.movementController(e));
};
