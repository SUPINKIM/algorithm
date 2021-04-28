# 큐 (Queue)

- 데이터를 넣을 수 있는 `선형구조`
- 먼저 넣은 데이터가 먼저 나오는 `FIFO(First In First Out)`
- 데이터를 집어넣는 `enqueue`
- 데이터를 추출하는 `dequeue`
- 현재 데이터가 큐에 존재하는지 확인하는 `contains`
- 스택의 총 크기를 반환하는 `size`

## 구현
```javascript
class Queue {
  constructor() {
    this.array = []
  }

  enqueue(value) {
    this.array.push(value)
  }

  dequeue() {
    this.array.shift()
  }

  contains(value) {
    return this.array.some(item => item === value)
  }

  size() {
    return this.array.length
  }
}

const instance = new Queue()

instance.enqueue(1)
instance.array // [1]

instance.enqueue(2)
instance.array // [1, 2]

instance.enqueue(4)
instance.array // [1, 2, 4]

instance.dequeue()
instance.array // [2, 4]

instance.contains(1) // false
instance.contains(2) // true

instance.size() // 2
```

`Queue`는 `순서대로` 처리 되어야 하는 작업의 `버퍼(임시저장)`로 많이 사용
