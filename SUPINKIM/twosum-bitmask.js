function solution(numbers) {
  //비트 마스크 사용, 속도 느리고 일부 케이스 통과 못함.
  let col = 1 << numbers.length;
  let result = new Set();

  for (let i = 1; i < col; i++) {
    let temp = [];
    for (let j = 0; j < numbers.length; j++) {
      if (i & (1 << j)) temp.push(numbers[j]);
    }
    if (temp.length === 2) {
      result.add(temp.reduce((s, v) => (s += v), 0));
    }
  }
  return [...result].sort((a, b) => a - b);
}
