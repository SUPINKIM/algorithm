const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const map = Array.from(new Array(8), () => new Array());
const visited = Array.from(new Array(8), () =>
  new Array(8).fill(0).map((_) => new Array(65).fill(false))
);

const dx = [0, 0, 0, -1, 1, -1, -1, 1, 1];
const dy = [0, -1, 1, 0, 0, -1, 1, -1, 1];

let arrive = false;

function bfs(start) {
  let queue = [start];

  while (queue.length) {
    const [row, col, sec] = queue.shift();
    if (row === 0 && col === 7) {
      arrive = true;
      break;
    }

    for (let i = 0; i < dx.length; i++) {
      if (
        row + dx[i] < 0 ||
        row + dx[i] >= 8 ||
        col + dy[i] < 0 ||
        col + dy[i] >= 8
      )
        continue;
      if (visited[row + dx[i]][col + dy[i]][sec + 1]) continue;
      if (row + dx[i] - sec >= 0 && map[row + dx[i] - sec][col + dy[i]] === '#')
        continue;

      if (row + dx[i] - (sec + 1) < 0) {
        visited[row + dx[i]][col + dy[i]][sec + 1] = true;
        queue.push([row + dx[i], col + dy[i], sec + 1]);
      } else if (
        row + dx[i] - (sec + 1) >= 0 &&
        map[row + dx[i] - (sec + 1)][col + dy[i]] === '.'
      ) {
        visited[row + dx[i]][col + dy[i]][sec + 1] = true;
        queue.push([row + dx[i], col + dy[i], sec + 1]);
      }
    }
  }
}

function init() {
  for (let i = 0; i < 8; i++) {
    map[i] = input[i].split('');
  }
  visited[7][0][0] = true;
  bfs([7, 0, 0]);
  arrive ? console.log(1) : console.log(0);
}

init();
