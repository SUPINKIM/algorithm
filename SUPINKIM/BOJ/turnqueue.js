const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map((x) => +x);
const position = input[1].split(' ').map((x) => +x);

let nums = new Array(n).fill(0).map((_, index) => index + 1);

const moveLeft = (num) => {
  const queue = [...nums];
  let count = 0;
  while (queue[0] !== num) {
    const item = queue.shift();
    queue.push(item);
    count++;
  }
  return { result: queue.slice(1), count };
};

const moveRight = (num) => {
  const queue = [...nums];
  let count = 0;
  while (queue[0] !== num) {
    const item = queue.pop();
    queue.unshift(item);
    count++;
  }
  return { result: queue.slice(1), count };
};

const init = () => {
  let ans = 0;
  for (let p of position) {
    const resultLeft = moveLeft(p);
    const resultRight = moveRight(p);
    const min = resultLeft.count < resultRight.count ? resultLeft : resultRight;
    const { result, count } = min;
    nums = [...result];
    ans += count;
  }
  console.log(ans);
};

init();
