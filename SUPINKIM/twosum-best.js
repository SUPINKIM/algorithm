//빠른 속도와 가독성 좋은 코드 : 반복문 + Set조합
function solution(numbers) {
  let answer = new Set();
  const num_copy = numbers.slice();

  for (let i = 0; i < num_copy.length - 1; i++) {
    for (let j = i + 1; j < num_copy.length; j++) {
      answer.add(num_copy[i] + num_copy[j]);
    }
  }
  return [...answer].sort((a, b) => a - b);
}
