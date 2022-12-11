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
			<meta
				name="image"
				content="https://konferencia.simonyi.bme.hu/preview.png"
			/>
			<meta property="og:url" content="https://konferencia.simonyi.bme.hu" />
		</Head>
	);
}
