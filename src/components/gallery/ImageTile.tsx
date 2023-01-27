import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import { romanize } from "@/utils/convert";

export type ImageTileProps = {
	image: string;
	active?: boolean;
	ordinal: number;
	onClick?: () => void;
};

export function ImageTile({
	image = "https://placekitten.com/200/300",
	ordinal,
	active = false,
	onClick,
}: ImageTileProps) {
	const { t } = useTranslation("common");
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div
			onClick={() => {
				onClick?.();
			}}
			tabIndex={0}
			role="button"
			onKeyDown={(e) => {
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault();
					onClick?.();
				}
			}}
		>
			<div
				className={clsx(
					active &&
						"bg-gradient-to-r from-konf-primary-blue to-konf-primary-green",
					!active && "border-2",
					"h-40 w-32 shrink-0 select-none overflow-hidden rounded-[4px] lg:h-60 lg:w-48",
				)}
				draggable={false}
				onDragStart={(e) => e.preventDefault()}
			>
				<div className="relative h-24 w-full lg:h-40 ">
					<Image
						src={image}
						alt="íyasd"
						fill
						className={clsx(
							!active && "grayscale",
							"select-none object-cover transition-all duration-300 ease-in-out hover:grayscale-[50%]",
						)}
						draggable={false}
					/>
				</div>
				<div className="flex h-16 flex-col items-center justify-center lg:h-20">
					<span className="block text-center text-xl font-black lg:text-3xl">{`${romanize(
						ordinal,
					)}.`}</span>
					<span className="block text-center">
						{t("name.conference").toLowerCase()}
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center">
				<span className="mt-4 block w-full select-none text-center text-3xl">
					{ordinal + 2003}
				</span>
				<div className="flex h-6 w-1 bg-white" />
			</div>
		</div>
	);
}
