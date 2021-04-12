function solution(progresses, speeds) {
  let deployDay = 0
  let result = []

  for (let i = 0, l = progresses.length; i < l; i++) {
      const day = Math.ceil((100 - progresses[i]) / speeds[i])
      if (day > deployDay) {
          result.push(1)
          deployDay = day
      } else {
          result[result.length - 1] += 1
      }
  }

  return result
}