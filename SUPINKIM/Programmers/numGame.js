//숫자 게임 풀이
function solution(A, B) {
  //A[i]보다 큰 수중 가장 작은 값을 가진 선수가 출전
  let bArr = B.sort((a, b) => a - b).map((x) => [x, false]); //[자연수, 출전 여부]

  let binary = (num) => {
    let lo = -1,
      hi = B.length;
    while (lo + 1 < hi) {
      let mid = Math.floor((lo + hi) / 2);
      if (bArr[mid][0] > num) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
    return hi;
  };
  let count = 0;
  for (let [key, a] of A.entries()) {
    let index = binary(a);
    for (let i = index; i < bArr.length; i++) {
      if (!bArr[i][1]) {
        count++;
        bArr[i][1] = true; //출전
        break;
      }
    }
  }
  return count;
}
