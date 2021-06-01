const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [a, b] = input[0].split(' ').map((x) => +x);
const m = +input[1];
let nums = input[2].split(' ').map((x) => +x);

function changeToTen(num) {
  let sum = 0;
  let count = 0;
  for (let idx = nums.length - 1; idx >= 0; idx--) {
    sum += nums[idx] * Math.pow(num, count);
    count++;
  }
  return sum;
}

function changeToB(num) {
  let q = Math.floor(num / b);
  let left = `${num % b} `;
  while (q > 0) {
    left = `${q % b} ` + left;
    q = Math.floor(q / b);
  }

  return left;
}

let res = changeToTen(a);
let ans = changeToB(res);

console.log(ans.trim());
