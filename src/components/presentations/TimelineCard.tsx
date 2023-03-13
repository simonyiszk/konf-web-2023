import clsx from "clsx";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

import type { ReturnTypePresentations } from "@/utils/contentful";
import { useFps } from "@/utils/hooks";

type SinglePresentation<T> = T extends unknown[] ? T[number] : never;

type TimelineCardProps = {
	presentation: SinglePresentation<ReturnTypePresentations>["fields"];
	startTime: number;
	tenMinSize: number;
	gapSize: number;
	isDouble?: boolean;
	isThrottled?: boolean;
	startMin: number;
};

export function TimelineCard({
	presentation,
	startTime,
	tenMinSize,
	gapSize,
	isDouble,
	isThrottled,
	startMin = 0,
}: TimelineCardProps) {
	const { i18n } = useTranslation("common");

	const startDate = new Date(presentation.startDate);
	const endDate = new Date(presentation.endDate);
	const diff = startDate.getHours() - startTime;
	const hourHeight = diff * tenMinSize * 6;
	const minHeight = (startDate.getMinutes() * tenMinSize) / 10;
	const startHeight =
		hourHeight +
		minHeight +
		diff * 2 * gapSize +
		(startDate.getMinutes() >= 20 ? gapSize : 0) -
		tenMinSize * startMin -
		(startMin >= 2 ? gapSize : 0);
	const length = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
	const height = (length * tenMinSize) / 10 + (length >= 60 ? gapSize : 0);

	const width = isDouble ? `calc( 200% + ${gapSize}px )` : "100%";

	const href =
		i18n.language === "hu"
			? `/eloadasok/${presentation.slug}`
			: `/en/presentations/${presentation.slug}`;

	return (
		<Link
			className="absolute w-full"
			style={{ top: startHeight, width, height }}
			href={href}
		>
			<div
				className={clsx(
					isThrottled
						? "bg-konf-overlay-blue"
						: "backdrop-blur-safari bg-white/10 backdrop-blur",
					"hyphens relative flex h-full w-full flex-col justify-center rounded-lg p-4 text-center lg:px-16 xl:px-32 2xl:px-48",
				)}
			>
				<h3 className="mb-2 mt-3 font-bold">{presentation.title}</h3>
				<h4
					className={clsx(
						presentation.room === "IB028"
							? "text-konf-primary-green"
							: "text-konf-primary-blue",
						"hyphens-none mb-1",
					)}
				>
					{presentation.name}
				</h4>
				<h5 className="text-xs text-gray-300">
					{[presentation.profession, presentation.sponsorLogo?.fields.name]
						.filter((e) => e !== undefined)
						.join(", ")}
				</h5>
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
