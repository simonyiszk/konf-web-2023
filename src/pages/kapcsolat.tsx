import clsx from "clsx";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { LocationCard } from "@/components/location/LocationCard";
import { OrganizerCard } from "@/components/organizer/OrganizerCard";
import { getOrganizers } from "@/utils/contentful";
import { useEffectOnce } from "@/utils/hooks";

export default function Contact({
	sortedOrganizers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation("common");

	useEffectOnce(() => {
		document.documentElement.style.setProperty(
			"--randomHeight",
			`${Math.floor(Math.random() * 300)}vh`,
		);
	});

	return (
		<Layout className="pt-8">
			<Seo title={t("contact.title")} />
			<LayoutContent>
				<h1
					className={clsx(
						"text-center text-5xl font-black md:text-7xl lg:text-9xl",
						"bg-gradient-to-r bg-clip-text text-transparent",
						"from-konf-primary-blue to-konf-primary-green",
						"animate-text pb-4",
					)}
				>
					{t("contact.title")}
				</h1>

				{sortedOrganizers.map((level) => (
					<section className="contentGridContainer" key={level[0].order}>
						{level.map((o) => (
							<OrganizerCard key={o.name} organizer={o} />
						))}
					</section>
				))}
			</LayoutContent>
			<LayoutContent>
				<LocationCard />
			</LayoutContent>
		</Layout>
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const organizers = (await getOrganizers()).map((o) => o.fields);

	const levels = (
		Array.from(new Set(organizers.map((o) => o.order))) as number[]
	).sort((a, b) => a - b);

	const sortedOrganizers = levels.map((level) => {
		return organizers
			.filter((o) => o.order === level)
			.sort((a, b) => a.name.localeCompare(b.name));
	});

	return {
		props: {
			...i18n,
			sortedOrganizers,
			buildDate: Date.now(),
		},
	};
}
