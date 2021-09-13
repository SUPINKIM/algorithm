const fs = require('fs');
let [n, k] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map((x) => +x);

const visited = new Array(100001).fill(false);

function move(start, path) {
  const queue = [[start, path]];
  let index = 0;
  while (index < queue.length) {
    const [position, route] = queue[index];
    if (position !== k) {
      [position - 1, position + 1, 2 * position].forEach((next) => {
        if (!visited[next] && next >= 0 && next <= 100000) {
          const nextPath = route + `${next} `;
          queue.push([next, nextPath]);
          visited[next] = true;
        }
      });
    } else {
      return route;
    }
    index++;
  }
}

function init() {
  const result = move(n, `${n} `);
  console.log(result.trim().split(' ').length - 1);
  console.log(result.trim());
}

init();
