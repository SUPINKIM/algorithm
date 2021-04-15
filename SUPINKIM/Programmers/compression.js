//문자열 압축 풀이
function solution(s) {
  let res = s.length;
  let mid = Math.floor(s.length / 2); //가장 긴 반복 문자열은 절반 길이

  for (let i = mid; i >= 1; i--) {
    let idx = 0;
    let mymap = new Map();
    let last = '';
    let len = s.length;
    while (idx < s.length) {
      if (s.substring(idx, idx + i) === s.substring(idx + i, idx + 2 * i)) {
        let str = s.substring(idx, idx + i);
        if (mymap.has(str) && last === str) {
          //직전에 압축한 단어와 동일한 경우
          let temp = mymap.get(str);
          temp.push(temp.pop() + 1);
          mymap.set(str, temp);
        } else if (mymap.has(str) && last !== str) {
          //직전에 압축한 단어와 다른 경우
          let temp = mymap.get(str);
          temp.push(2);
          mymap.set(str, temp);
        } else {
          //처음 압축하는 경우
          mymap.set(str, [2]);
        }
        len -= i;
        last = s.substring(idx + i, idx + 2 * i);
      }
      idx += i;
    }
    let arr = [...mymap.entries()];
    for (let a of arr) {
      len += a[1].reduce((s, v) => (s += v.toString().length), 0);
    }
    res = Math.min(res, len);
  }
  return res;
}
