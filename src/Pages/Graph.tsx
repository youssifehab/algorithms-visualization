import { Button, Space, Layout, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { Graph as GraphDS } from "../Algorithms-DS/Graph";

interface Node {
  id: string;
  x: number;
  y: number;
  visited: boolean;
}

export const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [graph] = useState<GraphDS>(new GraphDS());
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", x: 300, y: 100, visited: false },
    { id: "2", x: 150, y: 250, visited: false },
    { id: "3", x: 450, y: 250, visited: false },
    { id: "4", x: 150, y: 400, visited: false },
    { id: "5", x: 300, y: 400, visited: false },
    { id: "6", x: 450, y: 400, visited: false },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    graph.addVertex("1");
    graph.addVertex("2");
    graph.addVertex("3");
    graph.addVertex("4");
    graph.addVertex("5");
    graph.addVertex("6");

    graph.addEdge("1", "2");
    graph.addEdge("1", "3");
    graph.addEdge("2", "4");
    graph.addEdge("2", "5");
    graph.addEdge("3", "6");

    drawGraph();
  }, []);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges using adjacencyList
    graph.adjcencyList.forEach((neighbors, vertex) => {
      const fromNode = nodes.find((n) => n.id === vertex);
      if (fromNode) {
        neighbors.forEach((neighbor) => {
          const toNode = nodes.find((n) => n.id === neighbor);
          if (toNode) {
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.strokeStyle = "#001529";
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = node.visited ? "#87d068" : "#1890ff";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.id, node.x, node.y);
    });
  };

  const resetNodes = () => {
    setNodes(nodes.map((node) => ({ ...node, visited: false })));
  };

  const runDFS = async () => {
    setIsRunning(true);
    resetNodes();
    const startNode = "1";
    const result = graph.dfs(startNode);

    for (const vertex of result) {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === vertex ? { ...node, visited: true } : node
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setIsRunning(false);
  };

  const runBFS = async () => {
    setIsRunning(true);
    resetNodes();
    const startNode = "1";
    const result = graph.bfs(startNode);

    for (const vertex of result) {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === vertex ? { ...node, visited: true } : node
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setIsRunning(false);
  };

  useEffect(() => {
    drawGraph();
  }, [nodes]);

  return (
    <div
      style={{
        padding: "20px",
        height: "0vh",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ whiteSpace: "nowrap", margin: 0 }}>DFS and BFS</h1>
        <Space>
          <Button onClick={runDFS} disabled={isRunning}>
            Run DFS
          </Button>
          <Button onClick={runBFS} disabled={isRunning}>
            Run BFS
          </Button>
        </Space>
      </div>

      <div>
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          style={{
            border: "1px solid #ccc",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
};
