import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaArrowLeft } from "react-icons/fa";

import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { getPresentation, getPresentations } from "@/utils/contentful";

type TextContentProps = {
	title: string;
	description: string;
};

function TextContent({ title, description }: TextContentProps) {
	return (
		<div className="sm:col-span-2">
			<h1 className="text-3xl font-semibold lg:text-5xl">{title}</h1>
			{/* <p className="my-1 text-lg tracking-wider ">IB026 | 16:00 - 17:00</p> */}
			<p className="mt-4 text-lg">{description}</p>
		</div>
	);
}

type SpeakerProps = {
	name: string;
	image: string;
	sponsorImage?: string;
};

function Speaker({ image, name, sponsorImage }: SpeakerProps) {
	return (
		<div>
			<div className="relative aspect-1 h-auto w-full">
				<Image
					className="rounded-lg object-cover"
					src={image}
					fill
					alt="asd"
					unoptimized
				/>
			</div>
			<div className="relative flex flex-row justify-center">
				<p className="absolute mx-auto -mt-4 bg-konf-accent-yellow px-2 text-center text-2xl font-bold text-konf-background-blue">
					{name}
				</p>
			</div>
			{sponsorImage && (
				<div className="relative mt-8 h-12 w-full rounded bg-white sm:mt-16 md:mt-8">
					<Image
						src={sponsorImage}
						alt="asd"
						fill
						className="object-contain p-2"
						unoptimized
					/>
				</div>
			)}
		</div>
	);
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Presentation({ buildDate, presentation }: PageProps) {
	const { t, i18n } = useTranslation("common");

	const href = i18n.language === "hu" ? "/eloadasok" : "/en/presentations";

	const { title, name, image, description, sponsorLogo } = presentation.fields;

	return (
		<Layout buildDate={buildDate}>
			<Seo title={title} description={description} />
			<LayoutContent>
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
							sponsorImage={
								sponsorLogo?.fields.image.fields.file?.url ?? undefined
							}
							image={
								image?.fields.file
									? `https:${image.fields.file.url}`
									: "http://placekitten.com/200/300"
							}
						/>
						<TextContent title={title} description={description} />
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
	const lang = ["/eloadasok", "/en/eloadasok"];
	const presentationSlugs = (await getPresentations()).items.map(
		({ fields }) => fields.slug,
	);

	const paths = lang.flatMap((l) => {
		return presentationSlugs.map((presentation) => {
			return `${l}/${presentation}`;
		});
	});

	return {
		paths,
		fallback: false,
	};
}
