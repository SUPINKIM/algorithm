const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const inorder = input[1]
  .trim()
  .split(' ')
  .map((x) => +x);
const postorder = input[2]
  .trim()
  .split(' ')
  .map((x) => +x);

let result = '';

function travelPostOrder(postStart, postEnd, inStart, inEnd) {
  const stack = [[postStart, postEnd, inStart, inEnd]];
  while (stack.length) {
    const [pStart, pEnd, iStart, iEnd] = stack.pop();

    if (iStart > iEnd || pStart > pEnd) {
      continue;
    }

    const rootValue = postorder[pEnd];
    const rootIndex = inorder.findIndex((node) => node === rootValue);
    const postIndex = pStart + (rootIndex - iStart);
    result += rootValue + ' ';
    stack.push([postIndex, pEnd - 1, rootIndex + 1, iEnd]);
    stack.push([pStart, postIndex - 1, iStart, rootIndex - 1]);
  }
}

function init() {
  const n = +input[0];
  travelPostOrder(0, postorder.length - 1, 0, inorder.length - 1);
}

init();

console.log(result);
