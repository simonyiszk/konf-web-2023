import Image from "next/image";
import { useTranslation } from "next-i18next";

import { romanize } from "@/utils/convert";

type ImageTileProps = {
	image: string;
	active?: boolean;
	ordinal: number;
};

export function ImageTile({
	image = "https://placekitten.com/200/300",
	ordinal,
	active = false,
}: ImageTileProps) {
	const { t } = useTranslation("common");
	return (
		<div>
			<div
				className=" h-60 w-48 shrink-0 select-none overflow-hidden rounded-[4px] border-2"
				draggable={false}
				onDragStart={(e) => e.preventDefault()}
			>
				<div className="relative h-40 w-full ">
					<Image
						src={image}
						alt="íyasd"
						fill
						className="select-none object-cover"
						draggable={false}
					/>
				</div>
				<div className="flex h-20 flex-col items-center justify-center">
					<span className="block text-center text-3xl font-black">{`${romanize(
						ordinal,
					)}.`}</span>
					<span className="block text-center">
						{t("name.conference").toLowerCase()}
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center">
				<span className="mt-4 block w-full text-center text-3xl">
					{ordinal}
				</span>
				<div className="flex h-6 w-1 bg-white" />
			</div>
		</div>
	);
}
