function solution(board, moves) {
  let count = 0
  let basket = []

  moves.forEach(move => {
      board.find(row => {
          if (row[move - 1] > 0) {
              basket.push(row[move - 1])
              row[move - 1] = 0
              return true
          } else {
              return false
          }
      })
      if ((basket.length > 1) && (basket[basket.length - 1] === basket[basket.length - 2 ])) {
          basket = basket.slice(0, -2)
          count += 2
      }
  })

  return count
}