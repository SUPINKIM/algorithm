const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

class Node {
  constructor(value) {
    this.value = value;
    this.level = null;
    this.col = null;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  setLevel(level) {
    this.level = level;
  }

  setCol(col) {
    this.col = col;
  }

  setParent(parent) {
    this.parent = parent; //parent Node
  }

  setLeft(left) {
    this.left = left; //left child Node
  }

  setRigth(right) {
    this.right = right; //right child Node
  }
}

//트리 생성하기
const items = +input[0];
const nodes = new Array(items + 1).fill(0).map((_, idx) => new Node(idx));
for (let i = 1; i <= items; i++) {
  const [parent, left, right] = input[i].split(' ').map((x) => +x);
  if (left !== -1) {
    nodes[parent].setLeft(nodes[left]);
    nodes[left].setParent(nodes[parent]);
  }
  if (right !== -1) {
    nodes[parent].setRigth(nodes[right]);
    nodes[right].setParent(nodes[parent]);
  }
}
//root 찾기
let root = null;
for (let i = 1; i < nodes.length; i++) {
  if (!nodes[i].parent) {
    root = nodes[i];
  }
}

root.setLevel(1);

let column = 1;
let maxLevel = 1;

function travelInorder(node) {
  if (!node.level) {
    node.setLevel(node.parent.level + 1);
  }
  if (node.level > maxLevel) {
    maxLevel = node.level;
  }
  if (node.left) {
    travelInorder(node.left);
  }
  node.setCol(column++);
  if (node.right) {
    travelInorder(node.right);
  }
}

travelInorder(root);

let maxWidth = [1, 1];

for (let i = 1; i <= maxLevel; i++) {
  let levels = nodes.filter((x) => x.level === i);
  levels.sort((a, b) => a.col - b.col);
  let width = levels[levels.length - 1].col - levels[0].col + 1;
  if (maxWidth[1] < width) {
    maxWidth[0] = i;
    maxWidth[1] = width;
  }
}
console.log(maxWidth.join(' '));
