import { WorkshopPlace, WorkshopTimeRange } from "./WorkshopElements";
import type { WorkshopVariantType } from "./WorkshopTypes";

export type WorkshopHeaderProps = {
	variant: WorkshopVariantType;
	company: string;
	place: string;
	time: {
		start: Date;
		end: Date;
	};
	name: string; // Name of the presenter or group
};

const renderChecks = {
	gile: {
		company: true,
		place: true,
		time: true,
		name: true,
	},
	schdesign: {
		company: false,
		place: true,
		time: true,
		name: true,
	},
	"ipar4.0": {
		company: false,
		place: false,
		time: false,
		name: true,
	},
} satisfies {
	[K in WorkshopVariantType]: {
		company: boolean;
		place: boolean;
		time: boolean;
		name: boolean;
	};
};

export function WorkshopHeader({
	company,
	name,
	place,
	time,
	variant,
}: WorkshopHeaderProps) {
	return (
		<div className="grid w-full border-b-[3px] border-white py-3 px-8 text-3xl sm:grid-cols-3">
			<div className="order-2 flex flex-col gap-x-2 text-center sm:order-1 sm:col-span-2 sm:text-left lg:flex-row">
				{renderChecks[variant].company && <span className="">{company}</span>}
				{renderChecks[variant].company && renderChecks[variant].place && (
					<span className="hidden select-none lg:block">|</span>
				)}
				{renderChecks[variant].place && <WorkshopPlace place={place} />}
				{renderChecks[variant].place && renderChecks[variant].time && (
					<span className="hidden select-none lg:block">|</span>
				)}
				{renderChecks[variant].time && (
					<WorkshopTimeRange start={time.start} end={time.end} />
				)}
			</div>
			<div className="order-1 flex items-center justify-center text-center sm:order-2">
				{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
				{renderChecks[variant].name && <span>{name}</span>}
			</div>
		</div>
	);
}
