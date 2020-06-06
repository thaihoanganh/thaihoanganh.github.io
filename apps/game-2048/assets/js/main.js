var n = 4;
var score = 0;
var numbers = [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var x, y;

var main = document.getElementById('main');

main.style.height = `${main.offsetWidth}px`;

main.addEventListener('touchstart', function (event) {
  x = event.touches[0].screenX;
  y = event.touches[0].screenY;
});

main.addEventListener('touchend', function (event) {
  var subX = event.changedTouches[0].screenX - x;
  var subY = event.changedTouches[0].screenY - y;

  if (Math.abs(subX) - Math.abs(subY) > 0) {
    if (subX > 0) swipeRight();
    else swipeLeft();
  } else {
    if (subY > 0) swipeDown();
    else swipeUp();
  }
});

document.addEventListener('keydown', function (event) {
  console.log(event.code);
  switch (event.code) {
    case 'ArrowUp':
      swipeUp();
      break;
    case 'ArrowRight':
      swipeRight();
      break;
    case 'ArrowDown':
      swipeDown();
      break;
    case 'ArrowLeft':
      swipeLeft();
      break;
    default:
      break;
  }
});

function swipeRight() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - 1; j++) {
      for (var jj = n - 1; jj >= 0; jj--) {
        if (
          jj !== 0 &&
          (numbers[n * i + jj] === numbers[n * i + jj - 1] || numbers[n * i + jj] === 0)
        ) {
          if (numbers[n * i + jj] !== 0) score += numbers[n * i + jj - 1];
          numbers[n * i + jj] += numbers[n * i + jj - 1];
          numbers[n * i + jj - 1] = 0;
        }
      }
    }
  }
  gameOver() === false ? render(false) : render(true);
}
function swipeLeft() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - 1; j++) {
      for (var jj = 0; jj < n; jj++) {
        if (
          jj !== n - 1 &&
          (numbers[n * i + jj] === numbers[n * i + jj + 1] || numbers[n * i + jj] === 0)
        ) {
          if (numbers[n * i + jj] !== 0) score += numbers[n * i + jj + 1];
          numbers[n * i + jj] += numbers[n * i + jj + 1];
          numbers[n * i + jj + 1] = 0;
        }
      }
    }
  }
  gameOver() === false ? render(false) : render(true);
}
function swipeDown() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - 1; j++) {
      for (var jj = n - 1; jj >= 0; jj--) {
        if (
          jj !== 0 &&
          (numbers[n * jj + i] === numbers[n * jj + i - n] || numbers[n * jj + i] === 0)
        ) {
          if (numbers[n * jj + i] !== 0) score += numbers[n * jj + i - n];
          numbers[n * jj + i] += numbers[n * jj + i - n];
          numbers[n * jj + i - n] = 0;
        }
      }
    }
  }
  gameOver() === false ? render(false) : render(true);
}
function swipeUp() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - 1; j++) {
      for (var jj = 0; jj < n; jj++) {
        if (
          jj !== n - 1 &&
          (numbers[n * jj + i] === numbers[n * jj + i + n] || numbers[n * jj + i] === 0)
        ) {
          if (numbers[n * jj + i] !== 0) score += numbers[n * jj + i + n];
          numbers[n * jj + i] += numbers[n * jj + i + n];
          numbers[n * jj + i + n] = 0;
        }
      }
    }
  }
  gameOver() === false ? render(false) : render(true);
}

function gameOver() {
  if (numbers.indexOf(0) !== -1) {
    var arr = [];
    numbers.map(function (number, index) {
      if (number === 0) arr.push(index);
    });
    numbers[arr[Math.floor(Math.random() * arr.length)]] = 2;
    return false;
  } else {
    return true;
  }
}

function render(gameOver) {
  if (gameOver === false) {
    var content = '';
    numbers.map(function (number) {
      content += `<div class="number number-${number}">${number === 0 ? '' : number}</div>`;
    });
    main.innerHTML = content;
    document.getElementById('score').textContent = score;
  } else {
    alert('Game Over');
    score = 0;
    numbers = [];
    for (var i = 0; i < n * n - 1; i++) {
      numbers.push(0);
    }
    numbers.push(2);
    render(false);
  }
}

render(false);