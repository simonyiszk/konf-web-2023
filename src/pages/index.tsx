import type { Asset } from "contentful";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import type {
	LocalizedEntry,
	LocalizedFields,
	TypePresentationFields,
} from "@/@types/generated";
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

	const charlesSimonyiPresentation = (
		await getPresentation({
			presenter: "Charles Simonyi",
		})
	).fields as unknown as LocalizedFields<TypePresentationFields, "hu">;

	const localizedCharlesSimonyiPresentation = Object.fromEntries(
		Object.entries(charlesSimonyiPresentation).map(([key, value]) => [
			key,
			value.hu,
		]),
	) as unknown as Omit<TypePresentationFields, "image"> & {
		image: LocalizedEntry<Asset, "en" | "hu">;
	};

	return {
		props: {
			...i18n,
			sponsors,
			videoId,
			galleryAlbums,
			buildDate: Date.now(),
			presentations,
			localizedCharlesSimonyiPresentation,
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
	localizedCharlesSimonyiPresentation,
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
		const start = Math.floor(Math.random() * (presentations.length - 4));
		const selected = presentations.slice(start, start + 4);
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

			<PresentationSection presentations={localizedPresentations} />
			<CharlesSection {...localizedCharlesSimonyiPresentation} />
			<VideoSection videoId={videoId} />
			<GiveawaySection />

			<GallerySection albums={galleryAlbums} />
			<SponsorSection {...sponsors} />
		</Layout>
	);
}
