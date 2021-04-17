//트리의 지름 풀이
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
let n = +input[0];

let adj = Array.from(Array(n + 1), () => new Array());

//간선 정보 저장하기
for (let i = 1; i <= n; i++) {
  let temp = input[i].split(' ').map((x) => +x);
  let start = +temp[0];
  let vertex = temp.slice(1);
  vertex.pop();
  for (let v = 0; v < vertex.length; v += 2) {
    let end = vertex[v];
    let weight = vertex[v + 1];
    adj[start].push([end, weight]); //연결된 정점과 그 사이 간선의 가중치 값을 저장
  }
}

let visited = new Array(n + 1).fill(false);
let dist = 0;
let idx = 0;
let dfs = (start) => {
  let stack = [[start, 0]];
  while (stack.length) {
    let [now, nowCost] = stack.pop();
    visited[now] = true;

    for (let a of adj[now]) {
      let [to, cost] = a;
      if (!visited[to]) {
        stack.push([to, nowCost + cost]);
      }
    }
    if (dist < nowCost) {
      dist = nowCost;
      idx = now;
    }
  }
};
dfs(1); //임의의 점 x

dist = 0;
visited = new Array(n + 1).fill(false);
dfs(idx); //임의의 점 x로부터 가장 멀리 떨어진 y

console.log(dist);
