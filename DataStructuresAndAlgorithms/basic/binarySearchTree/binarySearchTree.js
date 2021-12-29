/**
 * 
 */

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null; // Node
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null; // Node
    this.count = 0;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  insert(key, value) {
    this.root = this._insert(this.root, key, value);
  }

  // 向以node为根的二叉树中，插入节点(key, value)
  // 返回插入新节点后的二叉搜索树的根
  _insert(node, key, value) {
    // 第二步 递归到底的情况，最基本的
    if (node === null) {
      return new Node(key, value);
    }

    // 第一步
    if (key === node.key) {
      node.value = value; // 更新操作
    } else if (key < node.key) {
      node.left = this._insert(node.left, key, value);
    } else {
      node.right = this._insert(node.right, key, value);
    }
    return node;

  }

  // 使用非递归的方式实现
  _insert2(node, key, value) {
    let root = node; // 不能直接替换掉node，此处使用node的节点对象替换root来获取node
    while (root !== null) {
      if (key === root.key) {
        root.value = value;
      } else if (key < root.key) {
        if (root.left === null) {
          // 如果把null赋值给root之后，再给root赋值Node，就挂载不上对象了
          root.left = new Node(key, value);
          return node;
        }
        root = root.left;
      } else {
        if (root.right === null) {
          root.right = new Node(key, value);
          return node;
        }
        root = root.right;
      }
    }
    return new Node(key, value);
  }
}