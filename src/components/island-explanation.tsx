const dfsCodeExample = `const numIslandsDFS = (grid: string[][]): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const dfs = (r: number, c: number) => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") return;

    grid[r][c] = "0"; // đánh dấu đã thăm

    dfs(r - 1, c); // trên
    dfs(r + 1, c); // dưới
    dfs(r, c - 1); // trái
    dfs(r, c + 1); // phải
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
};`;

const bfsCodeExample = `const numIslandsBFS = (grid: string[][]): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const bfs = (r: number, c: number) => {
    const queue: [number, number][] = [[r, c]];
    grid[r][c] = "0"; // đánh dấu đã thăm

    while (queue.length > 0) {
      const [cr, cc] = queue.shift()!;
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

      for (const [dr, dc] of directions) {
        const nr = cr + dr;
        const nc = cc + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === "1") {
          grid[nr][nc] = "0";
          queue.push([nr, nc]);
        }
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        bfs(r, c);
      }
    }
  }

  return count;
};`;

const IslandExplanation = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Giải thích thuật toán
      </h2>

      <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-7">
        <p>
          <strong>Number of Islands</strong> (Đếm số đảo) là một bài toán kinh
          điển trong lập trình. Cho một ma trận 2D gồm{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono dark:bg-zinc-800">
            &quot;1&quot;
          </code>{" "}
          (đất) và{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono dark:bg-zinc-800">
            &quot;0&quot;
          </code>{" "}
          (nước), đếm số lượng đảo. Một đảo là một nhóm các ô đất kết nối với
          nhau theo 4 hướng (trên, dưới, trái, phải).
        </p>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Cách 1: DFS (Depth-First Search) — Đệ quy
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Duyệt qua từng ô trong ma trận.</li>
          <li>
            Khi gặp ô đất chưa thăm, tăng biến đếm lên 1 và gọi đệ quy DFS
            từ ô đó.
          </li>
          <li>
            DFS đi sâu theo từng hướng (trên, dưới, trái, phải), đánh dấu đã
            thăm để không đếm lại.
          </li>
          <li>Khi không còn ô kề nào chưa thăm, quay lui (backtrack).</li>
        </ol>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Cách 2: BFS (Breadth-First Search) — Hàng đợi
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Duyệt qua từng ô trong ma trận.</li>
          <li>
            Khi gặp ô đất chưa thăm, tăng biến đếm lên 1 và đưa ô đó vào
            queue.
          </li>
          <li>
            BFS lấy từng ô ra khỏi queue, lan ra tất cả các ô đất kề nhau và
            đánh dấu đã thăm.
          </li>
          <li>Lặp lại cho đến khi duyệt hết ma trận.</li>
        </ol>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          So sánh DFS vs BFS
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>DFS:</strong> Code gọn hơn nhờ đệ quy, nhưng có thể bị
            stack overflow với grid rất lớn.
          </li>
          <li>
            <strong>BFS:</strong> Dùng queue nên không lo stack overflow, nhưng
            code dài hơn.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Độ phức tạp (cả 2 cách)
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Thời gian:</strong> O(m × n) — mỗi ô được thăm tối đa 1
            lần
          </li>
          <li>
            <strong>Không gian:</strong> O(m × n) — call stack (DFS) hoặc queue
            (BFS) trong trường hợp xấu nhất
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Code DFS (Đệ quy)
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm leading-6 text-zinc-100">
          <code>{dfsCodeExample}</code>
        </pre>

        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Code BFS (Hàng đợi)
        </h3>
        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm leading-6 text-zinc-100">
          <code>{bfsCodeExample}</code>
        </pre>
      </div>
    </section>
  );
};

export default IslandExplanation;
