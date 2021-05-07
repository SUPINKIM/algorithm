function solution(n, s, a, b, fares) {
  let map = Array.from(Array(n + 1), () => new Array(n + 1).fill(Infinity));
  for (let i = 1; i <= n; i++) {
    map[i][i] = 0;
  }

  for (let fare of fares) {
    let [node1, node2, cost] = fare;
    map[node1][node2] = cost;
    map[node2][node1] = cost;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        if (map[j][i] + map[i][k] < map[j][k]) {
          map[j][k] = map[j][i] + map[i][k];
        }
      }
    }
  }

  let min = map[s][a] + map[s][b];
  for (let [idx, m] of map.entries()) {
    if (min > map[s][idx] + m[a] + m[b]) {
      min = map[s][idx] + m[a] + m[b];
    }
  }
  return min;
}
