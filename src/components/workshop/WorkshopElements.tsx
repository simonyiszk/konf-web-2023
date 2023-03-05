import { localizedTimeOptions } from "./WorkshopTypes";

type WorkshopTextContentBaseProps = {
	children: React.ReactNode;
	className?: string;
};

function WorkshopTextContentBase({
	children,
	className,
}: WorkshopTextContentBaseProps) {
	return <span className={className}>{children}</span>;
}

export function WorkshopPlace({ place }: { place: string }) {
	return (
		<WorkshopTextContentBase className="text-konf-primary-blue">
			{place}
		</WorkshopTextContentBase>
	);
}

export function WorkshopTimeRange({ start, end }: { start: Date; end: Date }) {
	if (
		(start === new Date() || end === new Date()) &&
		process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
	) {
		// eslint-disable-next-line no-console
		console.warn("Possible invalid date passed to WorkshopTimeRange");
	}
	const str = `${start.toLocaleTimeString(
		"hu",
		localizedTimeOptions,
	)} - ${end.toLocaleTimeString("hu", localizedTimeOptions)}`;
	return (
		<WorkshopTextContentBase className="whitespace-nowrap text-konf-accent-yellow">
			{str}
		</WorkshopTextContentBase>
	);
}
