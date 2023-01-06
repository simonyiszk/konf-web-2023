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

export type SeasonTimerProps = {
	endDate: string;
};

export function CountdownTimer({ endDate }: SeasonTimerProps) {
	const { weeks, days, hours, minutes } = timeBetween(
		Date.now(),
		Date.parse(endDate),
	);
	const [time, setTime] = useState<{
		weeks: number;
		days: number;
		hours: number;
		minutes: number;
	}>({ weeks, days, hours, minutes });

	// Update the time every minute
	useEffect(() => {
		const interval = setInterval(() => {
			const {
				weeks: w,
				days: d,
				hours: h,
				minutes: m,
			} = timeBetween(Date.now(), Date.parse(endDate));

			setTime({ weeks: w, days: d, hours: h, minutes: m });
		}, 60000);
		return () => clearInterval(interval);
	}, [endDate]);

	return (
		<p className="blue-green-gradient flex flex-row bg-clip-text text-4xl font-medium sm:text-5xl">
			{time.weeks > 0 && (
				<>
					<span className="flex flex-col justify-center text-center">
						<span className="gradient-on-text font-black">
							{`0${time.weeks}`.slice(-2)}
						</span>

						<span className="text-xl font-normal text-white">hét</span>
					</span>
					<span className="mx-1 flex flex-col justify-center text-center">
						<span className="gradient-on-text font-black">:</span>
						<span className="text-xl font-normal text-white">:</span>
					</span>
				</>
			)}
			{time.days + time.weeks > 0 && (
				<>
					<span className="flex flex-col justify-center text-center">
						<span className="gradient-on-text font-black">
							{`0${time.days}`.slice(-2)}
						</span>

						<span className="text-xl font-normal text-white">nap</span>
					</span>
					<span className="mx-1 flex flex-col justify-center text-center">
						<span className="gradient-on-text font-black">:</span>
						<span className="text-xl font-normal text-white">:</span>
					</span>
				</>
			)}
			{time.hours + time.days + time.weeks > 0 && (
				<>
					<span className="flex flex-col justify-center text-center">
						<span className="gradient-on-text font-black">
							{`0${time.hours}`.slice(-2)}
						</span>

						<span className="text-xl font-normal text-white">óra</span>
					</span>
					<span className="mx-1 flex flex-col justify-center text-center">
						<span className="gradient-on-text font-black">:</span>
						<span className="text-xl font-normal text-white">:</span>
					</span>
				</>
			)}
			<span className="flex flex-col justify-center text-center">
				<span className="gradient-on-text font-black">
					{`0${time.minutes}`.slice(-2)}
				</span>
				<span className="text-xl font-normal text-white">perc</span>
			</span>
		</p>
	);
}
