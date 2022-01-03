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
  freq = 0;
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
    }
    const nextWords = words.slice(1);
    node.childNodes[p] = this._insert(node.childNodes[p], nextWords);
    return node;
  }
}
const trie = new Trie();
trie.insert('new')
trie.insert('news')
trie.insert('nu')
console.log(trie.root);
