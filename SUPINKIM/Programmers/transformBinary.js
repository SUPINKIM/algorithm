function solution(numbers) {
  const result = numbers.map((x) => {
    const binary = x.toString(2).split('');
    if (x % 2 === 0) {
      binary[binary.length - 1] = '1';
    } else {
      let index = null;
      if (x.toString(2).lastIndexOf('01') !== -1) {
        index = x.toString(2).lastIndexOf('01');
        binary[index] = '1';
        binary[index + 1] = '0';
      } else if (x.toString(2).lastIndexOf('10') !== -1) {
        index = x.toString(2).lastIndexOf('10');
        binary[index + 1] = '1';
      } else {
        binary.push('1');
        binary[1] = '0';
      }
    }
    return parseInt(binary.join(''), 2);
  });
  return result;
}
