import clsx from "clsx";
import type { Asset } from "contentful";
import { useTranslation } from "next-i18next";

import type {
	LocalizedEntry,
	LocalizedTypePresentationFields,
	TypePresentationFields,
} from "@/@types/generated";

type TimelineCardProps = {
	presentation: LocalizedTypePresentationFields<"en" | "hu">;
	startTime: number;
};

export function TimelineCard({ presentation, startTime }: TimelineCardProps) {
	const { t, i18n } = useTranslation("common");

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
	const startHeight =
		(startDate.getHours() - startTime) * 200 +
		(startDate.getMinutes() === 0 ? 0 : 100);

	return (
		<div className="absolute h-[100px] w-full" style={{ top: startHeight }}>
			<div className="w-full rounded-lg bg-konf-overlay-blue/25 p-4 backdrop-blur">
				<h3 className="text-center">{localized.title}</h3>
			</div>
		</div>
	);
}
