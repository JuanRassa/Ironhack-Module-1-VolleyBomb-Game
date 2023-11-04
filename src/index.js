window.onload = function () {
  const startButton = document.querySelector('.start-button');
  const game = new Game(1200, 480);

  startButton.addEventListener('click', () => {
    game.start();
  });

  const keyDownHandle = e => {
    // e.preventDefault();
    console.log(e);
    switch (e.code) {
      case 'KeyW':
        game.playerOne.directionY = 8;
        break;
      case 'KeyA':
        game.playerOne.directionX = -8;
        break;
      case 'KeyD':
        game.playerOne.directionX = 8;
        break;

      case 'ArrowUp':
        game.playerTwo.directionY = 8;
        break;
      case 'ArrowLeft':
        game.playerTwo.directionX = -8;
        break;
      case 'ArrowRight':
        game.playerTwo.directionX = 8;
        break;

      default:
        break;
    }
  };

  window.addEventListener('keydown', keyDownHandle);

  window.addEventListener('keyup', e => {
    // e.preventDefault();
    console.log(e);
    switch (e.code) {
      case 'KeyW':
        game.playerOne.directionY = game.playerOne.directionY;
        break;
      case 'KeyA':
        game.playerOne.directionX = game.playerOne.directionX;
        break;
      case 'KeyD':
        game.playerOne.directionX = game.playerOne.directionX;
        break;

      case 'ArrowUp':
        game.playerTwo.directionY = -8;
        break;
      case 'ArrowLeft':
        game.playerTwo.directionX = -8;
        break;
      case 'ArrowRight':
        game.playerTwo.directionX = 8;
        break;

      default:
        break;
    }
  });
};
