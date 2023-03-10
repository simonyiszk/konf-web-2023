import clsx from "clsx";
import type { Asset } from "contentful";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FiExternalLink } from "react-icons/fi";

import type {
	LocalizedEntry,
	LocalizedTypePresentationFields,
	TypePresentationFields,
} from "@/@types/generated";

type TimelineCardProps = {
	presentation: LocalizedTypePresentationFields<"en" | "hu">;
	startTime: number;
	tenMinSize: number;
	gapSize: number;
};

export function TimelineCard({
	presentation,
	startTime,
	tenMinSize,
	gapSize,
}: TimelineCardProps) {
	const { i18n } = useTranslation("common");

	const localized = Object.fromEntries(
		Object.entries(presentation).map(([key, value]) => [
			key,
			value[i18n.language as "en" | "hu"] ?? value.hu,
		]),
	) as unknown as Omit<TypePresentationFields, "image"> & {
		image: LocalizedEntry<Asset, "en" | "hu">;
	};

	const startDate = new Date(localized.startDate);
	const endDate = new Date(localized.endDate);
	const diff = startDate.getHours() - startTime;
	const hourHeight = diff * tenMinSize * 6;
	const minHeight = (startDate.getMinutes() * tenMinSize) / 10;
	const startHeight =
		hourHeight +
		minHeight +
		diff * 2 * gapSize +
		(startDate.getMinutes() === 0 ? 0 : gapSize);
	const length = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
	const height = (length * tenMinSize) / 10 + (length >= 60 ? gapSize : 0);

	const href =
		i18n.language === "hu"
			? `/eloadasok/${localized.slug}`
			: `/en/presentations/${localized.slug}`;

	return (
		<Link
			className="absolute w-full"
			style={{ top: startHeight, height }}
			href={href}
		>
			<div className="hyphens relative flex h-full w-full flex-col justify-center rounded-lg bg-white/10 p-4 text-center backdrop-blur lg:px-16 xl:px-32 2xl:px-48">
				<h3 className="mb-2 mt-3 font-bold">{localized.title}</h3>
				<h4
					className={clsx(
						localized.room === "IB028"
							? "text-konf-primary-green"
							: "text-konf-primary-blue",
						"hyphens-none mb-1",
					)}
				>
					{localized.name}
				</h4>
				<h5 className="text-xs text-gray-300">{localized.profession}</h5>
				<div className="absolute top-2 left-2 text-xs text-gray-300">
					{startDate.toLocaleTimeString(i18n.language, {
						hour: "2-digit",
						minute: "2-digit",
					})}{" "}
					-{" "}
					{endDate.toLocaleTimeString(i18n.language, {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</div>
				<div className="absolute top-2 right-2 text-base text-gray-300">
					<FiExternalLink />
				</div>
			</div>
		</Link>
	);
}
