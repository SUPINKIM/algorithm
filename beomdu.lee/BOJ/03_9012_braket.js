let stack = [];
let pick = 0;
let answer = '';

const cmdObj = {
	push: x => {
		stack[pick] = x;
		pick++;
	},
	pop: () => {
		if (pick > 0) {
			pick--;
			return stack.splice(-1);
		} else {
			return -1;
		}
	},
	size: () => pick,
	empty: () => {
		if (pick === 0) { return 1 }
		else { return -1 }
	},
	pick: () => {
		if (pick > 0) { return stack[pick - 1] }
		else { return -1 }
	}
}

const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
// let input = [
// 	'(())())',
// 	'(((()())()',
// 	'(()())((()))',
// 	'((()()(()))(((())))()',
// 	'()()()()(()()())()',
// 	'(()((())()('
// ]

for (let i=0, l=input.length; i<l; i++) {
	for (let j=0, k=input[i].length; j<k; j++) {
		if (input[i][j] === '(') {
			cmdObj.push('(')
		}
		if (cmdObj.size() === 0) {
			answer += 'NO'
			break
		}
		if (input[i][j] === ')') {
			cmdObj.pop()
		}
		if (j === k-1 && cmdObj.size() === 0) {
			answer += 'YES'
		}
		if (j === k-1 && cmdObj.size() !== 0) {
			answer += 'NO'
		}
	}
	stack = []
	pick = 0
	answer += '\n'
}

console.log(answer);