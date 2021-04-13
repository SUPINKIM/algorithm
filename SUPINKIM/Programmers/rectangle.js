//멀쩡한 사각형 문제풀이
function getGCD(w, h) {
  if (h === 0) {
    return w;
  } else {
    let r = w % h;
    return getGCD(h, r);
  }
}

function solution(w, h) {
  //w,h의 gcd 구하기
  let gcd = getGCD(w, h);
  let answer = w * h - (w + h - gcd);
  return answer;
}
