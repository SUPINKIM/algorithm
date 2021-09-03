const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
let stations = 0;
let inputs = '';

rl.on('line', (input) => {
  if (count === 0) {
    stations = +input;
  } else {
    inputs += input.trim() + '\n';
  }
  count++;
  if (count - 1 === stations) {
    solution();
    rl.close();
  }
}).on('close', () => {
  process.exit();
});

function solution() {
  const map = Array.from(new Array(stations + 1), () => new Array());
  const arr = inputs.trim().split('\n');

  for (let a of arr) {
    const [start, end] = a.split(' ').map((x) => +x);
    map[start].push(end);
    map[end].push(start);
  }

  let cycle = null;
  let start = null;
  let flag = false;
  const visited = new Array(stations + 1).fill(0);

  const dfs = (count, now) => {
    if (flag) return;

    for (let next of map[now]) {
      if (!visited[next]) {
        visited[next] = 1;
        dfs(count + 1, next);
        visited[next] = 0;
      } else if (count >= 3 && start === next) {
        flag = true;
        cycle = visited.slice();
        return;
      }
    }
  };

  const bfs = (start) => {
    const queue = [[start, 0]];
    const visited2 = new Array(stations + 1).fill(0);
    visited2[start] = 1;

    while (queue.length) {
      const [now, dist] = queue.shift();

      if (cycle[now]) return dist;

      for (let next of map[now]) {
        if (!visited2[next]) {
          queue.push([next, dist + 1]);
          visited2[next] = 1;
        }
      }
    }
  };

  for (let i = 1; i <= stations; i++) {
    start = i;
    visited[i] = 1;
    dfs(1, i);
    if (flag) break;
    visited[i] = 0;
  }

  let ans = '';
  for (let i = 1; i < cycle.length; i++) {
    if (cycle[i]) {
      ans += '0 ';
    } else {
      ans += bfs(i) + ' ';
    }
  }
  console.log(ans.trim());
}
