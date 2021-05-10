function solution(n) {
  let result = ''
  function divide(m) {
      const number = m/3
      const share = Math.floor(number)
      const remainder = m%3


      if (remainder === 0)  {
          if (number > 1) {
              divide(share - 1)
          }
          result += '4'
      } else {
          if (number > 1) {
              divide(share)
          }
          result += remainder === 3 ? '4' : String(remainder)
      }
  }
  divide(n)
  return result
}