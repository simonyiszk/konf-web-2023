import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useCallback, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Lightbox from "react-spring-lightbox";

import type { ReturnTypeGalleryImages } from "@/utils/contentful";

import styles from "./GallerySection.module.scss";
import { ImageTile } from "./ImageTile";
import {
	OverlayFooter,
	OverlayHeader,
	OverlayNext,
	OverlayPrevious,
} from "./LightboxOverlay";

type GallerySectionProps = {
	albums: ReturnTypeGalleryImages;
};

export function GallerySection({ albums }: GallerySectionProps) {
	const { t } = useTranslation("common");

	const scrollRef = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState({ left: 0, top: 0, x: 0, y: 0 });
	const [isScrolling, setScrolling] = useState(false);

	const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);

	const [isOpen, setOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSelect = (index: number) => {
		setActiveAlbumIndex(index);
		setCurrentIndex(0);
	};

	const openModal = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	const gotoPrevious = () =>
		currentIndex > 0 && setCurrentIndex(currentIndex - 1);
	const gotoNext = () =>
		currentIndex + 1 < (albums[activeAlbumIndex].images?.length ?? 0) &&
		setCurrentIndex(currentIndex + 1);

	const closeLightbox = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<div>
			<section className="mx-auto w-full py-16">
				<h2 className="mb-16 text-center text-4xl">
					{t("gallery.items.photo.title")}
				</h2>
				<div className="relative h-max w-full">
					{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
					<div
						ref={scrollRef}
						className={styles.scrollContainer}
						onMouseMove={(e) => {
							if (scrollRef.current && isScrolling) {
								scrollRef.current.scrollLeft = pos.left - (e.clientX - pos.x);
								scrollRef.current.scrollTop = pos.top - (e.clientY - pos.y);
							}
						}}
						onMouseDown={(e) => {
							if (scrollRef.current) {
								setPos({
									left: scrollRef.current.scrollLeft,
									top: scrollRef.current.scrollTop,
									x: e.clientX,
									y: e.clientY,
								});
								setScrolling(true);

								scrollRef.current.style.cursor = "grabbing";
								scrollRef.current.style.userSelect = "none";
							}
						}}
						onMouseUp={() => {
							setScrolling(false);

							if (scrollRef.current) {
								scrollRef.current.style.cursor = "grab";
								scrollRef.current.style.userSelect = "auto";
							}
						}}
					>
						{albums.map(({ name, thumbnail, year }, i) => {
							return (
								<ImageTile
									key={name + year}
									name={name}
									thumbnail={thumbnail}
									year={year}
									i={i}
									handleSelect={handleSelect}
									setOpen={openModal}
								/>
							);
						})}
					</div>

					<div className={styles.line} />
					<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 select-none bg-gradient-to-l from-transparent via-konf-background-blue/20 to-konf-background-blue" />
					<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 select-none bg-gradient-to-r from-transparent via-konf-background-blue/20 to-konf-background-blue" />
					<button
						className="absolute top-[40%] left-2 z-20 inline-block p-2 transition-all active:scale-75 disabled:opacity-50"
						type="button"
						onClick={() => {
							if (scrollRef.current) {
								scrollRef.current.scrollTo({
									left: scrollRef.current.scrollLeft - 248,
									behavior: "smooth",
								});
							}
						}}
					>
						<FaChevronLeft className="h-8 w-8 text-white drop-shadow-md transition-all hover:scale-125 sm:h-12 sm:w-12" />
					</button>
					<button
						className="absolute top-[40%] right-2 z-20 inline-block p-2 transition-all active:scale-75 disabled:opacity-50"
						type="button"
						onClick={() => {
							if (scrollRef.current) {
								scrollRef.current.scrollTo({
									left: scrollRef.current.scrollLeft + 248,
									behavior: "smooth",
								});
							}
						}}
					>
						<FaChevronRight className="h-8 w-8 text-white drop-shadow-md transition-all hover:scale-125 sm:h-12 sm:w-12" />
					</button>

					<Lightbox
						className="bg-black/75 backdrop-blur"
						images={
							albums[activeAlbumIndex].images?.map(({ fields }) => ({
								src: fields.file?.url ?? "",
								alt: fields.title ?? "",
							})) ?? []
						}
						isOpen={isOpen}
						currentIndex={currentIndex}
						onPrev={gotoPrevious}
						onNext={gotoNext}
						onClose={() => {
							closeLightbox();
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
