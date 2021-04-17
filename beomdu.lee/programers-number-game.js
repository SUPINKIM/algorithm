function solution(A, B) {
  let sortA = A.sort((a, b) => a - b)
  let sortB = B.sort((a, b) => a - b)
  let index = 0

  console.log(sortA, sortB)
  for(let i=0, l=B.length; i<l; i++) {
      if (sortA[index] < sortB[i]) { index += 1 }
  }
  return index
}