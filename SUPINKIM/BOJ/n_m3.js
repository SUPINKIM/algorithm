//백준 온라인 저지 N과 M(3) 문제 풀이

/* [문제 설명] 
1. 1부터 n까지의 자연수 중 m개를 고른 수열
2. 같은 수를 여러 번 골라도 된다. -> 중복 수열
*/

const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

const n = +input[0];
const m = +input[1];

const nums = new Array(n + 1).fill(0).map((_, idx) => idx);
nums.shift();

let result = '';
const permu = (num, arr = []) => {
  if (num === m) {
    return (result += `${arr.join(' ')}\n`);
  }
  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i]);
    permu(num + 1, arr);
    arr.pop();
  }
};

permu(0);
console.log(result.trim());
