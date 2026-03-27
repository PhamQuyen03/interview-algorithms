"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	ROWS,
	COLS,
	WATER,
	LAND,
	ISLAND_COLORS,
	ISLAND_TEXT_COLORS,
	type CellState,
} from "@/app/islands/constants";

const FIRST_ISLAND_INDEX = 2;

const createEmptyGrid = (): CellState[][] => {
	return Array.from({ length: ROWS }, () => Array(COLS).fill(WATER));
};

const generateRandomGrid = (): CellState[][] => {
	return Array.from({ length: ROWS }, () =>
		Array.from({ length: COLS }, () =>
			Math.round(Math.random()),
		),
	);
};

const IslandGrid = () => {
	const [grid, setGrid] = useState<CellState[][]>(createEmptyGrid);
	const [islandCount, setIslandCount] = useState<number | null>(null);
	const [islandCoords, setIslandCoords] = useState<[number, number][][]>([]);
	const [showLabels, setShowLabels] = useState(false);

	const toggleCell = (r: number, c: number) => {
		setShowLabels(true);
		setIslandCount(null);
		setIslandCoords([]);
		setGrid((prev) => {
			const next = prev.map((row) => [...row]);
			next[r][c] = prev[r][c] === LAND ? WATER : LAND;
			return next;
		});
	};

	const reset = () => {
		setGrid(createEmptyGrid());
		setShowLabels(false);
		setIslandCount(null);
		setIslandCoords([]);
	};

	const randomize = () => {
		setGrid(generateRandomGrid());
		setShowLabels(true);
		setIslandCount(null);
		setIslandCoords([]);
	};

	const countIslands = () => {
		const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
		const resultGrid: CellState[][] = grid.map((row) =>
			row.map((cell) => (cell === LAND ? LAND : WATER)),
		);
		const collectedCoords: [number, number][][] = [];

		const dfs = (
			r: number,
			c: number,
			colorIndex: number,
			currentIsland: [number, number][],
		) => {
			if (
				r < 0 ||
				r >= ROWS ||
				c < 0 ||
				c >= COLS ||
				resultGrid[r][c] !== LAND ||
				visited[r][c]
			)
				return;

			visited[r][c] = true;
			currentIsland.push([r, c]);
			resultGrid[r][c] = FIRST_ISLAND_INDEX + colorIndex;

			dfs(r - 1, c, colorIndex, currentIsland);
			dfs(r + 1, c, colorIndex, currentIsland);
			dfs(r, c - 1, colorIndex, currentIsland);
			dfs(r, c + 1, colorIndex, currentIsland);
		};

		let count = 0;
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				if (resultGrid[r][c] === LAND && !visited[r][c]) {
					const currentIsland: [number, number][] = [];
					collectedCoords.push(currentIsland);
					dfs(r, c, count % ISLAND_COLORS.length, currentIsland);
					count++;
				}
			}
		}

		setGrid(resultGrid);
		setIslandCount(count);
		setIslandCoords(collectedCoords);
	};

	const getCellClass = (cell: CellState) => {
		if (cell === WATER) return "bg-blue-200 dark:bg-blue-900";
		if (cell === LAND) return "bg-green-500";
		if (cell >= FIRST_ISLAND_INDEX)
			return ISLAND_COLORS[(cell - FIRST_ISLAND_INDEX) % ISLAND_COLORS.length];
		return "";
	};

	const getCellLabel = (cell: CellState): string => {
		if (cell === WATER) return "0";
		return "1";
	};

	return (
		<section className="space-y-5">
			<h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
				Grid tương tác
			</h2>

			<p className="text-sm text-zinc-500 dark:text-zinc-400">
				Click vào ô để thêm/xoá đất. Nhấn &quot;Đếm đảo&quot; để chạy thuật toán
				DFS.
			</p>

			<div
				className="inline-grid gap-1"
				style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
			>
				{grid.map((row, r) =>
					row.map((cell, c) => (
						<button
							key={`${r}-${c}`}
							onClick={() => toggleCell(r, c)}
							className={cn(
								"size-10 rounded-sm border border-zinc-300 dark:border-zinc-600 transition-colors duration-150 hover:opacity-80 cursor-pointer text-xs font-bold flex items-center justify-center",
								getCellClass(cell),
								cell === WATER
									? "text-blue-500 dark:text-blue-400"
									: "text-white",
							)}
							aria-label={`Ô ${r},${c}: ${cell === WATER ? "nước" : "đất"}`}
						>
							{showLabels ? getCellLabel(cell) : null}
						</button>
					)),
				)}
			</div>

			<div className="flex flex-wrap gap-3">
				<button
					onClick={countIslands}
					className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 cursor-pointer"
				>
					Đếm đảo
				</button>
				<button
					onClick={randomize}
					className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
				>
					Random
				</button>
				<button
					onClick={reset}
					className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
				>
					Reset
				</button>
			</div>

			{islandCount !== null && (
				<div className="space-y-3">
					<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950">
						<p className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
							Tìm thấy <span className="text-2xl">{islandCount}</span> đảo
						</p>
					</div>

					{islandCoords.length > 0 && (
						<div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
							<p className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
								Toạ độ các đảo:
							</p>
							<ul className="space-y-1.5">
								{islandCoords.map((coords, i) => (
									<li key={i} className="text-sm">
										<span
											className={cn(
												"font-semibold",
												ISLAND_TEXT_COLORS[i % ISLAND_TEXT_COLORS.length],
											)}
										>
											Đảo {i + 1}:
										</span>{" "}
										<span className="font-mono text-zinc-600 dark:text-zinc-400">
											{coords.map(([r, c]) => `(${r},${c})`).join(" ")}
										</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}

			<div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
				<span className="flex items-center gap-1.5">
					<span className="inline-block size-3 rounded-sm bg-blue-200 dark:bg-blue-900" />
					Nước (0)
				</span>
				<span className="flex items-center gap-1.5">
					<span className="inline-block size-3 rounded-sm bg-green-500" />
					Đất (1)
				</span>
				<span className="flex items-center gap-1.5">
					<span className="inline-block size-3 rounded-sm bg-emerald-500" />
					Đảo đã đếm
				</span>
			</div>
		</section>
	);
};

export default IslandGrid;
