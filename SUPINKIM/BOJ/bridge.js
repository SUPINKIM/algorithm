const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

function init() {
  const N = +input[0];
  const map = new Array(N);
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  let min = Infinity;

  for (let i = 1; i <= N; i++) {
    const row = input[i].split(' ').map((x) => +x);
    map[i - 1] = row;
  }

  const checkComponentsCount = () => {
    const visit = Array.from(new Array(N), () => new Array(N).fill(false));
    const dfs = (start, index) => {
      const stack = [start];

      while (stack.length) {
        const [row, col] = stack.pop();
        visit[row][col] = true;
        map[row][col] = index;

        for (let i = 0; i < 4; i++) {
          if (
            row + dx[i] < 0 ||
            row + dx[i] >= N ||
            col + dy[i] < 0 ||
            col + dy[i] >= N
          )
            continue;
          if (
            map[row + dx[i]][col + dy[i]] === 1 &&
            !visit[row + dx[i]][col + dy[i]]
          ) {
            stack.push([row + dx[i], col + dy[i]]);
          }
        }
      }
    };

    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] === 1 && !visit[i][j]) {
          count++;
          dfs([i, j], count);
        }
      }
    }
    return count;
  };

  let visited = Array.from(new Array(N), () => new Array(N).fill(false));

  const bfs = (start) => {
    const queue = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] === start) {
          queue.push([i, j, 0]);
        }
      }
    }

    while (queue.length) {
      const [row, col, distance] = queue.shift();

      for (let i = 0; i < 4; i++) {
        if (
          row + dx[i] < 0 ||
          row + dx[i] >= N ||
          col + dy[i] < 0 ||
          col + dy[i] >= N
        )
          continue;
        if (visited[row + dx[i]][col + dy[i]]) continue;

        if (
          map[row + dx[i]][col + dy[i]] &&
          map[row + dx[i]][col + dy[i]] !== start
        ) {
          return distance;
        }

        if (!map[row + dx[i]][col + dy[i]]) {
          visited[row + dx[i]][col + dy[i]] = true;
          queue.push([row + dx[i], col + dy[i], distance + 1]);
        }
      }
    }
  };

  const components = checkComponentsCount();

  for (let i = 1; i <= components; i++) {
    const result = bfs(i);
    min = Math.min(min, result);
    visited = Array.from(new Array(N), () => new Array(N).fill(false));
  }

  console.log(min);
}

init();
