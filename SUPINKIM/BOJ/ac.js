const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const testCase = +input[0];

function init() {
  for (let i = 1; i <= testCase; i++) {
    let direction = true; //true -> 정방향, false -> 역방향
    let index = 0;
    let error = false;

    const caseIndex = (i - 1) * 3 + 1;
    const caseArrSize = +input[caseIndex + 1];
    const caseArray = [];
    let newNum = '';
    for (let word of input[caseIndex + 2]) {
      if (word === '[' || word === ']' || word === ',') {
        if (newNum !== '') caseArray.push(Number(newNum));
        newNum = '';
        continue;
      } else {
        newNum += word;
      }
    }

    for (let order of input[caseIndex]) {
      if (order === 'R') direction = !direction;
      else if (order === 'D') {
        if (!caseArray.length || index === caseArray.length) {
          error = true;
          break;
        }
        direction ? index++ : caseArray.pop();
      }
    }
    if (error) console.log('error');
    else {
      let temp = '[';
      if (direction) {
        for (let i = index; i < caseArray.length; i++) {
          temp += caseArray[i];
          if (i < caseArray.length - 1) temp += ',';
        }
      } else {
        for (let i = caseArray.length - 1; i >= index; i--) {
          temp += caseArray[i];
          if (i > index) temp += ',';
        }
      }
      console.log(temp + ']');
    }
  }
}

init();
