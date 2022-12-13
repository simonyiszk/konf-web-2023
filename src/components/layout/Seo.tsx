import Head from "next/head";

export type SeoProps = {
	description?: string;
	title?: string;
};

export function Seo({ title, description }: SeoProps) {
	return (
		<Head>
			<title>{title ?? "XX. Simonyi Konferencia"}</title>
			<meta
				name="description"
				content={
					description ??
					"Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája."
				}
			/>

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
			<meta
				name="apple-mobile-web-app-title"
				content="XX. Simonyi Konferencia"
			/>
			<meta name="application-name" content="XX. Simonyi Konferencia" />
			<meta name="msapplication-TileColor" content="#000f1f" />
			<meta name="theme-color" content="#5cdeac" />

			{/*
			<meta
				name="image"
				content="https://konferencia.simonyi.bme.hu/preview.png"
			/>
			<meta property="og:url" content="https://konferencia.simonyi.bme.hu" />
			*/}
		</Head>
	);
}
