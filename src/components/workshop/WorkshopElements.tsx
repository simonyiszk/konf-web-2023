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

export function WorkshopTimeRange({ time }: { time: string }) {
	return (
		<WorkshopTextContentBase className="text-konf-accent-yellow">
			{time}
		</WorkshopTextContentBase>
	);
}
