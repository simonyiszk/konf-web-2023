import Head from "next/head";
import { useTranslation } from "react-i18next";

export type SeoProps = {
	description?: string;
	title?: string;
};

export function Seo({ title, description }: SeoProps) {
	const { t } = useTranslation("common");

	const defaultTitle = t("seo.title") || "XX. Simonyi Konferencia";
	const defaultDescription =
		t("seo.description") ||
		"Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája.";
	const v0Preview = "https://konferencia.simonyi.bme.hu/previewV0.png";

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
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#77B16A" />
			<meta name="apple-mobile-web-app-title" content={defaultTitle} />
			<meta name="application-name" content={defaultTitle} />
			<meta name="msapplication-TileColor" content="#001429" />
			<meta name="theme-color" content="#77B16A" />

			<meta name="image" content={v0Preview} />
			<meta property="og:image" content={v0Preview} />
			<meta property="twitter:image" content={v0Preview} />
			<meta property="thumbnail" content={v0Preview} />

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
