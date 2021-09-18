const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0]
  .trim()
  .split(' ')
  .map((x) => +x);

const nums = [0];
const INT_MAX = 1000000001;
const INT_MIN = 0;

for (let i = 1; i <= n; i++) {
  nums.push(+input[i]);
}

function initMin(tree, node, start, end) {
  if (start === end) {
    tree[node].min = nums[start];
    return tree[node].min;
  }

  const mid = Math.floor((start + end) / 2);
  tree[node].min = Math.min(
    initMin(tree, 2 * node, start, mid),
    initMin(tree, 2 * node + 1, mid + 1, end)
  );

  return tree[node].min;
}

function initMax(tree, node, start, end) {
  if (start === end) {
    tree[node].max = nums[start];
    return tree[node].max;
  }

  const mid = Math.floor((start + end) / 2);
  tree[node].max = Math.max(
    initMax(tree, 2 * node, start, mid),
    initMax(tree, 2 * node + 1, mid + 1, end)
  );

  return tree[node].max;
}

function findMin(tree, node, start, end, left, right) {
  if (end < left || start > right) {
    return INT_MAX;
  }
  if (left <= start && end <= right) {
    return tree[node].min;
  }

  const mid = Math.floor((start + end) / 2);
  return Math.min(
    findMin(tree, 2 * node, start, mid, left, right),
    findMin(tree, 2 * node + 1, mid + 1, end, left, right)
  );
}

function findMax(tree, node, start, end, left, right) {
  if (end < left || start > right) {
    return INT_MIN;
  }
  if (left <= start && end <= right) {
    return tree[node].max;
  }

  const mid = Math.floor((start + end) / 2);
  return Math.max(
    findMax(tree, 2 * node, start, mid, left, right),
    findMax(tree, 2 * node + 1, mid + 1, end, left, right)
  );
}

function init() {
  let result = '';

  const height = Math.ceil(Math.log2(n));
  const treeSize = 1 << (1 + height);

  const tree = Array.from(new Array(treeSize), () => {
    return {
      min: Infinity,
      max: -Infinity,
    };
  });

  initMin(tree, 1, 1, n);
  initMax(tree, 1, 1, n);

  for (let i = n + 1; i <= n + m; i++) {
    const [left, right] = input[i].split(' ').map((x) => +x);
    result += `${findMin(tree, 1, 1, n, left, right)} ${findMax(
      tree,
      1,
      1,
      n,
      left,
      right
    )}\n`;
  }

  console.log(result.trim());
}

init();
