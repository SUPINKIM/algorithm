const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [N, M] = input[0].split(' ').map((x) => +x);
const array = new Array(N).fill(0).map((_, index) => index + 1);
const result = [];
const combination = (nums, len, arr = []) => {
  if (len === M) {
    result.push([...arr]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i]);
    combination(nums.slice(i), len + 1, arr);
    arr.pop();
  }
};

combination(array, 0);

let ans = '';
for (let r of result) {
  ans += r.join(' ');
  ans += '\n';
}

console.log(ans.trim());
