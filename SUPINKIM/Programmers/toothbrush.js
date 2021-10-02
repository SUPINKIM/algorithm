function solution(enroll, referral, seller, amount) {
  const members = new Map();

  for (let [index, name] of enroll.entries()) {
    const obj = { name, parent: referral[index], amount: 0, income: 0 };
    members.set(name, obj);
  }

  for (let i = 0; i < seller.length; i++) {
    let member = seller[i];
    let count = amount[i];

    let findInfo = members.get(member);
    let { parent, income } = findInfo;
    let nextIncome = Math.floor(count * 100 * 0.1);
    income += nextIncome < 1 ? count * 100 : count * 100 - nextIncome;
    members.set(member, { ...findInfo, income });

    while (nextIncome >= 1 && parent !== '-') {
      member = parent;
      findInfo = members.get(member);
      parent = findInfo.parent;
      income = findInfo.income;
      income +=
        Math.floor(nextIncome * 0.1) < 1
          ? nextIncome
          : nextIncome - Math.floor(nextIncome * 0.1);
      members.set(member, { ...findInfo, income });
      nextIncome = Math.floor(nextIncome * 0.1);
    }
  }

  const ans = [];
  for (let member of members.entries()) {
    ans.push(member[1].income);
  }

  return ans;
}
