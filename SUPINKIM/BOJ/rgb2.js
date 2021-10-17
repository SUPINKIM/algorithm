const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0].trim();
const dp = Array.from(new Array(n), () => new Array(3).fill(-1));

function init() {
  let ans = Infinity;
  const map = Array.from(new Array(n), () => new Array());
  for (let i = 1; i <= n; i++) {
    map[i - 1] = input[i].split(' ').map((x) => +x);
  }

  for (let k = 0; k < 3; k++) {
    for (let i = 0; i < 3; i++) {
      if (i === k) dp[0][i] = map[0][i];
      else dp[0][i] = Infinity;
    }
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < 3; j++) {
        const [a, b] = [0, 1, 2].filter((x) => x !== j);
        dp[i][j] = Math.min(dp[i - 1][a], dp[i - 1][b]) + map[i][j];
      }
    }

    for (let i = 0; i <= 2; i++) {
      if (i == k) continue; // k 인경우 건너뜀
      ans = Math.min(ans, dp[n - 1][i]); // 나머지 경우의 최솟값을 구함
    }
  }
  console.log(ans);
}

init();
