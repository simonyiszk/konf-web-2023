import clsx from "clsx";
import type { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BgElement } from "@/components/layout/decorations/BgDecoration";
import { Seo } from "@/components/layout/Seo";
import { PresentationCard } from "@/components/presentations/PresentationCard";

export default function Presentations() {
	const { t } = useTranslation("common");
	return (
		<>
			<Seo title={t("presentations.title")} />

			<div>
				<main className="mx-auto my-16 max-w-6xl px-4">
					<h1
						className={clsx(
							"text-center text-4xl font-black sm:text-5xl md:text-7xl lg:text-9xl",
							"gradient-on-text blue-green-gradient",
						)}
					>
						{t("presentations.title")}
					</h1>
					<section
						style={{
							gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))",
						}}
						className="my-32 mx-auto grid place-items-center gap-x-4 gap-y-8"
					>
						<PresentationCard />
						<PresentationCard />
						<PresentationCard />
						<PresentationCard />
						<PresentationCard />
						<PresentationCard />
					</section>
				</main>
			</div>
		</>
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);

	return {
		props: {
			...i18n,
			buildDate: Date.now(),
		},
	};
}
