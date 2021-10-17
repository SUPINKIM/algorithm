const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input[0];

const adj = Array.from(new Array(n + 1), () => new Array());
const parent = new Array(n + 1).fill(-1);
const visited = new Array(n + 1).fill(false);
const rank = Array.from(new Array(n + 1), () => new Array(2).fill(0));

function find(u) {
  if (parent[u] === u) return u;

  return parent[u];
}

function dfs(start) {
  const stack = [start];

  while (stack.length) {
    const [now, level] = stack.pop();
    visited[now] = true;
    for (let a of adj[now]) {
      const [node, value] = a;
      if (!visited[node]) {
        parent[node] = now;
        rank[node][0] = level + 1; //깊이
        rank[node][1] = value; //부모와의 거리
        stack.push([node, level + 1]);
      }
    }
  }
}

function init() {
  for (let i = 1; i < n; i++) {
    const [node1, node2, distance] = input[i]
      .trim()
      .split(' ')
      .map((x) => +x);
    adj[node1].push([node2, distance]);
    adj[node2].push([node1, distance]);
  }
  parent[1] = 1; //1부터 시작

  dfs([1, 0]);
  const m = +input[n];

  let ans = '';
  for (let i = n + 1; i < n + m + 1; i++) {
    let [n1, n2] = input[i].split(' ').map((x) => +x);
    let sum = 0;
    if (rank[n1][0] !== rank[n2][0]) {
      if (rank[n1][0] > rank[n2][0]) [n1, n2] = [n2, n1];
      while (rank[n1][0] < rank[n2][0]) {
        if (n1 === n2) break;
        sum += rank[n2][1];
        n2 = find(n2);
      }
    }
    while (n1 !== n2) {
      sum += rank[n1][1] + rank[n2][1];
      n1 = find(n1);
      n2 = find(n2);
    }
    ans += `${sum}\n`;
  }
  console.log(ans.trim());
}

init();
