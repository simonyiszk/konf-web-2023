import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HeroV1 } from "@/components/hero/HeroV1";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/layout/Seo";
import { SponsorSection } from "@/components/sponsors/SponsorSection";
import { VideoSection } from "@/components/video/VideoSection";
import { getSponsors } from "@/utils/contentful";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const sponsors = await getSponsors();
	const videoId = process.env.YOUTUBE_VIDEO_ID ?? "MD8VGKLklVQ";

	return {
		props: {
			...i18n,
			sponsors,
			videoId,
			buildDate: Date.now(),
		},
	};
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Index({
	buildDate,
	videoId,
	sponsors,
	...props
}: PageProps) {
	return (
		<Layout className="bg-hero-pattern" buildDate={buildDate}>
			<Seo />
			<HeroV1 />
			<VideoSection videoId={videoId} />
			<SponsorSection {...sponsors} />
		</Layout>
	);
}
