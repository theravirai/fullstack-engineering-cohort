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
  // create a wrapper for the top/bottom pipe so they move together
  const pair = document.createElement('div');
  pair.classList.add('pipe-pair');

  // use CSS-styled divs for pipes (no image needed)
  const pipeTop = document.createElement('div');
  const pipeBottom = document.createElement('div');
  pipeTop.classList.add('pipe', 'pipe-top');
  pipeBottom.classList.add('pipe', 'pipe-bottom');

  pair.appendChild(pipeTop);
  pair.appendChild(pipeBottom);
  game.appendChild(pair);

  const gap = 150; // vertical gap between top and bottom pipe
  const topHeight = Math.random() * 300 + 100; // random top height (scaled for 800px game area)
  pipeTop.style.height = topHeight + 'px';
  pipeBottom.style.height = (game.clientHeight - topHeight - gap) + 'px';

  // position the pair at the right edge
  let left = game.clientWidth;
  pair.style.left = left + 'px';
  pair.style.position = 'absolute';
  pair.style.top = '0';
  pair.style.height = '100%';

  // animate the pair moving left
  const speed = 3; // px per frame
  const interval = setInterval(() => {
    left -= speed;
    pair.style.left = left + 'px';

    // remove when off-screen
    if (left + 70 < 0) { // 70 matches the pipe-pair width
      clearInterval(interval);
      pair.remove();
    }
  }, 20);
}

// spawn pipes periodically
setInterval(createPipe, 2000);
