const fs = require('fs');
let [s, t] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map((x) => +x);

const MAX = 1000000000;

function bfs() {
  const queue = [[s, '']];
  let index = 0;
  let visited = [];
  let success = false;
  let result = '';

  while (index < queue.length) {
    let [now, ans] = queue[index];

    if (now === t) {
      success = true;
      result = ans;
      break;
    }

    for (let i = 0; i < 4; i++) {
      let temp = now;
      let operator = '';
      switch (i) {
        case 0:
          temp = now * now;
          operator = '*';
          break;
        case 1:
          temp = now + now;
          operator = '+';
          break;
        case 2:
          temp = now - now;
          operator = '-';
          break;
        case 3:
          if (temp !== 0) {
            temp = Math.floor(now / now);
            operator = '/';
          }
          break;
      }

      if (!visited.includes(temp) && temp >= 1 && temp <= MAX) {
        let str = ans + operator;
        queue.push([temp, str]);
        visited.push(temp);
      }
    }
    index++;
  }
  return success ? result : -1;
}

function init() {
  if (s === t) {
    console.log(0);
  } else {
    const result = bfs();
    console.log(result);
  }
}

init();
