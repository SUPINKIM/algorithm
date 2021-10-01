const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function init() {
  const n = +input[0].trim();
  const nums = input[1]
    .trim()
    .split(' ')
    .map((x) => +x)
    .sort((a, b) => a - b);
  const x = +input[2].trim();

  const { length } = nums;

  let front = 0;
  let back = length - 1;

  let ans = 0;

  while (front < back) {
    const twoSum = nums[front] + nums[back];
    if (twoSum === x) {
      ans++;
      front++;
      back--;
    } else if (twoSum < x) {
      front++;
    } else {
      back--;
    }
  }
  console.log(ans);
}

init();
