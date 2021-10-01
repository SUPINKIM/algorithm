const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, k] = input[0].split(' ').map((x) => +x);

function init() {
  const dp = Array.from(new Array(n + 1), () => new Array());

  dp[0][0] = 0;
  dp[1][0] = 1;
  dp[1][1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= k; j++) {
      if (j === 0 || i === j) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % 10007;
      }
    }
  }
  console.log(dp[n][k]);
}

init();
