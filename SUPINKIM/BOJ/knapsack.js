const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n, k] = input[0].split(' ').map((x) => +x);
let dp = Array.from(new Array(n + 1), () => new Array(k + 1).fill(0));

for (let i = 1; i <= n; i++) {
  const [w, v] = input[i]
    .trim()
    .split(' ')
    .map((x) => +x);
  for (let j = 0; j <= k; j++) {
    if (w > j) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v);
    }
  }
}

console.log(dp[n][k]);
