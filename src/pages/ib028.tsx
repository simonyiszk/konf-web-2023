import clsx from "clsx";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FiExternalLink } from "react-icons/fi";
import type { YouTubeProps } from "react-youtube";
import Youtube from "react-youtube";

import { TextButton } from "@/components/button/TextButton";
import { Layout } from "@/components/layout/Layout";
import { videoLinks } from "@/utils/constants";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	return {
		props: {
			...i18n,
			buildDate: Date.now(),
		},
	};
}

export default function IB028({
	buildDate,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { i18n } = useTranslation("common");

	const opts: YouTubeProps["opts"] = {
		rel: 0,
		hl: i18n.language,
		disablekb: 1,
	};
	return (
		<Layout buildDate={buildDate}>
			<section className="container mx-auto mt-16 w-full py-6 px-4 text-center md:py-16 ">
				<h3
					className={clsx(
						"mb-4 pt-6 text-center text-4xl font-black md:text-6xl lg:col-span-2 lg:text-8xl",
						"bg-gradient-to-r bg-clip-text text-transparent",
						"from-konf-primary-blue to-konf-primary-green",
						"animate-text",
					)}
				>
					IB028
				</h3>
				<div className="aspect-w-16 aspect-h-9 rounded-2xl">
					<Youtube
						videoId={videoLinks.ib028.video}
						loading="eager"
						opts={opts}
						iframeClassName="w-full h-full rounded-lg md:rounded-xl"
					/>
				</div>
				<div className="mx-auto my-8 max-w-lg">
					<TextButton
						fullWidth
						href={videoLinks.ib028.questions}
						text={
							<span>
								IB028 kérdések
								<span>
									<FiExternalLink className="inline pb-1 text-white group-hover:text-konf-accent-yellow" />
								</span>
							</span>
						}
					/>
				</div>
			</section>
		</Layout>
	);
}
