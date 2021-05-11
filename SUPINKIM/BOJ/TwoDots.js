const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map((x) => +x);

let map = Array.from(Array(n), () => new Array());

for (let i = 1; i <= n; i++) {
  map[i - 1] = input[i].split('');
}

let visited = Array.from(Array(n), () => new Array(m).fill(false));
let check = Array.from(Array(n), () => new Array(m).fill(false));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let cycle = false;

const dfs = (start) => {
  let stack = [start];
  let count = 0;
  let parent = [];
  while (stack.length) {
    let [row, col] = stack.pop();
    if (check[row][col] && count >= 4) {
      cycle = true;
      break;
    }
    count++;
    visited[row][col] = true;

    for (let i = 0; i < dx.length; i++) {
      if (
        row + dx[i] < 0 ||
        row + dx[i] >= n ||
        col + dy[i] < 0 ||
        col + dy[i] >= m
      )
        continue;
      if (map[row + dx[i]][col + dy[i]] !== map[row][col]) continue;
      if (!parent.includes([row + dx[i], col + dy[i]].join('/'))) {
        stack.push([row + dx[i], col + dy[i]]);
      }
    }
    check[row][col] = true;
    parent.push([row, col].join('/'));
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visited[i][j]) dfs([i, j]);
  }
}

if (cycle) console.log('Yes');
else console.log('No');
