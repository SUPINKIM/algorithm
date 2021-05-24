const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0];

let adj = Array.from(Array(100001), () => new Array());
let order = new Array(100001);

for (let i = 1; i <= n - 1; i++) {
  const [start, end] = input[i].split(' ').map((x) => +x);
  adj[start].push(end);
  adj[end].push(start);
}

const answer = input[n]
  .trim()
  .split(' ')
  .map((x) => +x);

for (let [idx, a] of answer.entries()) {
  order[a] = idx;
}

for (let i = 1; i < order.length; i++) {
  if (adj[i].length > 0) {
    adj[i].sort((a, b) => order[b] - order[a]);
  }
}

if (answer[0] !== 1) {
  console.log(0);
} else {
  let visited = new Array(100001).fill(false);

  let ans = [];

  const dfs = (start) => {
    let stack = [start];

    while (stack.length) {
      let now = stack.pop();
      visited[now] = true;
      ans.push(now);
      for (let a of adj[now]) {
        if (visited[a]) continue;
        stack.push(a);
      }
    }
  };
  dfs(1);

  ans.join('').trim() === answer.join('').trim()
    ? console.log(1)
    : console.log(0);
}
