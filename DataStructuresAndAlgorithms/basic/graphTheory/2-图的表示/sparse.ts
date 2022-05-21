/**
 * 稀疏图
 */

 class SparseGraph {
  private n: number; // 点
  private m: number; // 边
  private directed: boolean;
  public g: Array<Array<number>>;
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
    // 处理平行边，遍历 O(n) 邻接表的一个缺点
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
}

// const d = new SparseGraph(3, true);
// d.addEdge(1, 2);
// d.addEdge(0, 2);
// console.log(d.g);


