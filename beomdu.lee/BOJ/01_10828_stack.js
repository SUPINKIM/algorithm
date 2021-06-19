const stack = [];
let top = 0;
let answer = '';

const cmdObj = {
	push: x => {
		stack[top] = x;
		top++;
	},
	pop: () => {
		if (top > 0) {
			top--;
			return stack.splice(-1);
		} else {
			return -1;
		}
	},
	size: () => top,
	empty: () => {
		if (top === 0) { return 1 }
		else { return -1 }
	},
	top: () => {
		if (top > 0) { return stack[top - 1] }
		else { return -1 }
	}
}

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let input = [];

rl.on('line', line => { input.push(line) })
	.on('close', () => {
		input.map((line) => {
			const cmd = line.split(' ');
			if (cmd[0] === 'push') {
				cmdObj[cmd[0]](parseInt(cmd[1]));
			} else if (
				cmd[0] === 'pop' ||
				cmd[0] === 'size' ||
				cmd[0] === 'empty' ||
				cmd[0] === 'top'
			) { answer += cmdObj[cmd[0]]() + '\n' }
		})
		console.log(answer)
		process.exit();
	})