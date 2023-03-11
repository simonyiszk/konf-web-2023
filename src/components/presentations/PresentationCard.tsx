import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

import type { TypePresentationFields } from "@/@types/generated";

import { components } from "../mdx/MDXComponents";
import styles from "./PresentationCard.module.scss";

export type PresentationCardProps = {
	presentation: TypePresentationFields;
	mdxSource: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
};

export function PresentationCard({
	presentation,
	mdxSource,
}: PresentationCardProps) {
	const { t } = useTranslation("common");

	const { title, name, slug, image } = presentation;

	const href = `/eloadasok/${slug}`;

	return (
		<Link
			href={href}
			className="backdrop-blur-safari group relative block w-full overflow-hidden rounded bg-konf-overlay-blue backdrop-blur transition duration-200 ease-in-out hover:drop-shadow-[0_12px_12px_rgba(255,255,255,0.25)]"
		>
			<div className="relative mx-auto h-[300px] bg-gradient-to-b from-konf-primary-green to-transparent">
				<Image
					src={
						image.fields.file?.url
							? `https:${image.fields.file.url}`
							: "http://placekitten.com/350/200"
					}
					fill
					className="w-[280px] object-cover object-top"
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
			<div className="mt-8 mb-16 px-5">
				<h2
					className={clsx(
						"mb-5 text-xl font-bold text-white",
						"transition duration-300 ease-in-out group-hover:text-konf-accent-yellow",
					)}
				>
					{title}
				</h2>
				{/* <p className="text-base">{slicedDescription}</p> */}
				<div
					className={clsx(
						"mb-4 max-h-52 overflow-y-hidden text-justify line-clamp-6",
						styles.mdxContainer,
					)}
				>
					<MDXRemote {...mdxSource} components={components} />
				</div>
			</div>
			<div
				className={clsx(
					"absolute bottom-0 w-full",
					"bg-gradient-to-r from-konf-primary-green to-konf-primary-blue",
					"inline-block py-2 text-center text-xl font-bold text-konf-background-blue transition duration-300 ease-in-out group-hover:text-white",
				)}
			>
				{t("presentations.items.details")}
			</div>
		</Link>
	);
}
