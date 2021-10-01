const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0];
const nums = input[1]
  .trim()
  .split(' ')
  .map((x) => +x)
  .sort((a, b) => a - b);

function init() {
  let front = 0;
  let back = n - 1;
  let min = Infinity;
  const ans = new Array(2).fill(0);

  while (front < back) {
    const sum = nums[front] + nums[back];
    if (Math.abs(min) > Math.abs(sum)) {
      min = sum;
      ans[0] = nums[front];
      ans[1] = nums[back];
    }
    if (front + 1 < back) {
      const next1 = nums[front + 1] + nums[back];
      const next2 = nums[front] + nums[back - 1];
      Math.abs(next1) < Math.abs(next2) ? front++ : back--;
    } else {
      front++;
    }
  }
  console.log(ans.sort((a, b) => a - b).join(' '));
}

init();
