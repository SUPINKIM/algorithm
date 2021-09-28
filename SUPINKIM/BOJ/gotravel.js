const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input[0];
const m = +input[1];
const adj = Array.from(new Array(n), () => new Array());
const visitplan = input[2 + n].split(' ').map((x) => Number(x) - 1);

const parent = new Array(n).fill(0).map((_, idx) => idx);
const rank = new Array(n).fill(0);

function find(u) {
  if (u === parent[u]) return u;

  return (parent[u] = find(parent[u]));
}

function union(u, v) {
  const parentU = find(u);
  const parentV = find(v);

  if (parentU === parentV) return;

  if (rank[parentU] < rank[parentV]) [parentU, parentV] = [parentV, parentU];
  parent[parentV] = parentU;
  rank[parentU] += rank[parentV];

  if (rank[parentU] === rank[parentV]) {
    rank[parentV]++;
  }
}

function init() {
  for (let i = 2; i < 2 + n; i++) {
    const row = input[i].split(' ').map((x) => +x);
    for (let [idx, r] of row.entries()) {
      if (r) {
        adj[i - 2].push(idx);
      }
    }
  }
  for (let [index, a] of adj.entries()) {
    a.forEach((node) => union(index, node));
  }

  let flag = true;
  for (let i = 0; i < visitplan.length - 1; i++) {
    if (find(visitplan[i]) !== find(visitplan[i + 1])) {
      flag = false;
      break;
    }
  }
  flag ? console.log('YES') : console.log('NO');
}

init();
