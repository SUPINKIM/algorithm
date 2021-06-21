const stack = [];
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
// let input = ['I am happy today', 'We want to win the first prize']

for (var i=0, l=input.length; i<l; i++) {
	for (var j=0, k=input[i].length; j<k; j++) {
		const t = input[i][j]
		if(t === ' ' || j === k-1) {
			while(cmdObj.size() !== 0) {
				answer += cmdObj.pop()
			}
			answer += t
		} else {
			cmdObj.push(t)
		}
	}
	answer += '\n'
}
console.log(answer);