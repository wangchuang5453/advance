/**
 * trie 字典树 or 前缀树
 */

class TrieNode {
  constructor(nodeChar) {
    this.nodeChar = nodeChar;
  }
  /**
   * 该节点字符
   */
  nodeChar = null;
  childNodes = [];
  freq = 0; // 词频
  isEnd = false;
  letterFreq = 1;
}

class Trie {
  constructor() {
    this.root = null;
  }

  insert(words) {
    this.root = this._insert(this.root, words);
  }

  _insert(node, words) {
    // https://www.cnblogs.com/huangxincheng/archive/2012/11/25/2788268.html
    // https://www.jianshu.com/p/e431bd41d676
    if (words.length == 0) {
      return node;
    }
    if (node === null) {
      node = new TrieNode(null);
    }
    const word = words[0];
    let p = word.charCodeAt() - 'a'.charCodeAt();
    if (node.childNodes[p] == null) {
      node.childNodes[p] = new TrieNode(word);
    } else {
      node.childNodes[p].letterFreq++;
    }
    const nextWords = words.slice(1);
    if (nextWords.length === 0) {
      node.childNodes[p].freq++; //说明是最后一个字符，统计该词出现的次数
      node.childNodes[p].isEnd = true;
    }
    node.childNodes[p] = this._insert(node.childNodes[p], nextWords);
    return node;
  }

  /**
   * 迭代的方式
   * @param {*} node 
   * @param {*} words 
   */
  _insert2(node, words) {
    if (node === null) {
      node = new TrieNode(null);
    }
    if (words.length === 0) {
      return node;
    }
    let i = 0;
    while(i < words.length) {
      const word = words[i];
      const p = word.charCodeAt() - 'a'.charCodeAt();
      if (node.childNodes[p] == null) { // 数组空数据是 undefined
        node.childNodes[p] = new TrieNode(word);
      } else {
        node.childNodes[p].letterFreq++;
      }
      node = node.childNodes[p];
      i++;
      if (i === words.length) {
        node.freq++;
        node.isEnd = true;
      }
    }
    return node;
  }

  /**
   * search
   * @param {*} node 
   * @param {*} words 
   * @returns 
   */
  search(node, words) {
    if (node === null) {
      return false;
    }
    if (words.length === 0) {
      return false;
    }
    const word = words[0];
    let p = word.charCodeAt() - 'a'.charCodeAt();
    if (node.childNodes[p] == null || node.childNodes[p].nodeChar !== word) { // trie根节点都是空nodeChar
      return false;
    }
    let nextWords = words.slice(1);
    if (nextWords.length === 0) { // 此时为最后一个节点了
      return node.childNodes[p].isEnd;
    }
    return this.search(node.childNodes[p], nextWords);
  }

  /**
   * startWith
   * @param {*} node 
   * @param {*} words 
   * @returns 
   */
  startWith(node, words) {
    if (node === null) {
      return false;
    }
    if (words.length === 0) {
      return false;
    }
    const word = words[0];
    let p = word.charCodeAt() - 'a'.charCodeAt();
    if (node.childNodes[p] == null || node.childNodes[p].nodeChar !== word) { // trie根节点都是空nodeChar
      return false;
    }
    let nextWords = words.slice(1);
    if (nextWords.length === 0) { // 此时为最后一个节点了
      return true;
    }
    return this.startWith(node.childNodes[p], nextWords);
  }

  delete(node, words) {
    // 
  }
}
const trie = new Trie();
trie.insert('new')
trie.insert('news')
trie.insert('nu')
console.log(trie.root);
const res = trie.search(trie.root, 'nw');
console.log(res);
const res2 = trie.startWith(trie.root, 'ne');
console.log(res2);
