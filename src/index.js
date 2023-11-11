window.onload = function () {
  const startButton = document.querySelector('.start-button');
  const endButton = document.querySelector('#restart-button');
  // const restartButton = document.querySelector('.restart-button');
  const game = new Game(1200, 480);

  startButton.addEventListener('click', () => {
    game.start();
    const song = new Audio('/assets/audio/track.mp3');
    song.loop = true;
    song.play();
    window.addEventListener('keydown', e => game.playerOne.movementController(e));
    window.addEventListener('keyup', e => game.playerOne.movementController(e));
    window.addEventListener('keydown', e => game.playerTwo.movementController(e));
    window.addEventListener('keyup', e => game.playerTwo.movementController(e));
  });

  endButton.addEventListener('click', () => {
    window.location.reload();
  });
};
