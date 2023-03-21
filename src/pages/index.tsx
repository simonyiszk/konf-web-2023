import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import type { TypePresentationFields } from "@/@types/generated";
import { GallerySection } from "@/components/gallery/GallerySection";
import { GiveawaySection } from "@/components/giveaway/GiveawaySection";
import { HeroV1 } from "@/components/hero/HeroV1";
import { BgDecoration } from "@/components/layout/decorations/BgDecoration";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/layout/Seo";
import { Floorplan } from "@/components/map/Floorplan";
import { PresentationSection } from "@/components/presentations/PresentationSection";
import { CharlesSection } from "@/components/section/CharlesSection";
import { SponsorSection } from "@/components/sponsors/SponsorSection";
import { LiveStreamSection } from "@/components/video/LiveStreamSection";
import { VideoSection } from "@/components/video/VideoSection";
import { videoLinks } from "@/utils/constants";
import {
	getGalleryImages,
	getPresentation,
	getPresentations,
	getSponsors,
} from "@/utils/contentful";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const sponsors = await getSponsors();
	const videoId = process.env.YOUTUBE_VIDEO_ID
		? process.env.YOUTUBE_VIDEO_ID
		: "MD8VGKLklVQ";
	const galleryAlbums = await getGalleryImages();
	const presentations = await getPresentations();

	const charlesSimonyiPresentationFull = (
		await getPresentation({
			presenter: "Charles Simonyi",
		})
	).fields;

	const charlesSimonyiPresentation = {
		slug: charlesSimonyiPresentationFull.slug,
		image: charlesSimonyiPresentationFull.image,
	} as Pick<TypePresentationFields, "slug" | "image">;

	const strippedPresentations = presentations.map((presentation) => {
		const { slug, title } = presentation.fields;
		return { slug, title };
	});

	const mapped = strippedPresentations.map((p) => ({
		title: p.title,
		href: `/eloadasok/${p.slug}`,
	}));

	return {
		props: {
			...i18n,
			sponsors,
			videoId,
			galleryAlbums,
			buildDate: Date.now(),
			presentations: mapped,
			charlesSimonyiPresentation,
		},
	};
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Index({
	buildDate,
	videoId,
	galleryAlbums,
	sponsors,
	presentations,
	charlesSimonyiPresentation,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	...props
}: PageProps) {
	return (
		<Layout
			className=""
			buildDate={buildDate}
			hero={
				<>
					<BgDecoration />
					<HeroV1 />
				</>
			}
		>
			<Seo />

			<LiveStreamSection
				link1={videoLinks.ib028.video}
				link2={videoLinks.ib025.video}
				questions1={videoLinks.ib028.questions}
				questions2={videoLinks.ib025.questions}
			/>
			<PresentationSection presentations={presentations} />
			<CharlesSection {...charlesSimonyiPresentation} />

			<Floorplan />

			<VideoSection videoId={videoId} />
			<GiveawaySection showDetailsLink />

			<GallerySection albums={galleryAlbums} />
			<SponsorSection {...sponsors} />
		</Layout>
	);
}
