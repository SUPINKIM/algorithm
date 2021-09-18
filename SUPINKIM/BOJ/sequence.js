const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0];
let nums = input[1]
  .trim()
  .split(' ')
  .map((x) => +x);

let dp1 = [];
dp1[0] = nums[0];
for (let i = 1; i < nums.length; i++) {
  dp1[i] = nums[i] + Math.max(dp1[i - 1], 0);
}
let max = Math.max(...dp1);

let dp2 = [];
const reverseNums = nums.reverse();
dp2[0] = reverseNums[0];

for (let [index, value] of reverseNums.entries()) {
  if (!index) continue;
  dp2[index] = reverseNums[index] + Math.max(dp2[index - 1], 0);
}

const { length } = dp2;

for (let i = 1; i < length - 1; i++) {
  if (max < dp1[i - 1] + dp2[length - 2 - i]) {
    max = dp1[i - 1] + dp2[length - 2 - i];
  }
}

console.log(max);
