function solution(A, B) {
  let index = 0
  let score = 0
  let sortA = A.sort((a, b) => a - b)
  let sortB = B.sort((a, b) => a - b)

  for(let i=0, l=B.length; i<l; i++) {
      if (sortA[index] < sortB[i]) {
          score += 1
          index += 1
      }
  }
  return score
}