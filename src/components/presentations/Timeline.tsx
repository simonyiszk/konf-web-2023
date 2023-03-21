import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import type { TypeBreak } from "@/@types/generated";
import type { ReturnTypePresentations } from "@/utils/contentful";
import { useFps } from "@/utils/hooks";

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
	const [isThrottled, setIsThrottled] = useState(false);
	const { avgFps } = useFps(4);

	useEffect(() => {
		setTimeout(() => {
			if (avgFps < 15) {
				setIsThrottled(true);
			}
		}, 2000);
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const startHour = startTime.getHours();
	const endHour = endTime.getHours();

	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	const rows = endHour - startHour;

	const tenMinSize = 60;
	const gapSize = 16;
	const startMin = startTime.getMinutes() / 10;

	return (
		<section className="container relative mx-auto mt-8 h-full w-full">
			<div className="sticky top-20 z-20 mx-12 mb-4 flex justify-between sm:mx-20 sm:ml-32">
				<button
					type="button"
					className="backdrop-blur-safari rounded-lg bg-white/10 p-4 backdrop-blur"
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
					<span
						className={clsx(
							styles.holoTextGreen,
							"text-2xl font-black text-transparent md:text-5xl",
						)}
					>
						IB028
					</span>
				</button>
				<button
					type="button"
					className="backdrop-blur-safari rounded-lg bg-white/10 p-4 backdrop-blur"
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
					<span
						className={clsx(
							styles.holoTextBlue,
							"text-2xl font-black text-transparent md:text-5xl",
						)}
					>
						IB025
					</span>
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
											i === 0
												? tenMinSize * 3 + gapSize
												: tenMinSize * 6 + gapSize * 2,
									}}
								>
									{i === 0 ? (
										<p
											className={clsx(
												isThrottled
													? "bg-konf-overlay-blue"
													: "backdrop-blur-safari bg-white/10 backdrop-blur",
												"rounded-lg py-1 px-2",
											)}
										>
											{i + startHour}:30
										</p>
									) : (
										<>
											<p
												className={clsx(
													isThrottled
														? "bg-konf-overlay-blue"
														: "backdrop-blur-safari bg-white/10 backdrop-blur",
													"rounded-lg py-1 px-2",
												)}
											>
												{i + startHour}:00
											</p>

											<p
												className={clsx(
													isThrottled
														? "bg-konf-overlay-blue"
														: "backdrop-blur-safari bg-white/10 backdrop-blur",
													"absolute rounded-lg py-1 px-2",
												)}
												style={{ top: tenMinSize * 3 + gapSize }}
											>
												{i + startHour}:30
											</p>
										</>
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
									startMin={startMin}
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
								isThrottled={isThrottled}
								startMin={startMin}
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
									startMin={startMin}
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
								isThrottled={isThrottled}
								startMin={startMin}
							/>
						);
					})}
				</div>
			</div>
			<div className="absolute inset-y-0 right-0 z-10 hidden h-full w-8 bg-gradient-to-l from-black/25 to-transparent" />
		</section>
	);
}
