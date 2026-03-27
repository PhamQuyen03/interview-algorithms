import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	images: {
		localPatterns: [
			{
				pathname: "/images/**",
			},
		],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "phamquyen03.github.io",
			},
		],
	},
};

export default nextConfig;
