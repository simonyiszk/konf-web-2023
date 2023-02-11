import clsx from "clsx";

type PresentationPreviewTileProps = {
	title: string;
	href: string;
	className?: string;
};

export function PresentationPreviewTile({
	title,
	href,
	className,
}: PresentationPreviewTileProps) {
	return (
		<div
			className={clsx(
				"min-h-[120px]",
				"relative flex w-full flex-col justify-center rounded-lg bg-black/25 py-4",
				className,
			)}
		>
			<p className="mb-2 px-2 text-center text-[28px] leading-9">{title}</p>
			<figure className="absolute bottom-0 mb-3 h-2 w-full bg-gradient-to-r from-konf-primary-blue to-konf-primary-green" />
		</div>
	);
}
