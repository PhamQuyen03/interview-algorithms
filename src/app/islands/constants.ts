export const ROWS = 8;
export const COLS = 8;

export const ISLAND_COLORS = [
  "bg-emerald-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-lime-500",
  "bg-indigo-500",
  "bg-teal-500",
] as const;

export const ISLAND_TEXT_COLORS = [
  "text-emerald-600 dark:text-emerald-400",
  "text-violet-600 dark:text-violet-400",
  "text-orange-600 dark:text-orange-400",
  "text-rose-600 dark:text-rose-400",
  "text-cyan-600 dark:text-cyan-400",
  "text-yellow-600 dark:text-yellow-400",
  "text-pink-600 dark:text-pink-400",
  "text-lime-600 dark:text-lime-400",
  "text-indigo-600 dark:text-indigo-400",
  "text-teal-600 dark:text-teal-400",
] as const;

export type CellState = "water" | "land" | number;
