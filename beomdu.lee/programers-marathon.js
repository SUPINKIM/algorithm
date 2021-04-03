function solution(participant, completion) {
  let list = [...participant]
  completion.forEach(p => {
      const index = list.indexOf(p)
      if (index !== -1) {
          list.splice(index, 1)
      }
  })
  return list[0]
}