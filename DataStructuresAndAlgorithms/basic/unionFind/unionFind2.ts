/**
 * quick union
 */

class UnionFind {
  private parent: number[];
  private count: number;

  constructor(count: number) {
    this.count = count;
    this.parent = new Array<number>(this.count);
    for (let i = 0; i < this.count; i++) {
      this.parent[i] = i;      
    }
  }

  find(p: number): number {
    if (p<0 || p>= this.count) {
      return -1;
    }
    while(p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  isConnected(p: number, q:number): boolean {
    return this.find(p) === this.find(q);
  }

  union(p: number, q:number): void | undefined {
    let pRoot: number = this.find(p);
    let qRoot: number = this.find(q);
    if (pRoot === qRoot) {
      return;
    }
    this.parent[pRoot] = qRoot;
  }
}

/**
 * 进一步优化
 * 少的根节点指向多的根节点，减少层级数
 * 因为如果少的只有一个就容易合并成一个长层级的链条
 */
class UnionFind2 {
  private parent: number[];
  private size: number[]; // size[i]表示以i为根的集合中元素的个数
  private count: number;

  constructor(count: number) {
    this.count = count;
    this.parent = new Array<number>(this.count);
    this.size = new Array<number>(this.count);
    
    for (let i = 0; i < this.count; i++) {
      this.parent[i] = i;  
      this.size[i] = 1;    
    }
  }

  find(p: number): number {
    if (p<0 || p>= this.count) {
      return -1;
    }
    while(p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  isConnected(p: number, q:number): boolean {
    return this.find(p) === this.find(q);
  }

  union(p: number, q:number): void | undefined {
    let pRoot: number = this.find(p);
    let qRoot: number = this.find(q);
    if (pRoot === qRoot) {
      return;
    }
    // 优化
    if (this.size[pRoot] < this.size[qRoot]) {
      this.parent[pRoot] = qRoot;
      this.size[qRoot] += this.size[pRoot];
    } else {
      this.parent[qRoot] = pRoot;
      this.size[pRoot] += this.size[qRoot];
    }
  }
}

/**
 * 再进一步优化
 * 层数少的合并到层数多的
 */

class UnionFind3 {
  private parent: number[];
  private rank: number[]; // rank[i]表示以i为根的集合中元素的层数
  private count: number;

  constructor(count: number) {
    this.count = count;
    this.parent = new Array<number>(this.count);
    this.rank = new Array<number>(this.count);
    
    for (let i = 0; i < this.count; i++) {
      this.parent[i] = i;  
      this.rank[i] = 1;    
    }
  }

  find(p: number): number {
    if (p<0 || p>= this.count) {
      return -1;
    }
    while(p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  isConnected(p: number, q:number): boolean {
    return this.find(p) === this.find(q);
  }

  union(p: number, q:number): void | undefined {
    let pRoot: number = this.find(p);
    let qRoot: number = this.find(q);
    if (pRoot === qRoot) {
      return;
    }
    // 优化
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[pRoot] = qRoot;
      this.rank[qRoot] += 1;
    }
  }
}

/**
 * 优化find
 * 路径压缩
 */


class UnionFind4 {
  private parent: number[];
  private rank: number[]; // rank[i]表示以i为根的集合中元素的层数
  private count: number;

  constructor(count: number) {
    this.count = count;
    this.parent = new Array<number>(this.count);
    this.rank = new Array<number>(this.count);
    
    for (let i = 0; i < this.count; i++) {
      this.parent[i] = i;  
      this.rank[i] = 1;    
    }
  }

  find(p: number): number {
    if (p<0 || p>= this.count) {
      return -1;
    }
    while(p !== this.parent[p]) {
      // 直接跳一级指向，同时改变链条顺序
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }

  isConnected(p: number, q:number): boolean {
    return this.find(p) === this.find(q);
  }

  union(p: number, q:number): void | undefined {
    let pRoot: number = this.find(p);
    let qRoot: number = this.find(q);
    if (pRoot === qRoot) {
      return;
    }
    // 优化
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[pRoot] = qRoot;
      this.rank[qRoot] += 1;
    }
  }
}

/**
 * 进一步路径压缩
 * 就剩2层
 * 完全扁平化
 */

 class UnionFind5 {
  private parent: number[];
  private rank: number[]; // rank[i]表示以i为根的集合中元素的层数
  private count: number;

  constructor(count: number) {
    this.count = count;
    this.parent = new Array<number>(this.count);
    this.rank = new Array<number>(this.count);
    
    for (let i = 0; i < this.count; i++) {
      this.parent[i] = i;  
      this.rank[i] = 1;    
    }
  }

  find(p: number): number {
    if (p<0 || p>= this.count) {
      return -1;
    }
    // 优化 因为递归会比上述会慢一些，因为在递归整理层级
    // 只是理论上最优
    if (p !== this.parent[p]) {
      this.parent[p] = this.find(this.parent[p]);
    }
    return this.parent[p];
  }

  isConnected(p: number, q:number): boolean {
    return this.find(p) === this.find(q);
  }

  union(p: number, q:number): void | undefined {
    let pRoot: number = this.find(p);
    let qRoot: number = this.find(q);
    if (pRoot === qRoot) {
      return;
    }
    // 优化
    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[pRoot] = qRoot;
      this.rank[qRoot] += 1;
    }
  }
}

/**
 * 经过路径压缩之后
 * 时间复杂度近乎是O(1)的
 */