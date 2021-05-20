function solution(numbers) {
  let sumList = []
  numbers.forEach((item, index) => {
      numbers.slice(index+1).forEach(item2 => sumList.push(item + item2))
  })

  return [...new Set(sumList)].sort((a,b) => a - b)
}