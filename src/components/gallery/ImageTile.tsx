import type { Asset } from "contentful";
import Image from "next/image";
import { useTranslation } from "next-i18next";

type ImageTileProps = {
	name: string;
	year: number | string;
	thumbnail: Asset;
	i: number;
	handleSelect: (index: number) => void;
	setOpen: (open: boolean) => void;
};

export function ImageTile({
	name,
	thumbnail,
	year,
	i,
	setOpen,
	handleSelect,
}: ImageTileProps) {
	const { t } = useTranslation("common");
	return (
		<div>
			<button
				className="block overflow-hidden rounded-[4px] border-2"
				type="button"
				onClick={() => {
					setOpen(true);
					handleSelect(i);
				}}
			>
				<Image
					src={`https:${thumbnail.fields.file?.url}`}
					width={300}
					height={300}
					alt={name}
					className="h-40 w-40 object-cover"
					draggable={false}
				/>
				<div className="flex h-16 flex-col items-center justify-center lg:h-20">
					<span className="block text-center text-xl font-black lg:text-3xl">
						{name}
					</span>
					<span className="block text-center">
						{t("name.conference").toLowerCase()}
					</span>
				</div>
			</button>
			<div className="flex flex-col items-center justify-center">
				<span className="mt-4 block w-full select-none text-center text-3xl">
					{year}
				</span>
				<div className="flex h-6 w-1 bg-white" />
			</div>
		</div>
	);
}
