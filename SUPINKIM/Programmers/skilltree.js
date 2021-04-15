//스킬트리 문제 풀이
//문제풀이1 : 배열 index 비교(문제풀이2에 비해 실행 속도는 살짝 빠름)
function solution(skill, skill_trees) {
  let skillArr = skill.split('');
  let count = 0;
  for (let str of skill_trees) {
    let flag = false;
    for (let i = skillArr.length - 1; i >= 1; i--) {
      let idx1 = str.indexOf(skillArr[i]);
      let idx2 = str.indexOf(skillArr[i - 1]);
      if (idx1 !== -1 && idx2 === -1) {
        flag = !flag;
        break;
      }
      if (idx1 !== -1 && idx2 !== -1 && idx1 <= idx2) {
        flag = !flag;
        break;
      }
    }
    if (!flag) {
      count++;
    }
  }
  return count;
}

//문제풀이2 : string -> array -> string으로 치환해서 비교(가독성 부분에서 더 좋은 것 같음)
function solution(skill, skill_trees) {
  let answer = 0;
  let skillArr = skill.split('');
  for (let i = 0; i < skill_trees.length; i++) {
    let temp = skill_trees[i].split('');
    let newStr = temp.filter((element) => skillArr.includes(element)).join('');
    if (newStr === skill.substring(0, newStr.length)) {
      answer++;
    }
  }
  return answer;
}
