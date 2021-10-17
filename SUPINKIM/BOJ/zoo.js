const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim();

const n = +input;

function init() {
  const dp = [1, 3];
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.floor((2 * dp[i - 1] + dp[i - 2]) % 9901);
  }
  console.log(dp[n]);
}

init();
