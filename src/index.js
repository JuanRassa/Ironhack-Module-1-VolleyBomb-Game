window.onload = function () {
  const startButton = document.querySelector('.start-button');
  const endButton = document.querySelector('#restart-button');
  // const restartButton = document.querySelector('.restart-button');
  const game = new Game(1200, 550);

  const soundToggle = document.querySelector('#sound-toggle-header');
  let isPlaying = false;
  const song = new Audio('/assets/audio/track.mp3');
  song.loop = true;
  song.volume = 0.5;
  soundToggle.addEventListener('click', () => {
    if (!isPlaying) {
      isPlaying = true;
      song.play();
      soundToggle.classList.add('sound-on');
      soundToggle.classList.remove('sound-off');
    } else {
      isPlaying = false;
      song.pause();
      soundToggle.classList.add('sound-off');
      soundToggle.classList.remove('sound-on');
    }
  });

  startButton.addEventListener('click', () => {
    game.start();
    window.addEventListener('keydown', e =>
      game.playerOne.movementController(e)
    );
    window.addEventListener('keyup', e => game.playerOne.movementController(e));
    window.addEventListener('keydown', e =>
      game.playerTwo.movementController(e)
    );
    window.addEventListener('keyup', e => game.playerTwo.movementController(e));
  });

  endButton.addEventListener('click', () => {
    window.location.reload();
  });
};
