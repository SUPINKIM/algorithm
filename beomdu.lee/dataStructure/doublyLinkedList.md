# 이중연결리스트 (Doubly Linked List)

- 기본적으로 연결리스트와 같이 떨어져있는 데이터를 연결해서 관리하는 데이터구조
- 연결리스트와 다르게 양방향으로 연결되어서 노드 탐색 및 추가/삭제가 가능하다.

## 구현

```javascript
class Node {
  constructor(data, next = null, prev = null) {
    this.data = data
    this.next = next
    this.prev = prev
  }
}

class DoublyLinkedList {
  constructor(data) {
    this.node = new Node(data)
    this.lastNode = this.node
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
      this.lastNode = this.node
    } else {
      let pointer = this.node
      while (pointer.next) {
        pointer = pointer.next
      }
      const newNode = new Node(data)
      this.pointer.next = newNode
      newNode.prev = pointer
      this.lastNode = newNode
    }
  }
  addBefore(data, beforeData) {
    if (this.node === null) {
      this.node = new Node(data)
      this.lastNode = this.node
    } else {
      let pointer = this.node
      while (pointer.data !== beforeData) {
        pointer = this.node.prev
      }
      if (pointer === this.node) {
        const newNode = new Node(data, this.node)
        this.node.prev = newNode
        this.node = newNode
      } else {
        const newNode = new Node(data, this.node, this.node.prev)
        this.node.prev.next = newNode
        this.node.prev = newNode
      }
    }
  }
  addAfter(data, afterData) {
    if (this.node === null) {
      this.node = new Node(data)
      this.lastNode = this.node
    } else {
      let pointer = this.node
      while(pointer.data !== afterData) {
        pointer = pointer.next
      }
      if (pointer === this.lastNode) {
        const newNode = new Node(data, null, this.lastNode)
        this.lastNode.next = newNode
        this.lastNode = newNode
      } else {
        const newNode = new Node(data, this.lastNode.next, this.lastNode)
        this.lastNode.next.prev = newNode
        this.lastNode.next = newNode
      }
    }
  }
  delete(data) {
    if (this.node === null) { return }
    if (this.node.data === data) {
      this.node = this.node.next
      this.node.prev = null
    } else {
      let pointer = this.node
      while (pointer.data !== data) {
        pointer = pointer.next
      }
      if (pointer === this.lastNode) { 
        this.lastNode = this.lastNode.prev
        this.lastNode.next = null
      } else {
        this.node.prev.next = this.node.next
        this.node.next.prev = this.node.prev
      }
    }
  }
  searchFromFirst(data) {
    let pointer = this.node
    while(pointer.data !== data) {
      pointer = pointer.next
    }
    return pointer === null
  }
  searchFromLast(data) {
    let pointer = this.lastNode
    while(pointer.data !== data) {
      pointer = pointer.prev
    }
    return pointer === null
  }
}

const instance = new DoublyLinkedList(0)
instance.getList() // [0]
instance.add(2)
instance.getList() // [0, 2]
instance.delete(0)
instance.searchFromFirst(0) // false
instance.searchFromLast(0) // false
instance.searchFromFirst(2) // true
instance.searchFromLast(2) // true
instance.getList() // [2]
instance.addBefore(1, 2)
instance.getList() // [1, 2]
instance.addAfter(0, 1)
instance.getList() // [1, 0, 2]
```

