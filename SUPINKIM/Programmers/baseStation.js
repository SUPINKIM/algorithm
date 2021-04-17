//기지국 설치하기 풀이
function solution(n, stations, w) {
  let max = 2 * w + 1; //각 기지국이 최대로 커버할 수 있는 아파트 수
  let lefts = []; //구간별 남은 아파트 개수 체크
  let cover = 0; //현재 기지국이 커버할 수 있는 아파트 개수
  for (let [index, station] of stations.entries()) {
    if (index === 0 && station - w > 1) {
      lefts.push(station - w - 1);
    } else if (station - w - (stations[index - 1] + w) - 1) {
      lefts.push(station - w - (stations[index - 1] + w) - 1);
    }
    if (index === stations.length - 1 && station < n - w) {
      lefts.push(n - (station + w));
    }
  }

  if (!lefts.length) {
    return 0;
  }

  let c = 0;
  for (let l of lefts) {
    c += Math.ceil(l / max);
  }
  return c;
}
