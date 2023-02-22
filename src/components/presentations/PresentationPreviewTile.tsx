import clsx from "clsx";
import Link from "next/link";

import type { PresentationPreviewType } from "./PresentationTypes";

type PresentationPreviewTileProps = PresentationPreviewType & {
	className?: string;
};

export function PresentationPreviewTile({
	title,
	href,
	className,
}: PresentationPreviewTileProps) {
	return (
		<Link
			href={href}
			className={clsx(
				"h-full min-h-[120px]",
				"relative flex w-full flex-col justify-center rounded-lg bg-black/25 py-4",
				"hover:bg-konf-overlay-blue/70",
				"transition duration-300 ease-in-out",
				className,
			)}
		>
			<p className={clsx("mb-2 px-2 text-center text-[28px] leading-9")}>
				{title}
			</p>
			<figure className="absolute bottom-0 mb-3 h-2 w-full bg-gradient-to-r from-konf-primary-blue to-konf-primary-green" />
		</Link>
	);
}
