//야근 지수 문제풀이

function solution(n, works) {
  if (works.reduce((s, v) => (s += v), 0) <= n) {
    return 0;
  } //남은 시간 안에 일을 다 처리할 수 있음

  //max heap 구현하기
  let heap = [];

  let bubbleUp = () => {
    let index = heap.length - 1; //가장 마지막에 삽입된 원소 인덱스
    let parent = Math.floor((index - 1) / 2);

    while (index > 0 && heap[parent] < heap[index]) {
      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  };

  let bubbleDown = () => {
    if (heap.length === 0) {
      return;
    }
    if (heap.length === 1) {
      heap.pop();
      return;
    }
    heap[0] = heap.pop();
    let parent = 0;
    let left = parent * 2 + 1;
    let right = parent * 2 + 2;

    while (left < heap.length) {
      let next = parent;
      if (heap[next] < heap[left]) {
        next = left;
      }
      if (right < heap.length && heap[next] < heap[right]) {
        next = right;
      }
      if (next === parent) {
        break;
      } else {
        [heap[next], heap[parent]] = [heap[parent], heap[next]];
      }
      parent = next;
      left = parent * 2 + 1;
      right = parent * 2 + 2;
    }
  };

  //기존 배열 max-heap으로 정렬
  for (let w of works) {
    heap.push(w);
    bubbleUp();
  }

  for (let i = 0; i < n; i++) {
    let max = heap[0];
    bubbleDown();
    max -= 1;
    heap.push(max);
    bubbleUp();
  }
  return heap.reduce((acc, cur) => {
    acc += Math.pow(cur, 2);
    return acc;
  }, 0);
}
