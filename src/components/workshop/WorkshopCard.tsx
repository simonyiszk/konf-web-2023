import clsx from "clsx";
import type { Asset } from "contentful";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { FiExternalLink } from "react-icons/fi";

import type {
	LocalizedEntry,
	LocalizedTypeWorkshopFields,
	LocalizedTypeWorkshopPersonFields,
	TypeWorkshopFields,
	TypeWorkshopPersonFields,
} from "@/@types/generated";

import { Highlighted } from "../highlight/Highlighted";
import { components } from "../mdx/MDXComponents";

type WorkshopCardProps = {
	workshop: LocalizedTypeWorkshopFields<"en" | "hu">;
	mdxSource: {
		en: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
		hu: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
	};
};

type TransformedLocalizedPresenterType = Omit<
	TypeWorkshopPersonFields,
	"image"
> & {
	image: LocalizedEntry<Asset, "en" | "hu">;
};

function LinkWrapper(
	props: DetailedHTMLProps<
		HTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>,
) {
	const { children } = props;
	return (
		<a
			href={
				process.env.VERCEL_ENV !== "production"
					? "https://schdesign.hu"
					: "https://schdesign.hu?utm_source=simonyi_konferencia&utm_medium=konf&utm_campaign=konf2023&utm_content=workshop"
			}
			className={clsx(
				"bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text font-bold text-transparent",
				"group transition-all duration-200 hover:text-konf-accent-yellow",
			)}
			target="_blank"
			rel="noreferrer"
			{...props}
		>
			{children}
			<FiExternalLink className="ml-1 inline-block pb-1 text-white transition-all group-hover:text-konf-accent-yellow" />
		</a>
	);
}

const schdesignVariant = ({
	presenters,
}: {
	presenters: TransformedLocalizedPresenterType[];
}) => (
	<div className="my-4">
		<span className="mb-3 block">
			<Highlighted
				highlight="schdesign"
				text="a workshopot az schdesign következő tagjai tartják:"
				wrapper={LinkWrapper}
			/>
		</span>
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
			{presenters.map((p) => (
				<div key={p.name} className="">
					<div className="relative aspect-1">
						<Image
							src={
								p.image.fields.file?.hu
									? `https:${p.image.fields.file.hu.url}`
									: ""
							}
							fill
							draggable={false}
							alt={p.name}
							className="rounded-lg object-cover"
							sizes="(max-width: 768px) 50vw,
							(max-width: 1200px) 40vw,
							25vw"
						/>
					</div>
					<h3 className="mt-4 text-center">{p.name}</h3>
				</div>
			))}
		</div>
	</div>
);

export function WorkshopCard({ workshop, mdxSource }: WorkshopCardProps) {
	const { i18n } = useTranslation("common");

	const localized = Object.fromEntries(
		Object.entries(workshop).map(([key, value]) => [
			key,
			value[i18n.language as "en" | "hu"] ?? value.hu,
		]),
	) as unknown as Omit<TypeWorkshopFields, "image">;

	const localizedMdxSource = mdxSource[i18n.language as "en" | "hu"];

	const presenters =
		localized.presenter?.map((p) => {
			const fields = p.fields as LocalizedTypeWorkshopPersonFields<"hu" | "en">;
			return Object.fromEntries(
				Object.entries(fields).map(([key, value]) => [
					key,
					value[i18n.language as "en" | "hu"] ?? value.hu,
				]),
			) as unknown as Omit<TypeWorkshopPersonFields, "image"> & {
				image: LocalizedEntry<Asset, "en" | "hu">;
			};
		}) ?? [];

	return (
		<div className="rounded-lg bg-white/10 px-4 py-16 backdrop-blur md:px-12">
			<h2 className="mb-8 text-3xl font-bold sm:text-3xl lg:text-5xl">
				{localized.title}
			</h2>
			<MDXRemote {...localizedMdxSource} components={components} />
			{localized.variant === "schdesign" && schdesignVariant({ presenters })}
		</div>
	);
}
