const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const alpha = ['a', 'n', 't', 'i', 'c'];

const [n, k] = input[0]
  .trim()
  .split(' ')
  .map((x) => +x);

const possible = k - 5;

const combinations = [];
function combination(alphabets, arr = []) {
  if (arr.length === possible) {
    combinations.push([...arr]);
    return;
  }

  for (let i = 0; i < alphabets.length; i++) {
    arr.push(alphabets[i]);
    combination(alphabets.slice(i + 1), arr);
    arr.pop();
  }
}

function init() {
  const checkArr = [];
  if (k < 5) console.log(0);
  else if (k === 26) console.log(n);
  else {
    for (let i = 1; i <= n; i++) {
      const temp = input[i].split('').reduce((prev, alphabet) => {
        if (!alpha.includes(alphabet)) {
          prev.push(alphabet);
        }
        return prev;
      }, []);
      checkArr.push({ length: temp.length, alphas: temp });
    }
    const newPossibleArr = checkArr.reduce((prev, item) => {
      prev.push(...item.alphas);
      return prev;
    }, []);
    const possibleArr = checkArr.map((item) => item.alphas);
    const alphaSet = [...new Set(newPossibleArr)];
    let max = -Infinity;
    combination(alphaSet);

    if (alphaSet.length > possible) {
      for (let i = 0; i < combinations.length; i++) {
        let count = 0;
        for (let j = 0; j < possibleArr.length; j++) {
          const result = possibleArr[j].every((value) =>
            combinations[i].includes(value)
          );
          if (result) {
            count++;
          }
        }
        max = Math.max(max, count);
      }
      console.log(max);
    } else {
      console.log(n);
    }
  }
}

init();
