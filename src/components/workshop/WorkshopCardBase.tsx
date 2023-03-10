import clsx from "clsx";
import Image from "next/image";

import { WorkshopHeader, WorkshopHeaderProps } from "./WorkshopHeader";

type WorkshopCardBaseProps = {
	header: WorkshopHeaderProps;
	children: React.ReactNode;
	fullSizedImage?: {
		src: string;
		alt: string;
	};
};

export function WorkshopCardBase({
	header,
	children,
	fullSizedImage,
}: WorkshopCardBaseProps) {
	return (
		<div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur">
			<WorkshopHeader {...header} />
			<div className="relative grid sm:grid-cols-3">
				<div
					className={clsx(
						"order-2 my-4 px-8 py-10 sm:order-1 sm:my-0",
						fullSizedImage ? "sm:col-span-2" : "col-span-3",
					)}
				>
					{children}
				</div>
				{fullSizedImage && (
					<div className="aspect-w-1 aspect-h-1 relative order-1 mt-8 h-full w-full border-white sm:order-2 sm:my-0 sm:border-l-[3px]">
						<Image
							src={fullSizedImage.src}
							alt={fullSizedImage.alt}
							fill
							className="select-none object-cover object-center"
							draggable={false}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
