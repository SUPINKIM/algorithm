function solution(info, query) {
  const splitInfo = info.map(string => string.split(' '))

  return query.map(string => {
      let count = 0
      let splitQuery = string.split(' and ')
      const add = splitQuery[3].split(' ')

      splitQuery.pop()
      splitQuery = splitQuery.concat(add)

      for (let i=0, l=splitInfo.length; i<l; i++) {
          const result = splitQuery.every((query, index) => {
              if (query === '-') { return true }
              if (query === splitInfo[i][index]) { return true }
              if ((index === (splitQuery.length-1)) && (Number(query) <= Number(splitInfo[i][index]))) {return true}
          })

          if (result) { count += 1 }
      }

      return count
  })
}