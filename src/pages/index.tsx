import type { InferGetStaticPropsType } from "next";

import { HeroV1 } from "@/components/hero/HeroV1";
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
				title="XX. Simonyi Konferencia | 2023"
				description="Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája."
			/>

			<HeroV1 />
		</Layout>
	);
}
