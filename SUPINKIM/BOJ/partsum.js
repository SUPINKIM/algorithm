const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function findSum(tree, node, start, end, left, right) {
  if (end < left || start > right) return 0;

  if (left <= start && end <= right) {
    return tree[node];
  }

  const mid = Math.floor((start + end) / 2);
  let sum =
    findSum(tree, 2 * node, start, mid, left, right) +
    findSum(tree, 2 * node + 1, mid + 1, end, left, right);

  return sum;
}

function createTree(tree, nums, node, start, end) {
  if (start === end) {
    return (tree[node] = nums[start]);
  }

  const mid = Math.floor((start + end) / 2);
  tree[node] =
    createTree(tree, nums, 2 * node, start, mid) +
    createTree(tree, nums, 2 * node + 1, mid + 1, end);

  return tree[node];
}

function updateTree(tree, value, index, node, start, end) {
  if (index < start || index > end) return tree[node];

  if (start === end && start === index) return (tree[node] = value);

  const mid = Math.floor((start + end) / 2);
  tree[node] =
    updateTree(tree, value, index, 2 * node, start, mid) +
    updateTree(tree, value, index, 2 * node + 1, mid + 1, end);

  return tree[node];
}

function init() {
  let ans = '';
  const [n, m, k] = input[0]
    .trim()
    .split(' ')
    .map((x) => +x);

  const nums = [];
  for (let i = 1; i <= n; i++) {
    nums.push(+input[i]);
  }

  const height = Math.ceil(Math.log2(n));
  const size = 1 << (1 + height);

  const tree = new Array(size).fill(null);

  createTree(tree, nums, 1, 0, nums.length - 1);

  for (let i = n + 1; i <= n + m + k; i++) {
    const [order, num1, num2] = input[i].split(' ').map((x) => +x);

    switch (order) {
      case 1:
        nums[num1 - 1] = num2;
        updateTree(tree, num2, num1 - 1, 1, 0, nums.length - 1);
        break;
      case 2:
        const result = findSum(tree, 1, 0, nums.length - 1, num1 - 1, num2 - 1);
        ans += result + '\n';
        break;
      default:
        break;
    }
  }
  console.log(ans.trim());
}

init();
