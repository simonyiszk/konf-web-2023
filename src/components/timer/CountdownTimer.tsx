import i18next from "i18next";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

/** Calculates the time between two dates
 * @param d1 the first date in number form
 * @param d2 the second date in number form
 * @returns the weeks, days, hours and minutes in an object
 */
function timeBetween(d1: number, d2: number) {
	let delta = Math.abs(d1 - d2) / 1000;
	const weeks = Math.floor(delta / 604800);
	delta -= weeks * 604800;
	const days = Math.floor(delta / 86400);
	delta -= days * 86400;
	const hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;
	const minutes = (Math.floor(delta / 60) % 60) + 1;

	return { weeks, days, hours, minutes };
}

type TimerBlockProps = {
	time: number;
	unit: string;
	hasColon?: boolean;
};

function TimerBlock({ time, unit, hasColon }: TimerBlockProps) {
	return (
		<>
			<span className="flex flex-col justify-center text-center">
				<span className="gradient-on-text font-black">
					{`0${time}`.slice(-2)}
				</span>

				<span className="text-xl font-normal text-white">{unit}</span>
			</span>
			{hasColon && (
				<span className="mx-1 flex flex-col justify-center text-center">
					<span className="gradient-on-text font-black">:</span>
					<span className="text-xl font-normal text-white">:</span>
				</span>
			)}
		</>
	);
}

export type SeasonTimerProps = {
	endDate: string;
};

export function CountdownTimer({ endDate }: SeasonTimerProps) {
	const [time, setTime] = useState<{
		weeks: number;
		days: number;
		hours: number;
		minutes: number;
	}>(timeBetween(Date.now(), Date.parse(endDate)));

	// Update the time first render and every minute
	useEffect(() => {
		setTime(timeBetween(Date.now(), Date.parse(endDate)));

		const interval = setInterval(() => {
			const { weeks, days, hours, minutes } = timeBetween(
				Date.now(),
				Date.parse(endDate),
			);

			setTime({ weeks, days, hours, minutes });
		}, 60000);

		return () => clearInterval(interval);
	}, [endDate]);

	const { t } = useTranslation("common");

	return (
		<p className="blue-green-gradient flex flex-row bg-clip-text text-4xl font-medium sm:text-5xl">
			{time.weeks > 0 && (
				<TimerBlock
					time={time.weeks}
					unit={t("date.items.week", { count: time.weeks })}
					hasColon
				/>
			)}
			{time.days + time.weeks > 0 && (
				<TimerBlock
					time={time.days}
					unit={t("date.items.day", { count: time.days })}
					hasColon
				/>
			)}
			{time.hours + time.days + time.weeks > 0 && (
				<TimerBlock
					time={time.hours}
					unit={t("date.items.hour", { count: time.hours })}
					hasColon
				/>
			)}
			<TimerBlock
				time={time.minutes}
				unit={t("date.items.minute", { count: time.minutes })}
			/>
		</p>
	);
}
