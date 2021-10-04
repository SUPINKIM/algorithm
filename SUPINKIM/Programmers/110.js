function solution(s) {
  let ans = [];
  for (let str of s) {
    let ones = 0;
    const stack = [];
    for (let i = 0; i < str.length; i++) {
      if (
        stack.length >= 2 &&
        str[i] === '0' &&
        stack[stack.length - 1] === '1' &&
        stack[stack.length - 2] === '1'
      ) {
        stack.pop();
        stack.pop();
        ones++;
      } else {
        stack.push(str[i]);
      }
    }
    const newStr = stack.join('');

    let flag = false;
    for (let i = newStr.length - 1; i >= 0; i--) {
      if (newStr[i] === '0') {
        str = newStr.slice(0, i + 1) + '110'.repeat(ones) + newStr.slice(i + 1);
        flag = true;
        break;
      }
    }
    if (!flag) str = '110'.repeat(ones) + newStr;
    ans.push(str);
  }
  return ans;
}
