//knuth's optimization : 크누스 알고리즘

const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const testcase = +input[0];

function init() {
  for (let i = 1, j = 1; i <= testcase; i++) {
    const k = +input[j++];
    const chapters = input[j++].split(' ').map((x) => +x);
    const psum = chapters.reduce(
      (prev, cur) => {
        prev.push(prev[prev.length - 1] + cur);
        return prev;
      },
      [0]
    );

    const dp = Array.from(new Array(k + 1), () => new Array(k + 1).fill(0));
    for (let i = 1; i <= k; i++) {
      for (let tx = 1; i + tx <= k; tx++) {
        let ty = tx + i;
        dp[tx][ty] = Infinity;

        for (let mid = tx; mid < ty; mid++) {
          if (
            dp[tx][ty] >
            dp[tx][mid] + dp[mid + 1][ty] + psum[ty] - psum[tx - 1]
          ) {
            dp[tx][ty] =
              dp[tx][mid] + dp[mid + 1][ty] + psum[ty] - psum[tx - 1];
          }
        }
      }
    }
    console.log(dp[1][k]);
  }
}
init();
