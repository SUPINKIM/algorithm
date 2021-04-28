# 스택 (Stack)

- 데이터를 넣을 수 있는 `선형구조`
- 나중에 넣은 데이터가 먼저 나오는 `LIFO(Last In First Out)`
- 데이터를 집어넣는 `push`
- 데이터를 추출하는 `pop`
- 마지막 데이터를 확인하는 `peek`
- 현재 데이터가 스택에 존재하는지 확인하는 `contains`
- 스택의 총 크기를 반환하는 `size`

## 구현
```javascript
class Stack {
  constructor() {
    this.array = []
  }

  push(value) {
    this.array.push(value)
  }

  pop() {
    this.array.pop()
  }

  peek() {
    return this.array[this.array.length - 1]
  }

  contains(value) {
    return this.array.some(item => item === value)
  }

  size() {
    return this.array.length
  }
}

const instance = new Stack()

instance.push(1)
instance.array // [1]

instance.push(2)
instance.array // [1, 2]

instance.push(4)
instance.array // [1, 2, 4]

instance.pop()
instance.array // [1, 2]
instance.peek() // 2

instance.contains(4) // false
instance.contains(2) // true

instance.size() // 2
```

`Stack`은 `서로 연관되어있는` 작업을 연달아 수행하면서 `이전에 작업했던 값을 기억`할 필요가 있을 때 많이 사용
