import clsx from "clsx";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote } from "next-mdx-remote";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { GiveawaySection } from "@/components/giveaway/GiveawaySection";
import { Layout } from "@/components/layout/Layout";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { Seo } from "@/components/layout/Seo";
import { getParagraphs } from "@/utils/contentful";
import { useEffectOnce } from "@/utils/hooks";

export const components = {
	p: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLParagraphElement>,
			HTMLParagraphElement
		>,
	) => <p className="my-2 text-base " {...props} />,
	code: (
		props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
	) => (
		<code
			className="rounded bg-slate-900 px-1 text-base text-gray-300"
			{...props}
		/>
	),
	h1: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLHeadingElement>,
			HTMLHeadingElement
		>,
	) => (
		<h1 className="mb-8  text-4xl font-bold" {...props}>
			{props.children}
		</h1>
	),
	h2: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLHeadingElement>,
			HTMLHeadingElement
		>,
	) => (
		<h2 className="my-4 text-2xl font-semibold" {...props}>
			{props.children}
		</h2>
	),
	h3: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLHeadingElement>,
			HTMLHeadingElement
		>,
	) => (
		<h3 className="mb-4 text-xl font-semibold" {...props}>
			{props.children}
		</h3>
	),
	a: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		>,
	) => (
		<a
			className="text-konf-accent-yellow underline"
			{...props}
			target="_blank"
			rel="noreferrer"
		>
			{props.children}
		</a>
	),
	ul: (
		props: DetailedHTMLProps<
			HTMLAttributes<HTMLUListElement>,
			HTMLUListElement
		>,
	) => <ul className="list-inside list-disc" {...props} />,
};

export default function GiveawayPage({
	buildDate,
	paragraph,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation("common");

	useEffectOnce(() => {
		document.documentElement.style.setProperty(
			"--randomHeight",
			`${Math.floor(Math.random() * 300)}vh`,
		);
	});

	return (
		<Layout buildDate={buildDate} className="pt-8">
			<Seo title={t("raffle.title")} />
			<LayoutContent>
				<h1
					className={clsx(
						"text-center text-4xl font-black sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
						"bg-gradient-to-r bg-clip-text text-transparent",
						"from-konf-primary-blue to-konf-primary-green",
						"animate-text pb-4",
					)}
				>
					{t("raffle.title")}
				</h1>
				<div className="my-12 sm:my-32">
					<GiveawaySection />
				</div>
				{paragraph?.mdxSource && (
					<section className="backdrop-blur-safari mx-auto w-full max-w-6xl rounded-2xl bg-white/10 px-8 py-10 text-white backdrop-blur">
						<MDXRemote {...paragraph.mdxSource} components={components} />
					</section>
				)}
			</LayoutContent>
		</Layout>
	);
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	const i18n = await serverSideTranslations(locale ?? "hu", ["common"]);
	const paragraph =
		(await getParagraphs())
			.filter((p) => p.fields.id === "nyeremenyjatek-szabalyzat")
			.at(0) ?? null;

	return {
		props: {
			...i18n,
			buildDate: Date.now(),
			paragraph,
		},
	};
}
