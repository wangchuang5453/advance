/**
 * 
 */

class myNode {
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
    // 创建
    this.root = this._insert(this.root, key, value);
  }

  contain(key) {
    return this._contain(this.root, key);
  }

  /**
   * 在二分搜索树中搜索键key所对应的值。如果这个值不存在, 则返回NULL
   * 
   */
  search(key) {
    const node = this._search(this.root, key);
    if (node === null) {
      return null;
    }
    return node.value;
  }

  /**
   * 在以node为根的二分搜索树中查找key所对应的node, 递归算法
   * 若key不存在, 则返回NULL
   */
  _search(node, key) {
    if (node === null) {
      return null;
    }

    if (key === node.key) {
      return node;
    } else if (key < node.key) {
      return this._search(node.left, key);
    } else {
      return this._search(node.right, key);
    }
  }

  _contain(node, key) {
    if (node === null) {
      return false;
    }

    if (key === node.key) {
      return true;
    } else if (key < node.key) {
      return this._contain(node.left, key);
    } else {
      return this._contain(node.right, key);
    }
  }

  // 向以node为根的二叉树中，插入节点(key, value)
  // 返回插入新节点后的二叉搜索树的根
  _insert(node, key, value) {
    // 第二步 递归到底的情况，最基本的
    if (node === null) {
      this.count++;
      return new myNode(key, value);
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
        if (root.left === null) { // js必须要这么处理
          // 如果把null赋值给root之后，再给root赋值Node，就挂载不上对象了
          this.count++;
          root.left = new myNode(key, value);
          return node;
        }
        root = root.left;
      } else {
        if (root.right === null) {
          this.count++;
          root.right = new myNode(key, value);
          return node;
        }
        root = root.right;
      }
    }
    this.count++;
    return new myNode(key, value);
  }

  /**
   * 前序遍历
   * 以node为根的二叉搜索树进行前序遍历
   */
  preOrder() {
    this._preOrder(this.root);
  }

  _preOrder(node) {
    if (node !== null) {
      console.log(node.key);
      this._preOrder(node.left);
      this._preOrder(node.right);
    }
  }

  /**
   * 中序遍历
   * 
   */
  inOrder() {
    this._inOrder(this.root);
  }
  _inOrder(node) {
    if (node !== null) {
      this._inOrder(node.left);
      console.log(node.key);
      this._inOrder(node.right);
    }
  }

  /**
   * 后序遍历
   * 
   */
  postOrder() {
    this._postOrder(this.root);
  }

  _postOrder(node) {
    if (node !== null) {
      this._postOrder(node.left);
      this._postOrder(node.right);
      console.log(node.key);
    }
  }

  /**
   * 层序遍历
   */
  levelOrder() {
    let q = []; // 当做队列使用
    q.push(this.root);
    while (q.length > 0) {
      let node = q.shift(0);
      console.log(node.key);
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }
  }

  /**
   * 最小键值
   * 
   */
  minimum() {
    const minNode = this._minimum(this.root);
    return minNode.key;
  }

  _minimum(node) {
    if (node.left === null) {
      return node;
    }
    return this._minimum(node.left);
  }

  /**
   * 移除最小键
   */
  removeMin() {
    if (this.root) {
      this.root = this._removeMin(this.root); // 递归这一句行为！！！我觉得是通过node=null干不掉自己，要采用覆盖的方式
    }
  }

  _removeMin(node) {
    if (node.left === null) { // 那此时按照二叉搜索树定义，node就是最小值了
      const rightNode = node.right;
      this.count--;
      return rightNode;
    }
    node.left = this._removeMin(node.left); // 上面 this.root = this._removeMin(this.root);
    return node; // 为了配合node.left===null的return 自己覆盖一下自己
  }

  /**
   * 最大键值
   * @param {*} node 
   */
  maximum() {
    const maxNode = this._maximum(this.root);
    return maxNode.key;
  }

  _maximum(node) {
    if (node.right === null) {
      return node;
    }
    return this._minimum(node.right);
  }

  /**
   * 移除最大键
   * @param {*} node 
   */

  removeMax() {
    if (this.root) {
      this.root = this._removeMax(this.root);
    }
  }

  _removeMax(node) {
    if (node.right === null) {
      const nodeLeft = node.left;
      this.count--;
      return nodeLeft;
    }
    node.right = this._removeMax(node.right);
    return node;
  }

  /**
   * 删除以node为根的键值为key的节点
   * @param {*} key 
   */
  remove(key) {
    this.root = this._remove(this.root, key)
  }

  _remove(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this._remove(node.left, key);
      return node;
    } else if (k > node.key) {
      node.right = this._remove(node.right, key);
      return node;
    } else {
      if (node.left === null) {
        const rightNode = node.right; // 如果左右皆空，也是进入这个判断，这里就是返回空了
        this.count--;
        return rightNode;
      }
      if (node.right === null) {
        const nodeLeft = node.left;
        this.count--;
        return nodeLeft;
      }
      // node.left !== null && node.right !== null
      let successor = this._minimum(node.right);
      // successor会被覆盖掉，复制一份
      let copySuccessor = new myNode(successor.key, successor.value);
      this.count++; // this._removeMin会减掉一个，这里补一下
      copySuccessor.right = this._removeMin(node.right);
      copySuccessor.left = node.left;
      this.count--;
      return copySuccessor;
    }
  }

  /**
   * 寻找前驱
   * 
   */
  predecessor(key) {
    const pKey = this._predecessor(this.root, key);
  }

  _predecessor(node, key) {
    

  }


  /**
   * 释放空间
   */
  destroy(node) {
    //  
  }
}

// const bst = new BST();
// bst.insert(99, 0);
// bst.insert(98, 1);
// bst.insert(100, 2);

// bst.insert(96, 0);
// bst.insert(101, 1);
// bst.insert(95, 2);

// bst.insert(102, 0);
// bst.insert(103, 1);
// bst.insert(94, 2);

// console.log(bst.root);
// bst.inOrder();