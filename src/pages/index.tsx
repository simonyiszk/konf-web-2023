import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HeroV0 } from "@/components/hero/HeroV0";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/layout/Seo";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Index({ buildDate, ...props }: PageProps) {
	return (
		<Layout className="" buildDate={props.buildDate}>
			<Seo />
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
