/**
 * 稠密图 邻接矩阵
 * 自环边和平行边情况要思考进去
 */

class DenseGraph {
  private n: number; // 节点
  private m: number; // 边数
  private directed: boolean; // 是否为有向图
  private g: Array<Array<boolean>>; // 图的具体数据
  
  constructor(n: number, directed: boolean) {
    this.n = n;
    this.directed = directed;
    this.m = 0;
    this.g = new Array<Array<boolean>>(n).fill(new Array<boolean>(n).fill(false));
  }

  V(): number {
    return this.n;
  }

  E(): number {
    return this.m;
  }

  addEdge(v: number, w: number): void | undefined {
    if (v < 0 || v >= this.n) {
      return;
    }
    if (w < 0 || w >= this.n) {
      return;
    }

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
    if (v < 0 || v >= this.n) {
      return;
    }
    if (w < 0 || w >= this.n) {
      return;
    }
    return this.g[v][w];
  }
}


/**
 * 邻接表表示
 * 邻接表考虑平行边需要进行遍历，O(n)
 * 所以在这里不考虑平行边情况
 * 优化的话可以整体处理平行边
 * 此课程不考虑邻接表不考虑平行边，测试用例也不会有平行边情况
 */

class SparseGraph {
  private n: number; // 节点
  private m: number; // 边数
  private directed: boolean; // 是否为有向图
  private g: Array<Array<number>>; // 图的具体数据
  
  constructor(n: number, directed: boolean) {
    this.n = n;
    this.directed = directed;
    this.m = 0;
    // g初始化为n个空的vector, 表示每一个g[i]都为空, 即没有任和边
    this.g = new Array<Array<number>>(n).fill([]);
  }

  V(): number {
    return this.n;
  }

  E(): number {
    return this.m;
  }

  // 向图中添加一个边
  addEdge(v: number, w: number): void | undefined {
    if (v < 0 || v >= this.n) {
      return;
    }
    if (w < 0 || w >= this.n) {
      return;
    }

    this.g[v].push(this.m);
    if (v !== w && !this.directed) {
      this.g[w].push(v);
    }

    this.m ++;
  }

  // 验证图中是否有从v到w的边
  hasEdge(v: number, w: number): boolean | undefined {
    if (v < 0 || v >= this.n) {
      return;
    }
    if (w < 0 || w >= this.n) {
      return;
    }
    for( let i = 0 ; i < this.g[v].length ; i ++ )
      if( this.g[v][i] == w )
        return true;
    return false;
  }
}

