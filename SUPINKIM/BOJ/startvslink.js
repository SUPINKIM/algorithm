const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const N = +input[0];
const members = N / 2;
const arr = new Array(N).fill(0).map((_, idx) => idx + 1);

let min = Infinity;

const transformTable = () => {
  const table = [];
  for (let i = 1; i <= N; i++) {
    const row = input[i].split(' ').map((x) => +x);
    table.push(row);
  }
  return table;
};

const table = transformTable();

const findOpponent = (array) => {
  let temp = new Array(N).fill(0).map((_, idx) => idx + 1);
  temp = temp.filter((num) => {
    if (array.includes(num)) {
      return false;
    }
    return true;
  });
  return temp;
};

const sumSynergy = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const row = array[i] - 1;
      const col = array[j] - 1;
      sum += table[row][col];
      sum += table[col][row];
    }
  }
  return sum;
};

const combi = (nums, array = []) => {
  if (array.length === members) {
    min = Math.min(
      min,
      Math.abs(sumSynergy([...array]) - sumSynergy(findOpponent([...array])))
    );
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    array.push(nums[i]);
    combi(nums.slice(i + 1), array);
    if (min === 0) return;
    array.pop();
  }
};

combi(arr);
console.log(min);
