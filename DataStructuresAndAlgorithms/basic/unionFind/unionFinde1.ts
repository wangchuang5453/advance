/**
 * quick find
 */

class UnionFind {
  id: number[];
  
  count: number;

  constructor(n: number) {
    this.count = n;
    this.id = new Array<number>(n);
    for (let i = 0; i < n; i++) {
      this.id[i] = i;
    }
  }

  find(p: number): number {
    if (p < 0 || p >= this.count) {
      return -1;
    }
    return this.id[p];
  }

  isConnected(p: number, q: number): boolean {
    return this.find(p) == this.find(q);
  }

  union(p: number, q: number): void | undefined {
    let pId: number = this.find(p);
    let qId: number = this.find(q);
    if (pId === qId) {
      return;
    }
    // O(n)
    for (let i = 0; i < this.count; i++) {
      if (this.id[i] === pId) {
        this.id[i] = qId;
      }
    }
  }
}


// new UnionFind(10);