function solution(board) {
  let len = board.length;

  let dist = Array.from(new Array(len), () => new Array(len).fill(Infinity));
  dist[len - 1][len - 1] = 0;

  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  const ROW = 'row',
    COL = 'col';

  let min = Infinity;

  const dfs = (start) => {
    let [row, col, direct] = start;

    if (row === 0 && col === 0) {
      min = Math.min(dist[row][col], min);
    }

    for (let i = 0; i < dx.length; i++) {
      if (
        row + dx[i] < 0 ||
        row + dx[i] >= len ||
        col + dy[i] < 0 ||
        col + dy[i] >= len
      )
        continue;
      if (board[row + dx[i]][col + dy[i]]) continue;
      if (dist[row + dx[i]][col + dy[i]] < dist[row][col] + 100) continue;

      if (direct === ROW && (i === 0 || i === 1)) {
        if (dist[row + dx[i]][col + dy[i]] > dist[row][col]) {
          dist[row + dx[i]][col + dy[i]] = dist[row][col] + 600;
        }
        dfs([row + dx[i], col + dy[i], COL]);
      } else if (direct === COL && (i === 2 || i === 3)) {
        if (dist[row + dx[i]][col + dy[i]] > dist[row][col]) {
          dist[row + dx[i]][col + dy[i]] = dist[row][col] + 600;
        }
        dfs([row + dx[i], col + dy[i], ROW]);
      } else {
        dist[row + dx[i]][col + dy[i]] = dist[row][col] + 100;
        let temp = null;
        if (!direct) {
          if (i === 0 || i === 1) {
            temp = COL;
          } else {
            temp = ROW;
          }
          dfs([row + dx[i], col + dy[i], temp]);
        } else {
          dfs([row + dx[i], col + dy[i], direct]);
        }
      }
    }
  };

  dfs([len - 1, len - 1, null]);
  return min;
}
