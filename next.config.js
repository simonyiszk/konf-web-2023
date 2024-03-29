const { i18n } = require("./next-i18next.config");
const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		providerImportSource: "@mdx-js/react",
	},
});

/** @type {import("next").NextConfig} */
const nextConfig = {
	i18n,
	reactStrictMode: true,
	swcMinify: true,
	eslint: { ignoreDuringBuilds: process.env.VERCEL_ENV !== "production" },
	typescript: { ignoreBuildErrors: process.env.VERCEL_ENV !== "production" },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.ctfassets.net",
			},
		],
		domains: ["placekitten.com"],
	},
	experimental: {
		scrollRestoration: true,
	},

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

	async redirects() {
		return [
			{
				source: "/2022",
				destination: "https://2022.konferencia.simonyi.bme.hu",
				permanent: true,
			},
			{
				source: "/2021",
				destination: "https://2021.konferencia.simonyi.bme.hu",
				permanent: true,
			},
			{
				source: "/2019",
				destination: "https://regi.konferencia.simonyi.bme.hu",
				permanent: true,
			},
			{
				source: "/2018",
				destination: "https://regi.konferencia.simonyi.bme.hu/2018",
				permanent: true,
			},
			{
				source: "/2017",
				destination: "https://regi.konferencia.simonyi.bme.hu/2017",
				permanent: true,
			},
			{
				source: "/golya",
				destination: "https://golyakonf.sch.bme.hu",
				permanent: true,
			},
		];
	},

	async rewrites() {
		return [
			{
				source: "/en/presentations",
				destination: "/en/eloadasok",
				locale: false,
			},
			{
				source: "/en/presentations/:slug*",
				destination: "/en/eloadasok/:slug*",
				locale: false,
			},
			{
				source: "/en/contact",
				destination: "/en/kapcsolat",
				locale: false,
			},
		];
	},
};

module.exports = withMDX({
	pageExtensions: ["tsx", "mdx", "ts"],
	...nextConfig,
});
