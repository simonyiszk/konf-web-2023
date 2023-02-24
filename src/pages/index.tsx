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
import type { PresentationPreviewType } from "@/components/presentations";
import { PresentationSection } from "@/components/presentations/PresentationSection";
import { SponsorSection } from "@/components/sponsors/SponsorSection";
import { VideoSection } from "@/components/video/VideoSection";
import {
	getGalleryImages,
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

	return {
		props: {
			...i18n,
			sponsors,
			videoId,
			galleryAlbums,
			buildDate: Date.now(),
			presentations,
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	...props
}: PageProps) {
	const { i18n } = useTranslation("common");

	const [localizedPresentations, setLocalizedPresentations] = useState<
		{
			title: string;
			href: string;
		}[]
	>([]);

	// Needs to be client side because of the randomization
	// eslint-disable-next-line react-etc/prefer-usememo
	useEffect(() => {
		const start = Math.floor(Math.random() * presentations.length - 3);
		const selected = presentations.slice(start, start + 3);
		const localized = selected
			.map((p) => {
				return Object.fromEntries(
					Object.entries(p.fields).map(([key, value]) => [
						key,
						value[i18n.language as "en" | "hu"] ?? value.hu,
					]),
				) as unknown as TypePresentationFields;
			})
			.map((p) => ({
				title: p.title,
				href:
					i18n.language === "hu"
						? `/eloadasok/${p.slug}`
						: `/en/presentations/${p.slug}`,
			}));
		setLocalizedPresentations(localized);
	}, [i18n.language, presentations]);

	return (
		<Layout className="" buildDate={buildDate}>
			<Seo />
			<BgDecoration />
			<HeroV1 />
			<PresentationSection presentations={localizedPresentations} />
			<VideoSection videoId={videoId} />
			<GiveawaySection />
			<GallerySection albums={galleryAlbums} />
			<SponsorSection {...sponsors} />
		</Layout>
	);
}
