import Head from "next/head";

export type SeoProps = {
	description?: string;
	title?: string;
};

export function Seo({ title, description }: SeoProps) {
	const defaultTitle = "XX. Simonyi Konferencia";
	const defaultDescription =
		"Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája.";
	const defaultPreview = "https://konferencia.simonyi.bme.hu/preview.png";

	return (
		<Head>
			<title>{title ?? defaultTitle}</title>
			<meta name="description" content={description ?? defaultDescription} />

			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16px.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32px.png"
			/>
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5cdeac" />
			<meta name="apple-mobile-web-app-title" content={defaultTitle} />
			<meta name="application-name" content={defaultTitle} />
			<meta name="msapplication-TileColor" content="#000f1f" />
			<meta name="theme-color" content="#5cdeac" />

			<meta name="image" content={defaultPreview} />
			<meta property="og:image" content={defaultPreview} />
			<meta property="twitter:image" content={defaultPreview} />
			<meta property="thumbnail" content={defaultPreview} />

			<meta property="og:url" content="https://konferencia.simonyi.bme.hu" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={defaultTitle} />
			<meta property="og:description" content={defaultDescription} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:title" content={defaultTitle} />
			<meta property="twitter:description" content={defaultDescription} />

			<meta name="color-scheme" content="dark light" />
		</Head>
	);
}
