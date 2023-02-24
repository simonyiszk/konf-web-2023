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

export default function Contact({
	organizers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation("common");
	return (
		<Layout>
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
				<section className="contentGridContainer">
					{organizers.map((o) => (
						<OrganizerCard organizer={o} />
					))}
				</section>
				<LocationCard />
			</LayoutContent>
		</Layout>
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const organizers = (await getOrganizers()).map((o) => o.fields);
	return {
		props: {
			...i18n,
			organizers,
			buildDate: Date.now(),
		},
	};
}
