import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HeroV0 } from "@/components/hero/HeroV0";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/layout/Seo";
import { SponsorSection } from "@/components/sponsors/SponsorSection";
import { VideoSection } from "@/components/video/VideoSection";


type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Index({ buildDate, videoId, ...props }: PageProps) {
	console.log(videoId);
	return (
		<Layout className="" buildDate={props.buildDate}>
			<Seo />
			<HeroV0 />
      <VideoSection videoId={videoId} />
			<SponsorSection />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale ?? "hu", ["common"])),
		buildDate: Date.now(),
		videoId: process.env.YOUTUBE_VIDEO_ID
			? process.env.YOUTUBE_VIDEO_ID
			: "MD8VGKLklVQ",
	},
});
