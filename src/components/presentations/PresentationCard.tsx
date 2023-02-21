import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import type {
	LocalizedTypePresentationFields,
	TypePresentationFields,
} from "@/@types/generated";

function sliceString(str: string, length: number) {
	if (str.length > length) {
		const slicedString = str.slice(0, 200);
		const nearestWhiteSpace = slicedString.lastIndexOf(" ");
		return `${slicedString.slice(0, nearestWhiteSpace)}...`;
	}
	return str.slice(0, length);
}

export function PresentationCard(
	props: LocalizedTypePresentationFields<"en" | "hu">,
) {
	const { t, i18n } = useTranslation("common");

	const localized = Object.fromEntries(
		Object.entries(props).map(([key, value]) => [
			key,
			value[i18n.language as "en" | "hu"] ?? value.hu,
		]),
	) as unknown as TypePresentationFields;

	const { description, title, name, slug, image } = localized;

	const slicedDescription = sliceString(description, 200);
	const href =
		i18n.language === "hu" ? `/eloadasok/${slug}` : `/en/presentations/${slug}`;

	return (
		<Link
			href={href}
			className="relative w-full max-w-[360px] overflow-hidden rounded bg-konf-overlay-blue transition duration-200 ease-in-out hover:drop-shadow-[0_12px_12px_rgba(255,255,255,0.25)]"
		>
			<div className="relative h-[300px] w-full bg-gradient-to-b from-konf-primary-green to-transparent">
				<Image
					src={
						image.fields.file?.url
							? `https:${image.fields.file.url}`
							: "http://placekitten.com/350/200"
					}
					fill
					className="object-cover object-bottom"
					alt="asd"
					draggable={false}
					unoptimized
				/>
			</div>
			<div className="absolute mx-auto -mt-3 flex w-full flex-row justify-center">
				<span className="inline-block w-2/3 bg-konf-accent-yellow text-center text-xl font-bold text-konf-background-blue">
					{name}
				</span>
			</div>
			<div className="my-10 px-5">
				<h2
					className={clsx(
						"mb-5 text-xl font-bold text-white",
						"transition duration-300 ease-in-out hover:text-konf-accent-yellow",
					)}
				>
					{title}
				</h2>
				<p className="text-base">{slicedDescription}</p>
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
