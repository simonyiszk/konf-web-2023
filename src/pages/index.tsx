import type { InferGetStaticPropsType } from "next";

import { HeroV0 } from "@/components/hero/HeroV0";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/layout/Seo";

export const getStaticProps = async () => {
	return {
		props: {
			buildDate: Date.now(),
		},
	};
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Index({ buildDate }: PageProps) {
	return (
		<Layout className="" buildDate={buildDate}>
			<Seo
				title="XX. Simonyi Konferencia | 2023. 03. 21."
				description="Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája."
			/>

			<HeroV0 />
		</Layout>
	);
}
