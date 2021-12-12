const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = +input[0];
let numbers = [-1];
const result = [];

const pushNumber = (value) => {
  let index = numbers.length;
  if (index === 1) {
    numbers.push(value);
    return;
  }
  numbers[index] = value;

  while (index >= 1) {
    const parent = Math.floor(index / 2);
    if (numbers[parent] <= numbers[index]) {
      break;
    }

    [numbers[parent], numbers[index]] = [numbers[index], numbers[parent]];
    index = parent;
  }
};

const popMinNumber = () => {
  if (numbers.length === 1) {
    result.push(0);
    return numbers;
  }

  if (numbers.length === 2) {
    result.push(numbers[1]);
    numbers.pop();
    return numbers;
  }

  result.push(numbers[1]);

  numbers[1] = numbers.pop();
  let index = 1;
  while (index < numbers.length) {
    const left = index * 2;
    const right = index * 2 + 1;

    let next = index;

    if (left >= numbers.length) break;

    if (numbers[next] > numbers[left]) {
      next = left;
    }
    if (numbers[next] > numbers[right]) {
      next = right;
    }
    if (next === index) break;
    [numbers[next], numbers[index]] = [numbers[index], numbers[next]];
    index = next;
  }

  return numbers;
};

const init = () => {
  for (let i = 1; i <= n; i++) {
    if (!+input[i]) {
      numbers = popMinNumber();
    } else {
      pushNumber(+input[i]);
    }
  }
};

init();
console.log(result.join('\n').trim());
