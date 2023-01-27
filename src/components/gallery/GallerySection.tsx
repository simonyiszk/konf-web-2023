import { useTranslation } from "next-i18next";
import ScrollContainer from "react-indiana-drag-scroll";

import { ImageTile } from "./ImageTile";

export function GallerySection() {
	const { t } = useTranslation("common");
	return (
		<div>
			<section className="mx-auto max-w-6xl py-16">
				<h2 className="mb-16 text-center text-4xl">
					{t("gallery.items.video.title")}
				</h2>
				<div className="relative h-full w-full">
					<ScrollContainer
						vertical={false}
						hideScrollbars
						horizontal
						className="container flex h-full w-full shrink-0 grow-0 cursor-grab gap-6 overflow-x-hidden"
					>
						<ImageTile ordinal={19} />
						<ImageTile ordinal={18} />
						<ImageTile ordinal={17} />
						<ImageTile ordinal={16} />
						<ImageTile ordinal={15} />
						<ImageTile ordinal={14} />
						<ImageTile ordinal={13} />
					</ScrollContainer>
					<div className="-mt-3.5 h-1 w-full bg-white" />
					<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 select-none bg-gradient-to-l from-transparent to-konf-background-blue" />
					<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 select-none bg-gradient-to-r from-transparent to-konf-background-blue" />
				</div>
			</section>
		</div>
	);
}
