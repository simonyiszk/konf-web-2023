import { useTranslation } from "next-i18next";
import { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Lightbox from "react-spring-lightbox";

import type { TypeGalleryImagesFields } from "@/@types/generated";

import { ImageTile } from "./ImageTile";
import {
	OverlayFooter,
	OverlayHeader,
	OverlayNext,
	OverlayPrevious,
} from "./LightboxOverlay";

type GallerySectionProps = {
	albums: TypeGalleryImagesFields[];
};

export function GallerySection({ albums }: GallerySectionProps) {
	const { t } = useTranslation("common");

	const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);

	const handleSelect = (index: number) => {
		setActiveAlbumIndex(index);
	};

	const [isOpen, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const gotoPrevious = () =>
		currentIndex > 0 && setCurrentIndex(currentIndex - 1);
	const gotoNext = () =>
		currentIndex + 1 < albums[activeAlbumIndex].images.length &&
		setCurrentIndex(currentIndex + 1);
	const closeLightbox = () => setOpen(false);

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
						className="flex h-full w-full cursor-grab gap-6 px-4 lg:px-20"
						nativeMobileScroll
					>
						{albums.map(({ name, thumbnail, year }, i) => (
							<ImageTile
								key={name + year}
								name={name}
								thumbnail={thumbnail}
								year={year}
								i={i}
								handleSelect={handleSelect}
								setOpen={setOpen}
							/>
						))}
					</ScrollContainer>

					{albums.length > 0 && (
						<>
							<div className="-mt-3.5 h-1 w-full bg-white" />
							<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 select-none bg-gradient-to-l from-transparent via-konf-background-blue/20 to-konf-background-blue" />
							<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 select-none bg-gradient-to-r from-transparent via-konf-background-blue/20 to-konf-background-blue" />
						</>
					)}

					<Lightbox
						className="bg-black/75 backdrop-blur"
						images={albums[activeAlbumIndex].images.map(({ fields }) => ({
							src: fields.file?.url ?? "",
							alt: fields.title ?? "",
						}))}
						isOpen={isOpen}
						currentIndex={currentIndex}
						onPrev={gotoPrevious}
						onNext={gotoNext}
						onClose={() => {
							closeLightbox();
							setCurrentIndex(0);
						}}
						// @ts-expect-error: wrong type defs?
						renderNextButton={({ canNext }) => (
							<OverlayNext canNext={canNext} gotoNext={gotoNext} />
						)}
						// @ts-expect-error: wrong type defs?
						renderPrevButton={({ canPrev }) => (
							<OverlayPrevious canPrev={canPrev} gotoPrevious={gotoPrevious} />
						)}
						renderHeader={() => <OverlayHeader setOpen={setOpen} />}
						renderFooter={() => (
							<OverlayFooter title={albums[activeAlbumIndex].name} />
						)}
					/>
				</div>
			</section>
		</div>
	);
}
