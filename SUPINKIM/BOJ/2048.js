const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0];

let max = -Infinity;

function moveLeft(map) {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j++) {
      let index = j;
      while (index > 0 && map[i][index - 1] === 0) {
        map[i][index - 1] = map[i][index];
        map[i][index] = 0;
        index--;
      }
    }
  }
  return map;
}

function moveRight(map) {
  for (let i = 0; i < n; i++) {
    for (let j = n - 2; j >= 0; j--) {
      let index = j;
      while (index < n && map[i][index + 1] === 0) {
        map[i][index + 1] = map[i][index];
        map[i][index] = 0;
        index++;
      }
    }
  }
  return map;
}

function moveUp(map) {
  for (let j = 0; j < n; j++) {
    for (let i = 1; i < n; i++) {
      let index = i;
      while (index > 0 && map[index - 1][j] === 0) {
        map[index - 1][j] = map[index][j];
        map[index][j] = 0;
        index--;
      }
    }
  }
  return map;
}

function moveDown(map) {
  for (let j = 0; j < n; j++) {
    for (let i = n - 2; i >= 0; i--) {
      let index = i;
      while (index < n - 1 && map[index + 1][j] === 0) {
        map[index + 1][j] = map[index][j];
        map[index][j] = 0;
        index++;
      }
    }
  }
  return map;
}

function sumLeft(map) {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j++) {
      if (map[i][j - 1] === map[i][j]) {
        map[i][j - 1] += map[i][j];
        map[i][j] = 0;
      }
    }
  }
  return map;
}

function sumRight(map) {
  for (let i = 0; i < n; i++) {
    for (let j = n - 2; j >= 0; j--) {
      if (map[i][j] === map[i][j + 1]) {
        map[i][j + 1] += map[i][j];
        map[i][j] = 0;
      }
    }
  }
  return map;
}

function sumUp(map) {
  for (let j = 0; j < n; j++) {
    for (let i = 1; i < n; i++) {
      if (map[i - 1][j] === map[i][j]) {
        map[i - 1][j] += map[i][j];
        map[i][j] = 0;
      }
    }
  }
  return map;
}
function sumDown(map) {
  for (let j = 0; j < n; j++) {
    for (let i = n - 2; i >= 0; i--) {
      if (map[i][j] === map[i + 1][j]) {
        map[i + 1][j] += map[i][j];
        map[i][j] = 0;
      }
    }
  }
  return map;
}

function checkChange(map1, map2) {
  let flag = false;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map1[i][j] !== map2[i][j]) {
        flag = true;
      }
      max = Math.max(max, map2[i][j]);
    }
  }
  return flag;
}

function backTracking(map, count) {
  if (count === 5) {
    return;
  }

  const origin = [];
  for (let i = 0; i < n; i++) {
    origin.push([...map[i]]);
  }

  [
    [moveLeft, sumLeft],
    [moveRight, sumRight],
    [moveUp, sumUp],
    [moveDown, sumDown],
  ].forEach(([move, sum]) => {
    const next = [];
    for (let i = 0; i < n; i++) {
      next.push([...map[i]]);
    }
    move(next);
    sum(next);
    move(next);
    if (checkChange(origin, next)) {
      backTracking(next, count + 1);
    }
  });
}

function init() {
  const map = Array.from(new Array(n), () => new Array());
  for (let i = 1; i <= n; i++) {
    map[i - 1] = input[i]
      .trim()
      .split(' ')
      .map((x) => +x);
  }
  backTracking(map, 0);
  console.log(max);
}

init();
