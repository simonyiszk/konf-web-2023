import clsx from "clsx";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { FaArrowLeft } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import YouTube from "react-youtube";

import type { TypeSponsorLogoFields } from "@/@types/generated";
import { TextButton } from "@/components/button/TextButton";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { components } from "@/components/mdx/MDXComponents";
import {
	WorkshopPlace,
	WorkshopTimeRange,
} from "@/components/workshop/WorkshopElements";
import { videoLinks } from "@/utils/constants";
import { getPresentation, getPresentations } from "@/utils/contentful";
import { parseYoutubeIdFromLink } from "@/utils/convert";
import { useEffectOnce } from "@/utils/hooks";

type TextContentProps = {
	title: string;
	description: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
	startDate: Date;
	endDate: Date;
	place: string;
};

function TextContent({
	title,
	description,
	startDate,
	endDate,
	place,
}: TextContentProps) {
	return (
		<div className="sm:col-span-2">
			<h1 className="mb-4 text-3xl font-semibold lg:text-5xl">{title}</h1>
			<div className="mb-2 flex flex-row gap-2 text-2xl">
				<WorkshopPlace place={place} />
				<span className="select-none">|</span>
				<WorkshopTimeRange start={startDate} end={endDate} />
			</div>
			{/* <p className="my-1 text-lg tracking-wider ">IB026 | 16:00 - 17:00</p> */}
			<MDXRemote {...description} components={components} />
		</div>
	);
}

type SpeakerProps = {
	name: string;
	image: string;
	sponsor?: TypeSponsorLogoFields;
	profession?: string;
};

function Speaker({ image, name, sponsor, profession }: SpeakerProps) {
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
			{profession && <div className="mt-6 text-center ">{profession}</div>}
			{sponsor?.image && (
				<a href={sponsor.link ?? "#"} target="_blank" rel="noreferrer">
					<div
						className={clsx(
							!profession ? "mt-8 sm:mt-16 md:mt-8" : "mt-2",
							"relative h-12 w-full rounded bg-white ",
						)}
					>
						<Image
							src={
								sponsor.image.fields.file
									? `https:${sponsor.image.fields.file.url as string}`
									: "http://placekitten.com/200/300"
							}
							alt={sponsor.name}
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

	const {
		name,
		image,
		description,
		title,
		sponsorLogo,
		startDate,
		endDate,
		room,
		profession,
		videoLink,
	} = presentation.fields;

	useEffectOnce(() => {
		document.documentElement.style.setProperty(
			"--randomHeight",
			`${Math.floor(Math.random() * 300)}vh`,
		);
	});

	const href = i18n.language === "hu" ? "/eloadasok" : "/en/presentations";

	const presenterImage = image ? image.fields.file?.url : undefined;

	const sponsor = sponsorLogo?.fields;

	const ytId = parseYoutubeIdFromLink(videoLink);

	return (
		<Layout buildDate={buildDate} className="pt-4">
			<Seo title={title} description={description} />
			<LayoutContent maxWidth="max-w-6xl">
				<Link
					href={href}
					className="mb-8 text-lg opacity-70 transition duration-300 hover:opacity-100"
				>
					<FaArrowLeft className="inline" />{" "}
					{t("presentations.items.back").toLowerCase()}
				</Link>
				<div className="mt-8 rounded bg-white/10 p-4 backdrop-blur">
					<section className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3 lg:py-12">
						<Speaker
							name={name}
							sponsor={sponsor}
							image={
								presenterImage
									? `https:${presenterImage}`
									: "http://placekitten.com/200/300"
							}
							profession={profession}
						/>
						<TextContent
							title={title}
							description={presentation.mdxSource}
							startDate={new Date(startDate)}
							endDate={new Date(endDate)}
							place={room ?? ""}
						/>
						{ytId && ytId !== "" && (
							<YouTube
								videoId={ytId}
								className="aspect-w-16 aspect-h-9 col-span-1 col-start-1 row-start-2 rounded sm:col-span-3 sm:col-start-1 sm:row-start-2"
								iframeClassName="rounded"
							/>
						)}
					</section>
				</div>
				<div className="mx-auto my-8 max-w-lg">
					<TextButton
						fullWidth
						href={
							room === "IB028"
								? videoLinks.ib028.questions
								: videoLinks.ib025.questions
						}
						text={
							<span>
								Kérdezz az előadótól
								<span>
									<FiExternalLink className="inline pb-1 text-white group-hover:text-konf-accent-yellow" />
								</span>
							</span>
						}
					/>
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
	const presentation = await getPresentation({ slug: params?.slug as string });

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
	);

	const pathHu = presentationSlugs.map((slug) => `${lang[0]}${slug}`);

	return {
		paths: [...pathHu],
		fallback: false,
	};
}
