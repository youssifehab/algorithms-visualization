export class Graph {
  adjcencyList: Map<string, string[]>;

  constructor() {
    this.adjcencyList = new Map();
  }

  addVertex(vertex: string) {
    if (!this.adjcencyList.has(vertex)) this.adjcencyList.set(vertex, []);
  }

  addEdge(src: string, dst: string) {
    if (!this.adjcencyList.has(src)) this.adjcencyList.set(src, []);
    if (!this.adjcencyList.has(dst)) this.adjcencyList.set(dst, []);
    this.adjcencyList.get(src)?.push(dst);
    this.adjcencyList.get(dst)?.push(src);
  }

  getNeighbors(vertex: string) {
    return this.adjcencyList.get(vertex) || [];
  }

  dfs(src: string, visited: Set<string> = new Set(), result: string[] = []) {
    if (visited.has(src)) return result;

    visited.add(src);
    result.push(src);

    const neighbors = this.adjcencyList.get(src) || [];
    for (let nei of neighbors) {
      if (!visited.has(nei)) {
        this.dfs(nei, visited, result);
      }
    }

    return result;
  }

  bfs(src: string) {
    let queue: string[] = [src];
    let visited: Set<string> = new Set();
    let result: string[] = [];

    while (queue.length > 0) {
      let current = queue.shift()!;
      if (visited.has(current)) continue;

      visited.add(current);
      result.push(current);

      const neighbors = this.adjcencyList.get(current) || [];
      for (let nei of neighbors) {
        if (!visited.has(nei)) {
          queue.push(nei);
        }
      }
    }

    return result;
  }
}
