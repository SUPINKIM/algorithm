const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const map = Array.from(new Array(9), () => new Array());
for (let i = 0; i < 9; i++) {
  const row = input[i].split(' ').map((x) => +x);
  map[i] = row;
}
const next = [];

function checkSquare([r, c], num) {
  const rowStart = Math.floor(r / 3) * 3;
  const colStart = Math.floor(c / 3) * 3;

  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (i === r && j === c) continue;
      if (map[i][j] === num) return false;
    }
  }
  return true;
}

function checkCol([r, c], num) {
  for (let i = 0; i < 9; i++) {
    if (i !== r && map[i][c] === num) return false;
  }
  return true;
}

function checkRow([r, c], num) {
  for (let i = 0; i < 9; i++) {
    if (i !== c && map[r][i] === num) return false;
  }
  return true;
}

function findZero() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (map[i][j] === 0) {
        next.push([i, j]);
      }
    }
  }
}

let flag = true;
function init(count) {
  if (!flag) return;
  if (count === next.length) {
    map.forEach((line) => console.log(line.join(' ')));
    flag = false;
    return;
  }
  const [r, c] = next[count];
  for (let i = 1; i <= 9; i++) {
    map[r][c] = i;
    if (checkRow([r, c], i) && checkCol([r, c], i) && checkSquare([r, c], i)) {
      init(count + 1);
    }
    map[r][c] = 0;
  }
}

findZero();
init(0);
