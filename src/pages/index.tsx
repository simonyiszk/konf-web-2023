import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import type { TypePresentationFields } from "@/@types/generated";
import { GallerySection } from "@/components/gallery/GallerySection";
import { GiveawaySection } from "@/components/giveaway/GiveawaySection";
import { HeroV1 } from "@/components/hero/HeroV1";
import { BgDecoration } from "@/components/layout/decorations/BgDecoration";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/layout/Seo";
import { PresentationSection } from "@/components/presentations/PresentationSection";
import { CharlesSection } from "@/components/section/CharlesSection";
import { SponsorSection } from "@/components/sponsors/SponsorSection";
import { VideoSection } from "@/components/video/VideoSection";
import {
	getGalleryImages,
	getPresentation,
	getPresentations,
	getSponsors,
	ReturnTypePresentations,
} from "@/utils/contentful";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const sponsors = await getSponsors();
	const videoId = process.env.YOUTUBE_VIDEO_ID ?? "MD8VGKLklVQ";
	const galleryAlbums = await getGalleryImages();
	const presentations = (await getPresentations()) as ReturnTypePresentations;

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

	return {
		props: {
			...i18n,
			sponsors,
			videoId,
			galleryAlbums,
			buildDate: Date.now(),
			presentations: strippedPresentations,
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
	const { i18n } = useTranslation("common");

	const [displayedPresentations, setDisplayedPresentations] = useState<
		{
			title: string;
			href: string;
		}[]
	>([]);

	// Needs to be client side because of the randomization
	// eslint-disable-next-line react-etc/prefer-usememo
	useEffect(() => {
		const start = Math.floor(Math.random() * (presentations.length - 4));
		const selected = presentations.slice(start, start + 4).map((p) => ({
			title: p.title,
			href: `/eloadasok/${p.slug}`,
		}));

		setDisplayedPresentations(selected);
	}, [i18n.language, presentations]);

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

			<PresentationSection presentations={displayedPresentations} />
			<CharlesSection {...charlesSimonyiPresentation} />
			<VideoSection videoId={videoId} />
			<GiveawaySection />

			<GallerySection albums={galleryAlbums} />
			<SponsorSection {...sponsors} />
		</Layout>
	);
}
