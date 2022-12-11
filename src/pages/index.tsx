import type { InferGetStaticPropsType } from "next";

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
		<Layout
			className="safe-area-x relative mx-auto mb-8 flex flex-col sm:px-4 md:px-8 lg:px-12 xl:px-16"
			buildDate={buildDate}
		>
			<Seo
				title="XX. Simonyi Konferencia | 2023"
				description="Magyarország legnagyobb egyetemi hallgatók által szervezett éves technológiai konferenciája."
			/>

			<h1 className="mt-4 text-center text-7xl">
				pog
				<br />
				éáőúűöóüíÍÉÁŐÚŰÓÜÖ
			</h1>
		</Layout>
	);
}
