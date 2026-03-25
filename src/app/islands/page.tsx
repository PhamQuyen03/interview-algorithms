import IslandGrid from "@/components/island-grid";
import IslandExplanation from "@/components/island-explanation";

export const metadata = {
  title: "Number of Islands - Thuật toán đếm đảo",
  description: "Giải thích và demo tương tác thuật toán Number of Islands (BFS)",
};

const IslandsPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-3xl px-6 py-16 space-y-12">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Number of Islands
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Thuật toán đếm số đảo trong ma trận 2D — bài toán kinh điển sử dụng
            BFS/DFS.
          </p>
        </header>

        <IslandGrid />

        <hr className="border-zinc-200 dark:border-zinc-800" />

        <IslandExplanation />
      </main>
    </div>
  );
};

export default IslandsPage;
