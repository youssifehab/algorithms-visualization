export class Graph {
  adjcencyList: Map<string, string[]>;

  constructor() {
    this.adjcencyList = new Map();
  }

  addVertex(vertex: string) {
    if (!(vertex in this.adjcencyList)) this.adjcencyList.set(vertex, []);
  }

  addEdge(src: string, dst: string) {
    if (!(src in this.adjcencyList)) this.adjcencyList.set(src, []);
    if (!(dst in this.adjcencyList)) this.adjcencyList.set(dst, []);
    this.adjcencyList.get(src)?.push(dst);
    this.adjcencyList.get(dst)?.push(src);
  }

  dfs(src: string, visited: Set<string> = new Set(), result: string[] = []) {
    if (visited.has(src)) return result;

    visited.add(src);
    result.push(src);

    for (let nei of this.adjcencyList.get(src) || []) {
      if (!visited.has(nei)) this.dfs(nei, visited);
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

      for (let nei in this.adjcencyList.get(current)) {
        if (!visited.has(nei)) queue.push(current);
      }
    }

    return result;
  }
}
