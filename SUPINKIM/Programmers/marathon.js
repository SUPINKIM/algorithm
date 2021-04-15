function solution(participant, completion) {
  participant.sort(), completion.sort();
  let answer = participant.find(
    (person, index) => person !== completion[index]
  );
  return answer;
}
