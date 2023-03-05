import clsx from "clsx";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { WorkshopCard } from "@/components/workshop/WorkshopCard";
import { getWorkshops } from "@/utils/contentful";

export default function WorkshopPages({
	workshops,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation("common");

	return (
		<Layout>
			<Seo title={t("workshop.title")} />
			<LayoutContent maxWidth="max-w-6xl">
				<h1
					className={clsx(
						"text-center text-5xl font-black md:text-7xl lg:text-9xl",
						"bg-gradient-to-r bg-clip-text text-transparent",
						"from-konf-primary-blue to-konf-primary-green",
						"animate-text pb-4",
					)}
				>
					{t("workshop.title")}
				</h1>
				<section className="my-32 grid gap-16">
					{workshops.map((ws) => (
						<WorkshopCard
							key={ws.fields.title.hu}
							workshop={ws.fields}
							mdxSource={ws.mdxSource}
						/>
					))}
				</section>
			</LayoutContent>
		</Layout>
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const workshops = await getWorkshops();

	return {
		props: {
			...i18n,
			workshops,
			buildDate: Date.now(),
		},
	};
}
