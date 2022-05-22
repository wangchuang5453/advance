/**
 * 稀疏图
 */

export class SparseGraph {
  private n: number; // 点
  private m: number; // 边
  private directed: boolean;
  private g: Array<Array<number>>;
  constructor(n: number, directed: boolean) {
    this.n = n;
    this.m = 0;
    this.g = [];
    this.directed = directed;
    for (let i = 0; i < n; i++) {
      this.g[i] = [];
    }
  }

  V(): number {
    return this.n;
  }

  E(): number {
    return this.m;
  }

  addEdge(v: number, w: number): void | undefined { // 传入两个顶点相应的索引
    if (v < 0 || v >= this.n) {
      console.error('v out of bounds');
      return;
    };
    if (w < 0 || w >= this.n) {
      console.error('w out of bounds');
      return;
    };
    // 处理平行边，遍历 O(n) 邻接表的一个缺点 暂时不考虑不处理平行边以保证性能
    // if (this.hasEdge(v, w)) {
    //   return;
    // }
    this.g[v].push(w);
    
    if (!this.directed && v !== w) { // v !== w 处理自环边 不处理传入两个顶点是同一个这种情况
      this.g[w].push(v);
    }
    this.m ++;
  }

  hasEdge(v: number, w: number): boolean {
    if (v < 0 || v >= this.n) {
      console.error('v out of bounds');
      return false;
    };
    if (w < 0 || w >= this.n) {
      console.error('w out of bounds');
      return false;
    };
    for (let i = 0; i < this.g[v].length; i++) {
      if (this.g[v][i] === w) {
        return true;
      }
    }
    return false;
  }

  /**
   * 稀疏图邻边迭代器
   */
  static adjIterator = class {
    private G: SparseGraph;
    private v: number;
    private index: number;
    constructor(graph: SparseGraph, v: number) {
      this.G = graph;
      this.v = v;
      this.index = -1;
    }
    begin() {
      this.index = 0;
      if (this.G.g[this.v].length > 0) {
        return this.G.g[this.v][this.index];
      }
      return -1;
    }
    next() {
      this.index ++;
      if (this.index < this.G.g[this.v].length) {
        return this.G.g[this.v][this.index];
      }
      return -1;
    }
    end(): boolean {
      return this.index >= this.G.g[this.v].length;
    }
  }
}

