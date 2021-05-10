function solution(nums) {
  let kinds = []
  nums.forEach(v => {
      if (!kinds.some(f => f === v)) {
          kinds.push(v)
      }
  })

  return nums.length/2 > kinds.length ? kinds.length : nums.length/2
}

// 다른사람의 풀이
function solution(nums) {
  let max = nums.length / 2;
  let arr = [...new Set(nums)];

  return arr.length > max ? max : arr.length
}