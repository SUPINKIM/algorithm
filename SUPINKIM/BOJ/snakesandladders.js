const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((x) => +x);
const visited = new Array(101).fill(false);
const adj = new Array(101).fill(0);

function bfs(start) {
  const queue = [[start, 0]];
  let index = 0;
  let min = 0;

  while (index < queue.length) {
    const [now, count] = queue[index];

    if (now === 100) {
      min = count;
      break;
    }

    for (let i = 1; i <= 6; i++) {
      if (now + i >= 1 && now + i <= 100 && !visited[now + i]) {
        visited[now + i] = true;
        if (adj[now + i] !== 0) {
          const move = adj[now + i];
          visited[move] = true;
          queue.push([move, count + 1]);
        } else {
          queue.push([now + i, count + 1]);
        }
      }
    }
    index++;
  }
  return min;
}

function init() {
  for (let i = 1; i <= n + m; i++) {
    const [start, end] = input[i]
      .trim()
      .split(' ')
      .map((x) => +x);
    adj[start] = end;
  }

  const result = bfs(1);

  console.log(result);
}

init();
