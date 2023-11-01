const body = document.querySelector('body');
const welcomeScreen = document.querySelector('#welcome-screen');
const gameScreen = document.querySelector('#game-screen');
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', function () {
  console.log('it worked');
  gameScreen.classList.remove('display-none');
  gameScreen.classList.toggle('opacity-out');
  welcomeScreen.classList.toggle('display-none');
  body.classList.remove('body-welcome-state');
});
