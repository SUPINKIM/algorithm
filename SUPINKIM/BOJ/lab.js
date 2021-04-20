//14502번 연구소 문제풀이
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const [n, m] = input[0].split(' ').map((x) => +x);
let map = Array.from(Array(n), () => new Array());
for (let i = 1; i <= n; i++) {
  map[i - 1] = input[i].split(' ').map((x) => +x);
}

let visited = Array.from(Array(n), () => new Array(m).fill(false));

const checkZero = (arr) => {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 0) {
        count++;
      }
    }
  }
  return count;
};

const bfs = (arr, start) => {
  let queue = start;
  while (queue.length) {
    let [row, col] = queue.shift();

    for (let i = 0; i < dx.length; i++) {
      if (
        row + dx[i] >= 0 &&
        row + dx[i] < n &&
        col + dy[i] >= 0 &&
        col + dy[i] < m
      ) {
        if (
          !visited[row + dx[i]][col + dy[i]] &&
          arr[row + dx[i]][col + dy[i]] === 0
        ) {
          visited[row + dx[i]][col + dy[i]] = true;
          arr[row + dx[i]][col + dy[i]] = 2;
          queue.push([row + dx[i], col + dy[i]]);
        }
      }
    }
  }
  return checkZero(arr);
};

//벽의 위치 조합 => bfs 함수 호출
//바이러스 위치 찾기
//dfs(map, 바이러스1, 바이러스2...);
//map 함수 복사

let virus = []; //바이러스 위치 찾기
let zeros = []; //벽을 세울 빈 위치 찾기
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 2) {
      virus.push([i, j]);
    }
    if (map[i][j] === 0) {
      zeros.push([i, j]);
    }
  }
}

//빈 칸 3개씩 조합 만들기
let result = [];
const combination = (nums, num, len, arr = []) => {
  if (num === len) {
    result.push([...arr]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i]);
    combination(nums.slice(i + 1), num + 1, len, arr);
    arr.pop();
  }
};

combination(zeros, 0, 3);
let max = 0;

while (result.length) {
  let walls = result.pop();
  for (let i = 0; i < walls.length; i++) {
    let [row, col] = walls[i];
    map[row][col] = 1;
  }
  let count1 = bfs(map, [...virus]);
  max = Math.max(max, count1);
  //visited, map 초기화
  visited = Array.from(Array(n), () => new Array(m).fill(false));
  for (let i = 1; i <= n; i++) {
    map[i - 1] = input[i].split(' ').map((x) => +x);
  }
}
console.log(max);
