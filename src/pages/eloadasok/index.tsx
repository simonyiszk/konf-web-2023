import clsx from "clsx";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { PresentationCard } from "@/components/presentations/PresentationCard";
import { getPresentations, ReturnTypePresentations } from "@/utils/contentful";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Presentations({ buildDate, presentations }: PageProps) {
	const { t } = useTranslation("common");
	return (
		<Layout buildDate={buildDate}>
			<Seo title={t("presentations.title")} />

			<LayoutContent maxWidth="max-w-8xl">
				<h1
					className={clsx(
						"text-center text-5xl font-black md:text-7xl lg:text-9xl",
						"bg-gradient-to-r bg-clip-text text-transparent",
						"from-konf-primary-blue to-konf-primary-green",
						"animate-text",
					)}
				>
					{t("presentations.title")}
				</h1>
				<section
					style={{
						gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
					}}
					className="my-32 mx-auto grid place-items-center gap-x-4 gap-y-8"
				>
					{presentations.map((presentation) => (
						<PresentationCard
							key={presentation.fields.title.hu ?? ""}
							presentation={presentation.fields}
							mdxSource={presentation.mdxSource}
						/>
					))}
				</section>
			</LayoutContent>
		</Layout>
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const presentations = (await getPresentations()) as ReturnTypePresentations;
	return {
		props: {
			...i18n,
			presentations,
			buildDate: Date.now(),
		},
	};
}