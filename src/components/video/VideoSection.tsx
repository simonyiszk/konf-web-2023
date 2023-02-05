import { useTranslation } from "next-i18next";
import Youtube from "react-youtube";

import { DownArrowButton } from "../button/DownArrowButton";
import { BgElement } from "../layout/decorations/BgDecoration";

type VideoSectionProps = {
	videoId: string;
};

export function VideoSection({ videoId }: VideoSectionProps) {
	const { t, i18n } = useTranslation("common");
	return (
		<section id="video" className="w-full py-16 px-4">
			<div className="container mx-auto grid w-full max-w-6xl grid-cols-1 gap-9 md:grid-cols-6 md:gap-20">
				<div className="col-span-1 flex flex-col gap-9 md:col-span-2 md:items-end">
					<h2 className="text-center text-4xl leading-9 md:text-right">
						{t("gallery.items.video.title")}
					</h2>
					<p className="md:text-right">
						{t("gallery.items.video.description")}
					</p>
					<DownArrowButton
						href="#sponsors"
						scroll={false}
						size={60}
						className="hidden md:block"
						hasBG
					/>
				</div>
				<div className="relative md:col-span-4">
					<BgElement
						img="blue"
						dimensions={{
							height: 1000,
							width: 1000,
						}}
						rotate={0}
						className="top-[-350px] right-[-470px] z-[0] h-max w-max sm:top-[-250px] sm:right-[-570px]"
					/>
					<div
						style={{
							backdropFilter: "blur(10px)",
							WebkitFilter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
						}}
						className="aspect-w-16 aspect-h-9 rounded-2xl"
					>
						<Youtube
							videoId={videoId}
							loading="lazy"
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
