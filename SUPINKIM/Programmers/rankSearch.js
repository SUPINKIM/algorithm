//순위 검색 문제 풀이
function makeCombination(arr, map, score) {
  let result = [];
  for (let i = 0; i < 1 << arr.length; i++) {
    result.push([]);
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) result[i - 1].push(arr[j]);
    }
  }
  for (let r of result) {
    r = r.join('');
    if (map.has(r)) {
      let arr = map.get(r);
      arr.push(score);
      map.set(r, arr);
    } else {
      map.set(r, [score]);
    }
  }
  return map;
}

function solution(info, query) {
  let map = new Map();
  for (let f of info) {
    let fArr = f.split(' ');
    let score = Number(fArr[fArr.length - 1]);
    fArr.pop();
    let res = makeCombination(fArr, map, score);
  }

  let binary = (num, people) => {
    let lo = -1,
      hi = people.length;
    while (lo + 1 < hi) {
      let mid = Math.floor((lo + hi) / 2);
      if (people[mid] >= num) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
    return hi;
  };

  let iter = map.entries();
  for (let i = 0; i < map.size; i++) {
    let [key, value] = iter.next().value;
    value.sort((a, b) => a - b);
  }

  let answer = [];
  for (let q of query) {
    let qArr = q.split(' ').map((x) => x.trim());
    let score1 = Number(qArr[qArr.length - 1]);
    qArr.pop();
    let condition1 = qArr.filter((x) => x !== 'and' && x !== '-').join('');

    if (map.has(condition1)) {
      let arr = map.get(condition1);
      let index = binary(score1, arr);
      answer.push(arr.length - index);
    } else {
      answer.push(0);
    }
  }

  return answer;
}
