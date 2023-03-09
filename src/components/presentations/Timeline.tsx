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

	return (
		<section className="container relative mx-auto w-full">
			<div className={clsx(styles.timeline)}>
				<div>
					{Array(endHour - startHour + 1)
						.fill(0)
						.map((_, i) => {
							return (
								<div className="relative h-[200px]">
									<p className="rounded-lg bg-konf-overlay-blue/25 p-1 backdrop-blur">
										{i + startHour}:00
									</p>
									<p className="absolute top-[100px] rounded-lg bg-konf-overlay-blue/25 p-1 backdrop-blur">
										{i + startHour}:30
									</p>
								</div>
							);
						})}
				</div>
				<div className="relative">
					{left.map((presentation) => {
						return (
							<TimelineCard
								presentation={presentation.fields}
								startTime={startTime.getHours()}
							/>
						);
					})}
				</div>
				<div className="relative">
					{right.map((presentation) => {
						return (
							<TimelineCard
								presentation={presentation.fields}
								startTime={startTime.getHours()}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
