import Head from "next/head";
import Script from "next/script";
import { useTranslation } from "next-i18next";

import { generateStructuredData } from "@/utils/seo";

export type SeoProps = {
	description?: string;
	title?: string;
};

export function Seo({ title, description }: SeoProps) {
	const { t, i18n } = useTranslation("common");

	const defaultTitle = t("seo.title") || "XX. Simonyi Konferencia";
	const defaultDescription =
		t("seo.description") ||
		"Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája.";
	const v0Preview =
		i18n.language === "hu"
			? "https://konferencia.simonyi.bme.hu/preview.jpg"
			: "https://konferencia.simonyi.bme.hu/preview_eng.jpg";

	const structuredData = generateStructuredData({
		title: defaultTitle,
		description: defaultDescription,
		startDate: new Date("2023-03-21T12:00:00.000+01:00"),
		endDate: new Date("2023-03-21T20:00:00.000+01:00"),
		sponsors: [],
		speakers: [],
	});

	return (
		<>
			<Head>
				<title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
				<meta
					name="description"
					content={description ? description.slice(0, 150) : defaultDescription}
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
			<Script
				id="structured-data"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
		</>
	);
}
