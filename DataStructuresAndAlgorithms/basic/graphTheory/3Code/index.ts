import { DenseGraph } from '../2Code/dense';
import { SparseGraph } from '../2Code/sparse';

/**
 * 稀疏图遍历测试
 */
const test1 = () => {
  let N: number = 20; // 顶点
  let M: number = 100; // 边

  const graph = new SparseGraph(N, false);

  for (let i = 0; i < M; i++) {
    let V: number = Math.floor(Math.random() * N);
    let W: number = Math.floor(Math.random() * N);
    graph.addEdge(V, W);
  }
  
  // console.log(d.g[0]); //private 无法调用

  for (let v = 0; v < N; v++) {
    const g = new SparseGraph.adjIterator(graph, v);
    // console.log(g.begin()); // 真的可以使用到private
    const store = [];
    for (let w = g.begin(); !g.end(); w = g.next()) {
      store.push(w);
    }
    console.log(v);
    console.log(store.join(','));
  }
}

/**
 * 与test1的代码相同，只是修改成了稠密图
 */
const test2 = () => {
  let N: number = 20; // 顶点
  let M: number = 100; // 边

  const graph = new DenseGraph(N, false);

  for (let i = 0; i < M; i++) {
    let V: number = Math.floor(Math.random() * N);
    let W: number = Math.floor(Math.random() * N);
    graph.addEdge(V, W);
  }
  
  for (let v = 0; v < N; v++) {
    const g = new DenseGraph.adjIterator(graph, v);
    const store = [];
    /**
     * 遍历器用法
     */
    for (let w = g.begin(); !g.end(); w = g.next()) {
      store.push(w);
    }
    console.log(v);
    console.log(store.join(','));
  }
}

test1();
console.log('==============');
test2();
