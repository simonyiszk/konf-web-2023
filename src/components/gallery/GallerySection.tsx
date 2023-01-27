import { useTranslation } from "next-i18next";
import { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import { ImageTile, ImageTileProps } from "./ImageTile";

const mockImagesInit: ImageTileProps[] = [
	{
		image: "https://placekitten.com/200/286",
		ordinal: 20,
	},
	{
		image: "https://placekitten.com/200/285",
		ordinal: 19,
	},
	{
		image: "https://placekitten.com/200/284",
		ordinal: 18,
	},
	{
		image: "https://placekitten.com/200/283",
		ordinal: 17,
	},
	{
		image: "https://placekitten.com/200/282",
		ordinal: 16,
	},
	{
		image: "https://placekitten.com/200/281",
		ordinal: 15,
	},
	{
		image: "https://placekitten.com/200/280",
		ordinal: 14,
	},
	{
		image: "https://placekitten.com/200/279",
		ordinal: 13,
	},
	{
		image: "https://placekitten.com/200/278",
		ordinal: 12,
	},
	{
		image: "https://placekitten.com/200/277",
		ordinal: 11,
	},
	{
		image: "https://placekitten.com/200/276",
		ordinal: 10,
	},
	{
		image: "https://placekitten.com/200/275",
		ordinal: 9,
	},
	{
		image: "https://placekitten.com/200/274",
		ordinal: 8,
	},
	{
		image: "https://placekitten.com/200/273",
		ordinal: 7,
	},
	{
		image: "https://placekitten.com/200/272",
		ordinal: 6,
	},
];

export function GallerySection() {
	const { t } = useTranslation("common");

	// TODO: get images from contentful
	const images: ImageTileProps[] = mockImagesInit;

	const [activeIndex, setActiveIndex] = useState(0);

	const handleSelect = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<div>
			<section className="mx-auto w-full py-16">
				<h2 className="mb-16 text-center text-4xl">
					{t("gallery.items.photo.title")}
				</h2>
				<div className="relative h-full w-full">
					<ScrollContainer
						vertical={false}
						hideScrollbars
						horizontal
						className="flex h-full w-full cursor-grab gap-6"
					>
						{images.map((image, i) => (
							<ImageTile
								key={image.ordinal}
								{...image}
								active={activeIndex === i}
								onClick={() => handleSelect(i)}
							/>
						))}
					</ScrollContainer>
					{images.length > 0 && (
						<>
							<div className="-mt-3.5 h-1 w-full bg-white" />
							<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 select-none bg-gradient-to-l from-transparent via-konf-background-blue/20 to-konf-background-blue" />
							<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 select-none bg-gradient-to-r from-transparent via-konf-background-blue/20 to-konf-background-blue" />
						</>
					)}
				</div>
			</section>
		</div>
	);
}
