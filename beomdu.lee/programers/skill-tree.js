function solution(skillBuild, userSkillTrees) {
  let count = 0

  for (let userSkill of userSkillTrees) {
      let lastIndex = null

      for (let skill of skillBuild) {
          let findIndex = userSkill.indexOf(skill)

          if ((lastIndex === -1) && (findIndex !== -1)) { break }
          if ((lastIndex !== -1) && (findIndex !== -1) && (lastIndex > findIndex)) { break }
          if (skillBuild[skillBuild.length -1] === skill) {
              count += 1
              break
          }
          lastIndex = findIndex
      }
  }

  return count
}