import Link from "next/link";

const FEATURES = [
  {
    title: "Number of Islands",
    description:
      "Thuật toán đếm đảo bằng DFS/BFS trên grid 2D. Click tương tác trực tiếp trên grid.",
    href: "/islands",
    tag: "Graph / DFS",
  },
];

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Interview Algorithms
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Tổng hợp các thuật toán phỏng vấn với giải thích và demo tương tác.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60"
            >
              <span className="mb-2 inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                {feature.tag}
              </span>
              <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                {feature.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
