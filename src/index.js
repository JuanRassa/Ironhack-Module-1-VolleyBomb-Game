window.onload = function () {
  const startButton = document.querySelector('.start-button');
  const game = new Game();

  startButton.addEventListener('click', () => {
    game.start();
  });
};
