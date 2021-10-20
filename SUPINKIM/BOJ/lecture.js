const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = +input[0];
const workingDay = new Array(10001).fill(true);

function init() {
  const schedule = [];
  for (let i = 1; i <= n; i++) {
    const [p, d] = input[i].split(' ').map((x) => +x);
    schedule.push({ day: d, price: p });
  }
  schedule.sort((s1, s2) => s2.price - s1.price);

  let sum = 0;
  let index = 0;
  let max = 0;
  let nowDay = 1;

  for (let s of schedule) {
    const { day, price } = s;
    for (let i = day; i >= 1; i--) {
      if (workingDay[i]) {
        workingDay[i] = false;
        sum += price;
        break;
      }
    }
  }
  console.log(sum);
}

init();
