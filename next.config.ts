import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	basePath: "/interview-algorithms",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
