function solution(participant, completion) {
  participant.sort()
  completion.sort()

  return participant.find((v, i) => participant[i] !== completion[i])
}