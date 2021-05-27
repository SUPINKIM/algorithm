const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0];
const noWork = +input[1];
let possible = new Array(10).fill(0).map((_, idx) => idx);
if (noWork > 0) {
  const disorder = input[2]
    .trim()
    .split(' ')
    .map((x) => +x);
  possible = possible.filter((x) => !disorder.includes(x));
}

let result = new Set();

//중복 순열 구하기
function combi(num, len, arr = []) {
  if (num === len) {
    let newNum = +arr.join('');
    return result.add(newNum);
  }
  for (let i = 0; i < possible.length; i++) {
    arr.push(possible[i]);
    combi(num + 1, len, arr);
    arr.pop();
  }
}

if (n === 100) console.log(0);
else {
  for (let i = 1; i <= 6; i++) {
    combi(0, i);
  }
  let arr = [...result];
  let min = Math.abs(n - 100); //오직 +,- 버튼으로만 이동하는 경우

  for (let a of arr) {
    let num = Math.abs(n - a);
    num += String(a).length; //숫자 버튼 횟수 세기
    if (min > num) {
      min = num;
    }
  }

  console.log(min);
}
