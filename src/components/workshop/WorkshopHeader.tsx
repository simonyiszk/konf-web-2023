import { WorkshopPlace, WorkshopTimeRange } from "./WorkshopElements";
import type { WorkshopVariantType } from "./WorkshopTypes";

export const headerVariants = {
	gile: (props) => (
		<>
			<div className="col-span-2 hidden sm:block">
				<span>{props.company}</span> <WorkshopPlace place={props.place ?? ""} />{" "}
				<WorkshopTimeRange time={props.time ?? ""} />
			</div>
			<div className="w-full place-items-center">
				<span className="block text-center">{props.name}</span>
			</div>
		</>
	),
	schdesign: (props) => (
		<>
			<div className="col-span-2  hidden sm:block">
				<WorkshopPlace place={props.place ?? ""} />{" "}
				<WorkshopTimeRange time={props.time ?? ""} />
			</div>
			<div className="w-full place-items-center">
				<span className="block text-center">{props.company}</span>
			</div>
		</>
	),
	"ipar4.0": (props) => (
		<>
			<div className="col-span-2  hidden sm:block">&nbsp;</div>
			<div className="w-full place-items-center">
				<span className="block text-center">{props.company}</span>
			</div>
		</>
	),
} satisfies {
	[K in WorkshopVariantType]: (
		props: Partial<{
			company: string;
			place: string;
			time: string;
			name: string; // Name of the presenter or group
		}>,
	) => React.ReactNode;
};
