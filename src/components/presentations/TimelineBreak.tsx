import type { TypeBreakFields } from "@/@types/generated";

type TimelineBreakProps = {
	breakItem: TypeBreakFields;
	startHour: number;
	tenMinSize: number;
	gapSize: number;
};

export function TimelineBreak({
	breakItem,
	startHour,
	tenMinSize,
	gapSize,
}: TimelineBreakProps) {
	const startDate = new Date(breakItem.startDate);
	const endDate = new Date(breakItem.endDate);
	const diff = startDate.getHours() - startHour;
	const hourHeight = diff * tenMinSize * 6;
	const minHeight = (startDate.getMinutes() * tenMinSize) / 10;
	const startHeight =
		hourHeight +
		minHeight +
		diff * 2 * gapSize +
		(startDate.getMinutes() === 0 ? 0 : gapSize);
	const length = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
	const height = (length * tenMinSize) / 10 + (length >= 60 ? gapSize : 0);

	const width = breakItem.isDouble ? `calc( 200% + ${gapSize}px )` : "100%";

	return (
		<div
			className="absolute"
			style={{
				top: startHeight,
				width,
				height,
			}}
		>
			<div className="hyphens backdrop-blur-safari relative flex h-full w-full flex-col justify-center rounded-lg bg-white/5 p-4 text-center backdrop-blur">
				{breakItem.content}
				<div className="absolute top-2 left-2 text-xs text-gray-300">
					{startDate.toLocaleTimeString("hu-HU", {
						hour: "2-digit",
						minute: "2-digit",
					})}{" "}
					-{" "}
					{endDate.toLocaleTimeString("hu-HU", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</div>
			</div>
		</div>
	);
}
