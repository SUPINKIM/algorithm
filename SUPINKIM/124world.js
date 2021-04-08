//124 나라의 숫자 풀이
function solution(n) {
  let arr_124 = [4, 1, 2];
  return n === 0 ? '' : solution(Math.floor((n - 1) / 3)) + arr_124[n % 3];
}
