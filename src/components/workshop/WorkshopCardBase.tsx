import clsx from "clsx";
import Image from "next/image";

type WorkshopCardBaseProps = {
	header: React.ReactNode;
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
			<div className="grid w-full border-b-[3px] border-white py-3 px-8 text-3xl sm:grid-cols-3 sm:pr-0 sm:pl-8">
				{header}
			</div>
			<div className="grid sm:grid-cols-3">
				<div
					className={clsx(
						"px-8 py-10",
						fullSizedImage ? "sm:col-span-2" : "col-span-3",
					)}
				>
					{children}
				</div>
				{fullSizedImage && (
					<div className="relative h-full w-full border-l-[3px] border-white">
						<Image
							src={fullSizedImage.src}
							alt={fullSizedImage.alt}
							fill
							className="select-none object-cover object-top"
							draggable={false}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
