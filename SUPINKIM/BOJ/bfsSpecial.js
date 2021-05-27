const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0];

let adj = Array.from(Array(n + 1), () => new Array());
for (let i = 1; i <= n - 1; i++) {
  const [a, b] = input[i].split(' ').map((x) => +x);
  adj[a].push(b);
  adj[b].push(a);
}
let solved = input[n]
  .trim()
  .split(' ')
  .map((x) => +x);
//먼저 나온 정점을 먼저 방문한 것

let order = new Array(n + 1).fill(0);
for (let [idx, a] of solved.entries()) {
  order[a] = idx;
}

//adj 정렬하기
for (let i = 1; i <= n; i++) {
  adj[i].sort((a, b) => order[a] - order[b]);
}

let visited = new Array(n + 1).fill(false);
visited[1] = true;
let ans = [];
const bfs = (start) => {
  let queue = [start];
  while (queue.length) {
    let now = queue.shift();
    ans.push(now);

    for (let a of adj[now]) {
      if (visited[a]) continue;
      visited[a] = true;
      queue.push(a);
    }
  }
};

bfs(1);

ans.join(' ') === solved.join(' ') ? console.log(1) : console.log(0);
