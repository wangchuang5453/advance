// const log4js = require("log4js");
// const logger = log4js.getLogger();
// logger.level = "debug";
// log4js.configure({
//   appenders: { cheese: { type: "file", filename: "cheese.log" } },
// });
/**
 * 
 */


class myNode {
  constructor(key, value) {
    this.nodeCount = 1;
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
      node.nodeCount++; // 经过即+1
      node.left = this._insert(node.left, key, value);
    } else {
      node.nodeCount++;
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
    let q = this.q = []; // 当做队列使用
    q.push(this.root);
    while (q.length > 0) {
      let node = q.shift(0);
      // console.log(node.key);
      console.log(node.nodeCount);
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
    node.nodeCount--;
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
      node.nodeCount--;
      return node;
    } else if (key > node.key) {
      node.right = this._remove(node.right, key);
      node.nodeCount--;
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
      copySuccessor.nodeCount = --node.nodeCount;
      copySuccessor.left = node.left;
      this.count--;
      return copySuccessor;
    }
  }

  /**
   * 寻找前驱
   * 
   */
  predecessor(node, key) {
    const keyNode = this._search(node, key);
    if (keyNode === null) {
      return null;
    }
    if (keyNode.left !== null) {
      return this._maximum(keyNode).key;
    }
    // 从根节点找这个前驱
    const preNode = this._predecessorFromAncestor(this.root, key);
    return preNode === null ? null : preNode.key;
  }

  /**
   * 从根节点到key的路径上（祖先中）找前驱
   * 算法调用前已保证key存在在以node为根的二叉树中
   * 
   * @param {*} node 
   * @param {*} key 
   * 返回比key小的最大值所在节点
   */
  _predecessorFromAncestor(node, key) {
    //
    if (node.key === key) {
      return null;
    }
    if (key < node.key) {
      return this._predecessorFromAncestor(node.left, key);
    } else { // key > node.key
      // 递归函数在不调用递归的地方停止，才会停止继续递归
      // 如果当前节点小于key, 则当前节点有可能是比key小的最大值
      // 向右继续搜索, 将结果存储到tempNode中
      let tempNode = this._predecessorFromAncestor(node.right, key);
      if (tempNode) { // 如果tempNode不为空，则找到了这个值，则直接返回
        return tempNode; // 用于层层返回找到的那个node，就是下面这个return的node
      } else { // 如果tempNode为空，则当前节点即为结果
        return node;
      }
    }
  }

  /**
   * 寻找后继
   * node为根节点，在比key大的值中最小的那一个
   * @param {*} node 
   * @param {*} node
   */
  successor(node, key) {
    const keyNode = this._search(node, key);
    if (keyNode === null) {
      return null;
    }
    if (keyNode.right !== null) {
      return this._minimum(keyNode.right, key).key;
    }
    const sucNode = this._successorFromAncestor(node, key);
    return sucNode === null ? null : sucNode.key;
  }

  /**
   * 在node到key的路径中寻找后继
   * 
   */
  _successorFromAncestor(node, key) {
    if (node.key === key) {
      return null;
    }
    if (key > node.key) {
      return this._successorFromAncestor(node.right, key);
    } else {
      const tempNode = this._successorFromAncestor(node.left, key);
      if (tempNode) {
        return tempNode;
      } else {
        return node;
      }
    }
  }

  /**
   * 寻找key的floor值, 递归算法
   * 如果不存在key的floor值(key比BST中的最小值还小), 返回NULL
   * @param {*} key 
   * @returns 
   */
  floor(key) {
    if (this.count === 0 || key < this.minimum()) {
      return null;
    }
    const floorNode = this._floor(this.root, key);
    return floorNode.key;
  }

  /**
   * 
   * @param {*} node 
   * @param {*} key 
   * 返回floor的node 目前是没有重复值的情况，相等就是key，小于key的那个最大值
   */
  _floor(node, key) {
    // 如果不存在这个key，node == null也可以意思是找尽了，根据二叉搜索树的插入规则，一定有这个floor，可以自己造数据试试
    if (node === null) {
      return null;
    }
    if (node.key === key) {
      return node;
    }
    if (key < node.key) { 
      return this._floor(node.left, key);
    }
    
    const tempNode = this._floor(node.right, key);
    if (tempNode !== null) {
      return tempNode;
    }
    
    return node;
  }

  ceil() {
    // 
  }

  _ceil() {
    // 
  }

  /**
   * 二分搜索树的rank
   */
  rank(key) {
    const rankNum = this._rank(this.root, key);
    console.log(rankNum, '=== rank num');
  }
 
  /**
   * 返回顺序
   */
  _rank(node, key) { // 以node为根节点的排序
    if (node === null) {
      return 0;
    }

    if (key === node.key) {
      return this.getNodeCount(node.left);
    } else if (key < node.key) {
      return this._rank(node.left, key);
    } else {
      return this.getNodeCount(node.left) + 1 + this._rank(node.right, key);
    }
  }

  /**
   * 在node中找到排名为k的键
   */
  select(k) {
    const key = this._select(this.root, k).key;
    console.log(key, '=== select');
  }

  _select(node, k) {
    if (node === null) {
      return null;
    }
    let nodeRank = this.getNodeCount(node.left);
    if (k === nodeRank) {
      return node;
    } else if (k < nodeRank) {
      return this._select(node.left, k);
    } else {
      return this._select(node.right, k - nodeRank - 1);
    }
  }

  getNodeCount(node) {
    if (node === null) {
      return 0;
    }
    return node.nodeCount;
  }



  /**
   * 释放空间
   */
  destroy(node) {
    //  
  }
}

const bst = new BST();
bst.insert(41, 0);
bst.insert(22, 1);
bst.insert(58, 2);

bst.insert(15, 0);
bst.insert(33, 1);
bst.insert(13, 2);
bst.insert(37, 2);

bst.insert(50, 0);
bst.insert(63, 1);
bst.insert(42, 2);
bst.insert(53, 2);
// logger.debug(bst.data);
// bst.levelOrder();
// console.log(bst.q);
// bst.remove(50);
// console.log('======');
// bst.levelOrder();
// bst.rank(58); // 9

bst.select(9); // 58