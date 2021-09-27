const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m, h] = input[0].split(' ').map((x) => +x);
const map = Array.from(new Array(m), () =>
  new Array(n).fill(0).map((x) => new Array(h))
);
const visited = Array.from(new Array(m), () =>
  new Array(n).fill(0).map((x) => new Array(h).fill(false))
);

let count = 0;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
const dh = [-1, 1];

function checkTomato() {
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < m; j++) {
      for (let y = 0; y < n; y++) {
        if (map[j][y][i] === 0) return false;
      }
    }
  }
  return true;
}

function bfs(start) {
  const queue = start;
  let index = 0;
  while (index < queue.length) {
    const [row, col, height, day] = queue[index];

    if (count < day) count = day;
    //상,하,좌,우
    for (let i = 0; i < dx.length; i++) {
      if (
        row + dx[i] < 0 ||
        row + dx[i] >= m ||
        col + dy[i] < 0 ||
        col + dy[i] >= n
      )
        continue;

      if (
        map[row + dx[i]][col + dy[i]][height] === 0 &&
        !visited[row + dx[i]][col + dy[i]][height]
      ) {
        map[row + dx[i]][col + dy[i]][height] = 1;
        queue.push([row + dx[i], col + dy[i], height, day + 1]);
      }
    }

    for (let i = 0; i < dh.length; i++) {
      if (height + dh[i] < 0 || height + dh[i] >= h) continue;
      if (
        map[row][col][height + dh[i]] === 0 &&
        !visited[row][col][height + dh[i]]
      ) {
        map[row][col][height + dh[i]] = 1;
        queue.push([row, col, height + dh[i], day + 1]);
      }
    }
    index++;
  }
}

function init() {
  for (let j = 1; j <= h; j++) {
    for (let i = 1; i <= m; i++) {
      const index = i + m * (j - 1);
      const row = input[index].split(' ').map((x) => +x);
      for (let y = 0; y < n; y++) {
        map[i - 1][y][j - 1] = row[y];
      }
    }
  }

  const temp = [];
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < m; j++) {
      for (let y = 0; y < n; y++) {
        if (!visited[j][y][i] && map[j][y][i] === 1) {
          temp.push([j, y, i, 0]);
        }
      }
    }
  }

  if (checkTomato()) {
    console.log(count);
    return;
  }

  bfs(temp);

  if (checkTomato()) {
    console.log(count);
  } else {
    console.log(-1);
  }
}

init();
