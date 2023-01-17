import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HeroV0 } from "@/components/hero/HeroV0";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/layout/Seo";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Index(props: PageProps) {
	return (
		// eslint-disable-next-line react/destructuring-assignment
		<Layout className="" buildDate={props.buildDate}>
			<Seo
				title="XX. Simonyi Konferencia | 2023. 03. 21."
				description="Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája."
			/>
			<HeroV0 />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale ?? "hu", ["common"])),
		buildDate: Date.now(),
	},
});
