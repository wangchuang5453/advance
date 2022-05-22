/**
 * 稠密图
 */

export class DenseGraph {
  private n: number; // 点
  private m: number; // 边
  private directed: boolean;
  private g: Array<Array<boolean>>;
  constructor(n: number, directed: boolean) {
    this.n = n;
    this.m = 0;
    this.g = [];
    this.directed = directed;
    for (let i = 0; i < n; i++) {
      this.g.push(new Array(n).fill(false));
    }
  }

  V(): number {
    return this.n;
  }

  E(): number {
    return this.m;
  }

  addEdge(v: number, w: number): void | undefined { // 传入两个顶点相应的索引
    if (v < 0 || v >= this.n) return;
    if (w < 0 || w >= this.n) return;
    if (this.hasEdge(v, w)) {
      return;
    }
    this.g[v][w] = true;
    if (!this.directed) {
      this.g[w][v] = true;
    }
    this.m ++;
  }

  hasEdge(v: number, w: number): boolean | undefined {
    if (v < 0 || v >= this.n) return;
    if (w < 0 || w >= this.n) return;
    return this.g[v][w];
  }

  static adjIterator = class {
    private G: DenseGraph;
    private v: number;
    private index: number;
    constructor(graph: DenseGraph, v: number) {
      this.G = graph;
      this.v = v;
      this.index = -1;
    }
    begin() {
      this.index = -1;
      return this.next();
    }
    next() {
      for (this.index += 1; this.index < this.G.V(); this.index ++) {
        if (this.G.g[this.v][this.index]) {
          return this.index;
        }
      }
      return -1;
    }
    end(): boolean {
      return this.index >= this.G.V();
    }
  }
}

