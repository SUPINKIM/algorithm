const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0]
  .trim()
  .split(' ')
  .map((x) => +x);
const map = [];
const check = [];
const EXPONENT = n * m - 1;
let max = -Infinity;

function createNums(bit) {
  const bitArr = bit.split('').map((x) => +x);
  const visit = Array.from(new Array(n), () => new Array(m).fill(false));

  const bfs = (start) => {
    const queue = [start];
    visit[start[0]][start[1]] = true;
    let nums = `${map[start[0]][start[1]]}`;

    while (queue.length) {
      const [r, c] = queue.shift();
      const info = check.find((item) => item.key === `${r}${c}`);
      const { exponent } = info;
      const nowDirection = bitArr[EXPONENT - exponent];

      if (nowDirection === 1) {
        //가로
        if (c + 1 < m && !visit[r][c + 1]) {
          const next = check.find((item) => item.key === `${r}${c + 1}`);
          const { exponent: nextEx1 } = next;
          if (nowDirection === bitArr[EXPONENT - nextEx1]) {
            visit[r][c + 1] = true;
            queue.push([r, c + 1]);
            nums += `${map[r][c + 1]}`;
          }
        }
      } else {
        //세로
        if (r + 1 < n && !visit[r + 1][c]) {
          const next = check.find((item) => item.key === `${r + 1}${c}`);
          const { exponent: nextEx2 } = next;
          if (nowDirection === bitArr[EXPONENT - nextEx2]) {
            visit[r + 1][c] = true;
            queue.push([r + 1, c]);
            nums += `${map[r + 1][c]}`;
          }
        }
      }
    }
    return nums;
  };

  const result = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visit[i][j]) {
        result.push(bfs([i, j]));
      }
    }
  }
  max = Math.max(
    max,
    result.reduce((prev, cur, idx) => {
      prev += +cur;
      return prev;
    }, 0)
  );
}

function init() {
  for (let i = 1; i <= n; i++) {
    map.push(input[i].split('').map((x) => +x));
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      check.push({
        key: `${i}${j}`,
        exponent: count,
      });
      count++;
    }
  }

  for (let i = 0; i < 1 << (n * m); i++) {
    let direction = i.toString(2);
    if (direction.length < n * m) {
      direction = '0'.repeat(n * m - direction.length) + direction;
    }
    createNums(direction);
  }
  console.log(max);
}

init();
