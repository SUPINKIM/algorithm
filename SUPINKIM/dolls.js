function solution(board, moves) {
  let stack = []; //집어올린 인형 넣는 바구니
  let move = moves.map((x) => x - 1); //열 인덱스 맞추기
  let count = 0;
  for (let i of move) {
    //i 열 확인;
    for (let j = 0; j < board.length; j++) {
      if (board[j][i] !== 0) {
        stack.push(board[j][i]);
        board[j][i] = 0;
        break;
      }
    }
    while (
      stack.length > 1 &&
      stack[stack.length - 1] === stack[stack.length - 2]
    ) {
      stack.pop();
      stack.pop();
      count += 2;
    }
  }
  return count;
}
