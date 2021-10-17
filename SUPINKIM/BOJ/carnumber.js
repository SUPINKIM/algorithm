const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('');

let ans = 1;

for (let i = 0; i < input.length; i++) {
  let count = input[i] === 'c' ? 26 : 10;
  if (i > 0 && input[i - 1] === input[i]) {
    count -= 1;
  }
  ans *= count;
}

console.log(ans);
