const fs = require('fs');
const [n, m] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map((x) => +x);

function countFive(num) {
  let count = 0;
  while (num) {
    num = Math.floor(num / 5);
    count += num;
  }
  return count;
}

function countTwo(num) {
  let count = 0;
  while (num) {
    num = Math.floor(num / 2);
    count += num;
  }
  return count;
}

function init() {
  const operand1 = { twoCount: countTwo(n), fiveCount: countFive(n) };
  const operand2 = { twoCount: countTwo(n - m), fiveCount: countFive(n - m) };
  const operand3 = { twoCount: countTwo(m), fiveCount: countFive(m) };

  const resultTwo = operand1.twoCount - (operand2.twoCount + operand3.twoCount);
  const resultFive =
    operand1.fiveCount - (operand2.fiveCount + operand3.fiveCount);

  return Math.min(resultFive, resultTwo);
}

console.log(init());
