import clsx from "clsx";

import type { LocalizedTypePresentation } from "@/@types/generated";

import styles from "./Timeline.module.scss";
import { TimelineCard } from "./TimelineCard";

type TimelineProps = {
	left: LocalizedTypePresentation<"en" | "hu">[];
	right: LocalizedTypePresentation<"en" | "hu">[];
	startTime: Date;
	endTime: Date;
};

export function Timeline({ left, right, startTime, endTime }: TimelineProps) {
	const startHour = startTime.getHours();
	const endHour = endTime.getHours();

	const tenMinSize = 60;
	const gapSize = 16;

	return (
		<section className="container relative mx-auto w-full">
			<div className="absolute inset-y-0 left-0 z-10 h-full w-8 bg-gradient-to-r from-black/25 to-transparent" />
			<div className={clsx(styles.timeline)}>
				<div>
					{Array(endHour - startHour + 1)
						.fill(0)
						.map((_, i) => {
							return (
								<div
									key={`${i + startHour}:00`}
									className="relative"
									style={{ height: tenMinSize * 6 + gapSize * 2 }}
								>
									<p className="rounded-lg bg-white/10 p-1 backdrop-blur">
										{i + startHour}:00
									</p>
									<p
										className="absolute rounded-lg bg-white/10 p-1 backdrop-blur"
										style={{ top: tenMinSize * 3 + gapSize }}
									>
										{i + startHour}:30
									</p>
								</div>
							);
						})}
				</div>
				<div className="relative min-w-[256px]">
					{left.map((presentation) => {
						return (
							<TimelineCard
								key={presentation.fields.title?.hu}
								presentation={presentation.fields}
								startTime={startTime.getHours()}
								tenMinSize={tenMinSize}
								gapSize={gapSize}
							/>
						);
					})}
				</div>
				<div className="relative min-w-[256px]">
					{right.map((presentation) => {
						return (
							<TimelineCard
								key={presentation.fields.title?.hu}
								presentation={presentation.fields}
								startTime={startTime.getHours()}
								tenMinSize={tenMinSize}
								gapSize={gapSize}
							/>
						);
					})}
				</div>
			</div>
			<div className="absolute inset-y-0 right-0 z-10 h-full w-8 bg-gradient-to-l from-black/25 to-transparent" />
		</section>
	);
}
