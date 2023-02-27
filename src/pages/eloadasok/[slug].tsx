import type * as Contentful from "contentful";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { FaArrowLeft } from "react-icons/fa";

import type {
	LocalizedEntry,
	LocalizedFields,
	LocalizedTypeSponsorLogo,
	LocalizedTypeSponsorLogoFields,
	TypePresentationFields,
	TypeSponsorLogoFields,
} from "@/@types/generated";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { components } from "@/components/mdx/MDXComponents";
import { getPresentation, getPresentations } from "@/utils/contentful";

type TextContentProps = {
	title: string;
	description: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
};

function TextContent({ title, description }: TextContentProps) {
	return (
		<div className="sm:col-span-2">
			<h1 className="mb-4 text-3xl font-semibold lg:text-5xl">{title}</h1>
			{/* <p className="my-1 text-lg tracking-wider ">IB026 | 16:00 - 17:00</p> */}
			<MDXRemote {...description} components={components} />
		</div>
	);
}

type SpeakerProps = {
	name: string;
	image: string;
	sponsor?: LocalizedFields<TypeSponsorLogoFields, "hu">;
};

function Speaker({ image, name, sponsor }: SpeakerProps) {
	return (
		<div>
			<div className="relative aspect-1 h-auto w-full rounded bg-gradient-to-b from-konf-primary-green to-transparent">
				<Image
					className="rounded-lg object-cover object-top"
					src={image}
					fill
					alt={name}
					sizes="(max-width: 640px) 100vw, 640px"
				/>
			</div>
			<div className="relative flex flex-row justify-center">
				<p className="absolute mx-auto -mt-4 bg-konf-accent-yellow px-2 text-center text-2xl font-bold text-konf-background-blue">
					{name}
				</p>
			</div>
			{sponsor?.image?.hu && (
				<a href={sponsor.link?.hu ?? "#"} target="_blank" rel="noreferrer">
					<div className="relative mt-8 h-12 w-full rounded bg-white sm:mt-16 md:mt-8">
						<Image
							src={
								sponsor.image.hu.fields.file
									? `https:${
											// @ts-expect-error too lazy to remap types recursively
											(sponsor.image.hu.fields.file as unknown).hu.url as string
									  }`
									: "http://placekitten.com/200/300"
							}
							alt={sponsor.name?.hu ?? ""}
							fill
							className="object-contain p-2"
							unoptimized
							draggable={false}
						/>
					</div>
				</a>
			)}
		</div>
	);
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Presentation({ buildDate, presentation }: PageProps) {
	const { t, i18n } = useTranslation("common");

	const href = i18n.language === "hu" ? "/eloadasok" : "/en/presentations";

	const localized = Object.fromEntries(
		Object.entries(presentation.fields).map(([key, value]) => [
			key,
			value[i18n.language as "en" | "hu"] ?? value.hu,
		]),
	) as unknown as TypePresentationFields;

	const localizedMdx =
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		presentation.mdxSource[i18n.language as "en" | "hu"] ??
		presentation.mdxSource.hu;

	const presenterImage = (
		localized.image as unknown as LocalizedEntry<Contentful.Asset, "hu">
	).fields.file?.hu?.url;

	const sponsor = localized.sponsorLogo?.fields as unknown as
		| LocalizedTypeSponsorLogoFields<"hu">
		| undefined;
	return (
		<Layout buildDate={buildDate}>
			<Seo title={localized.title} description={localized.description} />
			<LayoutContent maxWidth="max-w-6xl">
				<Link
					href={href}
					className="mb-8 text-lg opacity-70 transition duration-300 hover:opacity-100"
				>
					<FaArrowLeft className="inline" />{" "}
					{t("presentations.items.back").toLowerCase()}
				</Link>
				<div className="mt-8 rounded bg-konf-overlay-blue px-4">
					<section className="mx-auto grid max-w-5xl gap-8 py-16 sm:grid-cols-3">
						<Speaker
							name={localized.name}
							sponsor={sponsor}
							image={
								presenterImage
									? `https:${presenterImage}`
									: "http://placekitten.com/200/300"
							}
						/>
						<TextContent title={localized.title} description={localizedMdx} />
					</section>
				</div>
			</LayoutContent>
		</Layout>
	);
}

export async function getStaticProps({
	locale,
	params,
}: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const presentation = await getPresentation(params?.slug as string);

	return {
		props: {
			...i18n,
			presentation,
			buildDate: Date.now(),
		},
	};
}

export async function getStaticPaths() {
	const lang = ["/eloadasok/"];
	const presentationSlugs = (await getPresentations()).map(
		({ fields }) => fields.slug,
	) as { hu: string; en: string }[];

	const pathHu = presentationSlugs.map((slug) => `${lang[0]}${slug.hu}`);
	// const pathEn = presentationSlugs.map((slug) => `${lang[1]}${slug.hu}`);

	return {
		paths: [...pathHu],
		fallback: false,
	};
}
