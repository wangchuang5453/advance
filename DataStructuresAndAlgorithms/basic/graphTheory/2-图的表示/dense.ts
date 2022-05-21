/**
 * 稠密图
 */

class DenseGraph {
  private n: number; // 点
  private m: number; // 边
  private directed: boolean;
  public g: Array<Array<boolean>>;
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
}

// const d = new DenseGraph(3, true);
// d.addEdge(1, 1);
// console.log(d.g);
