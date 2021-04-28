function solution(new_id) {
  const allow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_', '.']
  new_id = new_id.toLowerCase() // 1단계
  let filted_id = ''

  for (let id of new_id) { // 2단계
      const char = allow.find(char => id === char)
      if (char) {
          filted_id += char
      }
  }

  filted_id = filted_id.replace(/\.+/g, '.') // 3단계
  filted_id = filted_id.replace(/^\.|\.$/g, '') // 4단계
  filted_id = filted_id === '' ? 'a' : filted_id // 5단계
  filted_id = filted_id.substring(0, 15) // 6단계
  filted_id = filted_id.replace(/\.$/g, '') // 6단계
  if (filted_id.length < 3) {
      while (filted_id.length < 3) {
          filted_id = filted_id + filted_id[filted_id.length - 1]
      }
  } // 7단계

  return filted_id
}