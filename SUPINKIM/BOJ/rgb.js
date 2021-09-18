const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const n = +input[0];
const map = Array.from(new Array(n), () => new Array());
let visited = Array.from(new Array(n), () => new Array(n).fill(false));

function checkSameColor(color1, color2) {
  if (color1 === color2) {
    return true;
  }
  if (color1 === 'R' || color1 === 'G') {
    if (color2 === 'R' || color2 === 'G') {
      return true;
    }
  }
  return false;
}

function checkSameColorReal(color1, color2) {
  return color1 === color2 ? true : false;
}

function dfs(start, fn) {
  const stack = [start];

  while (stack.length) {
    const [row, col] = stack.pop();
    visited[row][col] = true;

    const color = map[row][col];

    for (let i = 0; i < dx.length; i++) {
      if (
        row + dx[i] < 0 ||
        row + dx[i] >= n ||
        col + dy[i] < 0 ||
        col + dy[i] >= n
      )
        continue;
      if (!visited[row + dx[i]][col + dy[i]]) {
        if (fn(color, map[row + dx[i]][col + dy[i]])) {
          stack.push([row + dx[i], col + dy[i]]);
        }
      }
    }
  }
}

function init() {
  for (let i = 1; i <= n; i++) {
    map[i - 1] = input[i].trim().split('');
  }

  let result = '';
  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        dfs([i, j], checkSameColorReal);
        count++;
      }
    }
  }

  result += `${count} `;
  count = 0;
  visited = Array.from(new Array(n), () => new Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        dfs([i, j], checkSameColor);
        count++;
      }
    }
  }

  result += count;

  console.log(result);
}

init();
