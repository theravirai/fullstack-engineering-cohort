const bird = document.querySelector('.bird-png');
const game = document.querySelector('.game');

let birdTop = 250;
let gravity = 2;

setInterval(() => {
  birdTop += gravity;
  bird.style.top = birdTop + 'px';
}, 20);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    birdTop -= 60;
  }
});

function createPipe() {
  const pipeTop = document.createElement('div');
  const pipeBottom = document.createElement('div');
  pipeTop.classList.add('pipe');
  pipeBottom.classList.add('pipe');
  game.appendChild(pipeTop);
  game.appendChild(pipeBottom);
  pipeTop.style.height = Math.random() * 200 + 100 + 'px';
  pipeBottom.style.height = Math.random() * 200 + 100 + 'px';
}