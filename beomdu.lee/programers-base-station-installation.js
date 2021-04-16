function solution(n, stations, w) {
  let section = 1
  let count = 0
  const range = (w*2)+1

  for (let i=0, l=stations.length; i<l; i++) {
      let min = stations[i]-w
      let max = stations[i]+w

      if (section < min) {
          count += Math.ceil((min-section)/range)
      }
      if ((n-max > 0) && (i === l-1)) {
          count += Math.ceil((n-max)/range)
      }
      section = max + 1
  }
  return count
}