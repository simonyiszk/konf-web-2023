const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		providerImportSource: "@mdx-js/react",
	},
});
const withPWA = require("next-pwa");

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async headers() {
		const headers = [
			{
				source: "/assets/:path*",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex",
					},
				],
			},
		];
		if (process.env.VERCEL_ENV !== "production") {
			headers.push({
				source: "/:path*",
				headers: [
					{
						key: "X-Robots-Tag",
						value: "noindex",
					},
				],
			});
		}
		return headers;
	},
};

module.exports = withPlugins(
	[
		[withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })],
		[
			withMDX,
			{
				pageExtensions: ["tsx", "mdx", "ts"],
			},
		],
		[
			withPWA,
			{
				pwa: {
					dest: "public",
					disable: process.env.NODE_ENV !== "production",
				},
			},
		],
	],
	nextConfig,
);
