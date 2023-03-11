import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { FaArrowLeft } from "react-icons/fa";

import type { TypeSponsorLogoFields } from "@/@types/generated";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { components } from "@/components/mdx/MDXComponents";
import { getPresentation, getPresentations } from "@/utils/contentful";
import { useEffectOnce } from "@/utils/hooks";

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
	sponsor?: TypeSponsorLogoFields;
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
			{sponsor?.image && (
				<a href={sponsor.link ?? "#"} target="_blank" rel="noreferrer">
					<div className="relative mt-8 h-12 w-full rounded bg-white sm:mt-16 md:mt-8">
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

	const { name, image, description, title, sponsorLogo } = presentation.fields;

	useEffectOnce(() => {
		document.documentElement.style.setProperty(
			"--randomHeight",
			`${Math.floor(Math.random() * 300)}vh`,
		);
	});

	const href = i18n.language === "hu" ? "/eloadasok" : "/en/presentations";

	const presenterImage = image?.fields.file?.url;

	const sponsor = sponsorLogo?.fields;

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
				<div className="mt-8 rounded bg-konf-overlay-blue px-4">
					<section className="mx-auto grid max-w-5xl gap-8 py-16 sm:grid-cols-3">
						<Speaker
							name={name}
							sponsor={sponsor}
							image={
								presenterImage
									? `https:${presenterImage}`
									: "http://placekitten.com/200/300"
							}
						/>
						<TextContent title={title} description={presentation.mdxSource} />
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
