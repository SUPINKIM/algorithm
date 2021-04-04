function solution(numbers) {
  //재귀 호출로 조합 구하기(속도 제일 느림)
  let len = 2;
  let result = new Set();
  let combi = (nums, arr = []) => {
    if (arr.length === len) {
      result.add(arr.reduce((s, v) => (s += v), 0));
      return;
    }
    for (let [idx, value] of nums.entries()) {
      arr.push(value);
      combi(nums.slice(idx + 1), arr);
      arr.pop();
    }
  };
  combi(numbers);
  return [...result].sort((a, b) => a - b);
}
