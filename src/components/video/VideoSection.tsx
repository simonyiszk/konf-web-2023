import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Youtube from "react-youtube";

import { DownArrowButton } from "../button/DownArrowButton";

type VideoSectionProps = {
	videoId: string;
};

export function VideoSection({ videoId }: VideoSectionProps) {
	const { t, i18n } = useTranslation("common");
	const [isReady, setIsReady] = useState(false);
	return (
		<section id="video" className="container mx-auto w-full py-16 px-4">
			<div className=" mx-auto grid w-full max-w-6xl grid-cols-1 gap-9 md:grid-cols-6 md:gap-20">
				<div className="relative col-span-1 flex flex-col gap-9 md:col-span-2 md:items-end">
					<h2 className="text-center text-4xl md:text-right">
						{t("gallery.items.video.title")}
					</h2>
					<p className="md:text-right">
						{t("gallery.items.video.description")}
					</p>
					<DownArrowButton
						href="#gallery"
						scroll={false}
						size={60}
						className="hidden md:block"
						hasBG
					/>
				</div>
				<div className="relative md:col-span-4">
					<div
						style={{
							WebkitFilter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
						}}
						className={clsx(
							"aspect-w-16 aspect-h-9 h-full w-full rounded-2xl",
							isReady ? "animate-none" : "animate-pulse",
						)}
					>
						<Youtube
							videoId={videoId}
							loading="lazy"
							onReady={() => {
								setIsReady(true);
							}}
							opts={{
								rel: 0,
								hl: i18n.language,
								disablekb: 1,
							}}
							iframeClassName="w-full h-full rounded-lg md:rounded-xl"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
