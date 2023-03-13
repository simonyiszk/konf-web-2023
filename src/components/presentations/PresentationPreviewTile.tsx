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
		<div className="mx-2">
			<Link
				href={href}
				className={clsx(
					"h-full min-h-[120px]",
					"backdrop-blur-safari relative flex w-full flex-col justify-center rounded-lg bg-white/10 py-4 backdrop-blur",
					"hover:bg-konf-overlay-blue/70",
					"transition duration-300 ease-in-out",
					className,
				)}
				draggable={false}
			>
				<p className={clsx("mb-2 px-2 text-center text-xl font-semibold")}>
					{title}
				</p>
				<figure className="absolute bottom-0 mb-3 h-2 w-full bg-gradient-to-r from-konf-primary-blue to-konf-primary-green" />
			</Link>
		</div>
	);
}
