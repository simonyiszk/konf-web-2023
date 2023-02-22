import clsx from "clsx";
import type { Asset } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

import type {
	LocalizedEntry,
	LocalizedTypePresentationFields,
	TypePresentationFields,
} from "@/@types/generated";

import { components } from "../mdx/MDXComponents";

/* 
function sliceString(str: string, length: number) {
	if (str.length > length) {
		const slicedString = str.slice(0, 200);
		const nearestWhiteSpace = slicedString.lastIndexOf(" ");
		return `${slicedString.slice(0, nearestWhiteSpace)}...`;
	}
	return str.slice(0, length);
} 
*/

export type PresentationCardProps = {
	presentation: LocalizedTypePresentationFields<"en" | "hu">;
	mdxSource: {
		en: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
		hu: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
	};
};

export function PresentationCard({
	presentation,
	mdxSource,
}: PresentationCardProps) {
	const { t, i18n } = useTranslation("common");

	const localized = Object.fromEntries(
		Object.entries(presentation).map(([key, value]) => [
			key,
			value[i18n.language as "en" | "hu"] ?? value.hu,
		]),
	) as unknown as Omit<TypePresentationFields, "image"> & {
		image: LocalizedEntry<Asset, "en" | "hu">;
	};

	const { title, name, slug, image } = localized;
	const localizedMdxSource = mdxSource[i18n.language as "en" | "hu"];

	// const slicedDescription = sliceString(description, 200);
	const href =
		i18n.language === "hu" ? `/eloadasok/${slug}` : `/en/presentations/${slug}`;

	return (
		<Link
			href={href}
			className="relative w-full max-w-[360px] overflow-hidden rounded bg-konf-overlay-blue transition duration-200 ease-in-out hover:drop-shadow-[0_12px_12px_rgba(255,255,255,0.25)]"
		>
			<div className="relative mx-auto h-[300px] w-[350px] bg-gradient-to-b from-konf-primary-green to-transparent">
				<Image
					src={
						image.fields.file?.hu?.url
							? `https:${image.fields.file.hu.url}`
							: "http://placekitten.com/350/200"
					}
					fill
					className="object-cover object-top"
					alt={name}
					draggable={false}
					sizes="(max-width: 640px) 100vw, 640px"
				/>
			</div>
			<div className="absolute mx-auto -mt-3 flex w-full flex-row justify-center">
				<span className="inline-block w-2/3 bg-konf-accent-yellow text-center text-xl font-bold text-konf-background-blue">
					{name}
				</span>
			</div>
			<div className="mt-8 mb-4 px-5">
				<h2
					className={clsx(
						"mb-5 text-xl font-bold text-white",
						"transition duration-300 ease-in-out hover:text-konf-accent-yellow",
					)}
				>
					{title}
				</h2>
				{/* <p className="text-base">{slicedDescription}</p> */}
				<MDXRemote {...localizedMdxSource} components={components} />
			</div>
			<div
				className={clsx(
					"bg-gradient-to-r from-konf-primary-green to-konf-primary-blue",
					"inline-block w-full  py-2 text-center text-xl font-bold text-konf-background-blue",
				)}
			>
				{t("presentations.items.details")}
			</div>
		</Link>
	);
}
