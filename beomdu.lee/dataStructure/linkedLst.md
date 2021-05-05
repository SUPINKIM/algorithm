# 링크드리스트 (Linked List)

- 떨어져있는 데이터를 연결해서 관리하는 데이터 구조
- 데이터를 저장할 공간을 미리 만들지 않아도 되지만 연결을 위한 별도의 공간이 필요하므로 저장 효율이 좋지는 않음
- 연결 정보를 찾는 시간이 필요하여 접근 속도가 느림
- 중간에 존재하는 데이터를 제거할 시 앞 뒤의 데이터를 재구성해야하는 부가작업이 필요

## 용어

- 노드: 데이터 저장 단위로 데이터값과 포인터로 이루어져있다.
- 포인터: 노드안에서 이저 혹은 다음 노드의 연결정보를 가지는 공간

## 구현

```javascript
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor(data) {
    this.node = new Node(data)
  }
  getList() {
    let pointer = this.node
    let list = []
    while (pointer) {
      list.push(pointer.data)
      pointer = pointer.next
    }
    return list
  }
  add(data) {
    if (this.node === null) {
      this.node = new Node(data)
    } else {
      let pointer = this.node
      while (pointer.next) {
        pointer = pointer.next
      }
      pointer.next = new Node(data)
    }
  }
  delete(data) {
    if (this.node === null) { return }
    if (this.node.data === data) {
      this.node = this.node.next
    } else {
      let pointer = this.node
      while (pointer.next) {
        pointer.next.data === data ? pointer.next = pointer.next.next : pointer = pointer.next
      }
    }
  }
  isExistData(data) {
    let pointer = this.node
    while (pointer) {
      if (pointer.data === data) { return true }
      else { pointer = pointer.next }
    }
    return false
  }
}

const instance = new LinkedList(0)
instance.getList() // [0]
instance.add(2)
instance.getList() // [0, 2]
instance.delete(0)
instance.isExistData(0) // false
instance.isExistData(2) // true
instance.getList() // [2]
```

`Linked List` 의 경우 다른 자료구조를 표현할 때 많이 사용된다.

## 의문

- 인스턴스 생성시 초기 데이터값을 주지 않으면 `첫째 Node`의 `data`값이 `undefined`가 되는데 이게 맞나?
- 중간 데이터를 제거하면 제거한 데이터의 이전 데이터에서 다음으로 갈 pointer 주소만 다다음 데이터로 바꿔주는 것이라 제거되어야할 데이터 공간은 그대로 있기에 공간 낭비가 아닌가?