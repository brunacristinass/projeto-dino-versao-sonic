const Sonic = document.querySelector('.Sonic');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          Sonic.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      Sonic.style.bottom = position + 'px';
    }
  }, 20);
}

function createmotobug() {
  const motobug = document.createElement('div');
  let motobugPosition = 1000;
  let randomTime = Math.random() * 6000;

  /*if (isGameOver) return;*/

  motobug.classList.add('motobug');
  motobug.style.left = motobugPosition + 'px';
  background.appendChild(motobug);
  

  let leftTimer = setInterval(() => {
    if (motobugPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(motobug);
    } else if (motobugPosition > 0 && motobugPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      /*isGameOver = true;*/
      document.body.innerHTML = '<h1 class="game-over"><center>FIM DE JOGO</center></h1>';
    } else {
      motobugPosition -= 10;
      motobug.style.left = motobugPosition + 'px';
    }
  }, 20);

  setTimeout(createmotobug, randomTime);
}

createmotobug();
document.addEventListener('keyup', handleKeyUp);
