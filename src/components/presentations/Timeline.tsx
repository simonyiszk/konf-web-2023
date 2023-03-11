import clsx from "clsx";
import { useRef } from "react";

import type { TypeBreak } from "@/@types/generated";
import type { ReturnTypePresentations } from "@/utils/contentful";

import styles from "./Timeline.module.scss";
import { TimelineBreak } from "./TimelineBreak";
import { TimelineCard } from "./TimelineCard";

type TimelineProps = {
	left: ReturnTypePresentations;
	right: ReturnTypePresentations;
	breaks: TypeBreak[];
	startTime: Date;
	endTime: Date;
};

export function Timeline({
	left,
	right,
	breaks,
	startTime,
	endTime,
}: TimelineProps) {
	const startHour = startTime.getHours();
	const endHour = endTime.getHours();

	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	const rows = endHour - startHour + 1;

	const tenMinSize = 60;
	const gapSize = 16;

	return (
		<section className="container relative mx-auto mt-8 h-full w-full">
			<div className="sticky top-20 z-20 mx-20 mb-4 flex justify-between">
				<button
					type="button"
					className="rounded-lg bg-white/10 p-4 font-bold text-konf-primary-green backdrop-blur"
					onClick={() => {
						if (leftRef.current) {
							leftRef.current.scrollIntoView({
								behavior: "smooth",
								block: "nearest",
								inline: "center",
							});
						}
					}}
				>
					IB028
				</button>
				<button
					type="button"
					className="rounded-lg bg-white/10 p-4 font-bold text-konf-primary-blue backdrop-blur"
					onClick={() => {
						if (rightRef.current) {
							rightRef.current.scrollIntoView({
								behavior: "smooth",
								block: "nearest",
								inline: "center",
							});
						}
					}}
				>
					IB025
				</button>
			</div>
			<div className="absolute inset-y-0 left-0 z-10 hidden h-full w-8 bg-gradient-to-r from-black/25 to-transparent" />
			<div className={clsx(styles.timeline)}>
				<div id="times" ref={leftRef}>
					{Array(rows)
						.fill(0)
						.map((_, i) => {
							return (
								<div
									key={`${i + startHour}:00`}
									className="relative"
									style={{
										height:
											(i === rows - 1 ? tenMinSize * 3 : tenMinSize * 6) +
											gapSize * 2,
									}}
								>
									<p className="rounded-lg bg-white/10 py-1 px-2 backdrop-blur">
										{i + startHour}:00
									</p>
									{i === rows - 1 ? null : (
										<p
											className="absolute rounded-lg bg-white/10 py-1 px-2 backdrop-blur"
											style={{ top: tenMinSize * 3 + gapSize }}
										>
											{i + startHour}:30
										</p>
									)}
								</div>
							);
						})}
				</div>
				<div id="IB028" className="relative min-w-[240px]">
					{breaks.map((breakItem) => {
						if (
							breakItem.fields.isDouble ||
							breakItem.fields.room === "IB028"
						) {
							return (
								<TimelineBreak
									key={`${breakItem.fields.startDate}+${breakItem.fields.room}`}
									breakItem={breakItem.fields}
									startHour={startHour}
									tenMinSize={tenMinSize}
									gapSize={gapSize}
								/>
							);
						}
						return null;
					})}
					{left.map((presentation) => {
						return (
							<TimelineCard
								key={presentation.fields.title}
								presentation={presentation.fields}
								startTime={startTime.getHours()}
								tenMinSize={tenMinSize}
								gapSize={gapSize}
								isDouble={presentation.fields.name === "Charles Simonyi"}
							/>
						);
					})}
				</div>
				<div id="IB025" ref={rightRef} className="relative min-w-[240px]">
					{breaks.map((breakItem) => {
						if (
							!breakItem.fields.isDouble &&
							breakItem.fields.room === "IB025"
						) {
							return (
								<TimelineBreak
									key={`${breakItem.fields.startDate}+${breakItem.fields.room}`}
									breakItem={breakItem.fields}
									startHour={startHour}
									tenMinSize={tenMinSize}
									gapSize={gapSize}
								/>
							);
						}
						return null;
					})}
					{right.map((presentation) => {
						return (
							<TimelineCard
								key={presentation.fields.title}
								presentation={presentation.fields}
								startTime={startTime.getHours()}
								tenMinSize={tenMinSize}
								gapSize={gapSize}
							/>
						);
					})}
				</div>
			</div>
			<div className="absolute inset-y-0 right-0 z-10 hidden h-full w-8 bg-gradient-to-l from-black/25 to-transparent" />
		</section>
	);
}
