// 프로그래머스 - 배달 문제풀이
function solution(N, road, K) {
  //다익스트라 알고리즘

  let adj = Array.from(Array(N + 1), () => new Array()); //간선 정보
  let costs = new Array(N + 1).fill(Infinity); //비용 초기화
  costs[1] = 0; //출발점 1 : 자기 자신 비용 0

  let queue = []; //우선 순위 큐(min-heap)를 구현할 배열(queue)

  for (let rod of road) {
    let [a, b, c] = rod;
    adj[a].push({ next: b, cost: c });
    adj[b].push({ next: a, cost: c });
  }

  let bubbleUp = () => {
    let index = queue.length - 1; //마지막에 삽입한 원소
    let parent = Math.floor((index - 1) / 2);

    while (index > 0 && queue[parent].cost > queue[index].cost) {
      [queue[parent], queue[index]] = [queue[index], queue[parent]];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  };

  let bubbleDown = () => {
    if (queue.length === 1) {
      queue.pop();
      return;
    }
    queue[0] = queue.pop(); //큐의 첫 번째 원소를 이미 사용해서 필요 없는 경우
    let parent = 0;

    while (parent < queue.length) {
      let left = parent * 2 + 1;
      let right = parent * 2 + 2;

      if (left >= queue.length) {
        break;
      }

      let next = parent;
      if (queue[left].cost < queue[next].cost) {
        next = left;
      }
      if (right < queue.length && queue[right].cost < queue[next].cost) {
        next = right;
      }
      if (next === parent) {
        break;
      } else {
        [queue[next], queue[parent]] = [queue[parent], queue[next]];
        parent = next;
      }
    }
  };

  let daijkstra = () => {
    queue.push({ next: 1, cost: 0 }); //시작점

    while (queue.length) {
      let { next, cost } = queue[0]; //가장 첫 번째 원소가 가장 작은 값
      bubbleDown(); //첫 번째 원소 삭제
      if (costs[next] < cost) {
        continue;
      } //지금 저장된 비용보다 더 큰 비용이면 보지 않는다.
      if (!adj[next].length) {
        continue;
      } //연결된 간선이 없으면 패스
      for (let edge of adj[next]) {
        let { next: nextCity, cost: nextCost } = edge;
        if (costs[nextCity] < costs[next] + nextCost) {
          continue;
        }
        costs[nextCity] = costs[next] + nextCost; //더 작은 비용으로 업데이트
        queue.push({ next: nextCity, cost: costs[nextCity] }); //원래 비용이 아니라 새롭게 업데이트 된 비용으로 계산
        bubbleUp();
      }
    }
  };
  daijkstra();

  let count = 0;
  for (let c of costs) {
    if (c <= K) {
      count++;
    }
  }
  return count;
}
