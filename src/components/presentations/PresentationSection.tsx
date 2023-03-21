import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { Suspense } from "react";
import AliceCarousel from "react-alice-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useWindowSize } from "@/utils/hooks";

import { TextButton } from "../button/TextButton";
import type { PresentationPreviewType } from ".";
import { PresentationPreviewTile } from "./PresentationPreviewTile";

type PresentationSectionProps = {
	presentations: PresentationPreviewType[];
};

export function PresentationSection({
	presentations,
}: PresentationSectionProps) {
	const { t, i18n } = useTranslation("common");
	const href = i18n.language === "hu" ? "/eloadasok" : "/presentations";
	const responsive = {
		0: { items: 1 },
		640: { items: 2 },
		1024: { items: 3 },
		1536: { items: 4 },
	};

	const { width } = useWindowSize();

	return (
		<section
			id={href.split("/")[1]}
			className="container mx-auto w-full py-6 px-4 md:py-16"
		>
			<h3
				className={clsx(
					"mb-4 pt-6 text-center text-4xl font-black md:text-6xl lg:col-span-2 lg:text-8xl",
					"bg-gradient-to-r bg-clip-text text-transparent",
					"from-konf-primary-blue to-konf-primary-green",
					"animate-text",
				)}
			>
				Előadások
			</h3>
			<Suspense fallback={<PresentationPreviewTile title="" href="" />}>
				<AliceCarousel
					mouseTracking
					items={presentations.map((p) => (
						<PresentationPreviewTile
							key={p.href}
							title={p.title}
							href={p.href}
						/>
					))}
					responsive={responsive}
					innerWidth={width}
					controlsStrategy="alternate"
					autoPlay
					autoPlayInterval={7000}
					infinite
					renderPrevButton={() => (
						<FaChevronLeft className="m-2 ml-auto text-2xl transition-all hover:scale-125 active:scale-75" />
					)}
					renderNextButton={() => (
						<FaChevronRight className="m-2 text-2xl transition-all hover:scale-125 active:scale-75" />
					)}
				/>
			</Suspense>
			<div className="mx-auto my-8 max-w-lg">
				<TextButton
					fullWidth
					href={href}
					text={t("presentations.items.more")}
				/>
			</div>
		</section>
	);
}
