const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

input.pop();

let result = '';

function combination(nums, arr = []) {
  if (arr.length === 6) {
    const temp = [...arr];
    temp.sort((a, b) => a - b);
    result += `${temp.join(' ')}\n`;
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i]);
    combination(nums.slice(i + 1), arr);
    arr.pop();
  }
}

function init() {
  for (let line of input) {
    const [k, ...nums] = line.split(' ').map((x) => +x);
    combination(nums);
    result += '\n';
  }

  console.log(result.trim());
}

init();
