import clsx from "clsx";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { Timeline } from "@/components/presentations/Timeline";
import { getBreaks, getPresentations } from "@/utils/contentful";
import { useEffectOnce } from "@/utils/hooks";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const presentations = await getPresentations();

	presentations.sort((a, b) => {
		const dateDiff =
			new Date(a.fields.startDate.hu ?? "2023-03-21T08:00:00Z").getTime() -
			new Date(b.fields.startDate.hu ?? "2023-03-21T08:00:00Z").getTime();

		const sideDiff = a.fields.room?.hu?.localeCompare(b.fields.room?.hu ?? "");
		return dateDiff - (sideDiff ?? 0);
	});
	const left = presentations.filter((p) => p.fields.room?.hu === "IB028");
	const right = presentations.filter((p) => p.fields.room?.hu === "IB025");

	const breaks = await getBreaks();

	return {
		props: {
			...i18n,
			left,
			right,
			breaks,
			buildDate: Date.now(),
		},
	};
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Presentations({
	buildDate,
	left,
	right,
	breaks,
}: PageProps) {
	const { t } = useTranslation("common");

	useEffectOnce(() => {
		document.documentElement.style.setProperty(
			"--randomHeight",
			`${Math.floor(Math.random() * 300)}vh`,
		);
	});

	return (
		<Layout buildDate={buildDate} className="pt-8">
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
				<Timeline
					left={left}
					right={right}
					breaks={breaks}
					startTime={new Date(left[0].fields.startDate.hu ?? "")}
					endTime={new Date(left[left.length - 1].fields.endDate.hu ?? "")}
				/>
			</LayoutContent>
		</Layout>
	);
}
