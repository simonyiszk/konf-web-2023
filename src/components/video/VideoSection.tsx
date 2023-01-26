import { useTranslation } from "next-i18next";
import Youtube from "react-youtube";

import { DownArrowButton } from "../button/DownArrowButton";

type VideoSectionProps = {
	videoId: string;
};

export function VideoSection({ videoId }: VideoSectionProps) {
	const { t, i18n } = useTranslation("common");
	return (
		<section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-9 py-16 md:grid-cols-6 md:gap-20">
			<div className="col-span-1 flex flex-col gap-9 md:col-span-2 md:items-end">
				<h2 className="text-center text-4xl leading-9 md:text-right">
					{t("gallery.items.video.title")}
				</h2>
				<p className="md:text-right">{t("gallery.items.video.description")}</p>
				<DownArrowButton size={60} className="hidden md:block" />
			</div>
			<div className="md:col-span-4">
				<div
					style={{
						backdropFilter: "blur(10px)",
						WebkitFilter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
					}}
					className="aspect-w-16 aspect-h-9 mx-4 rounded-2xl"
				>
					<Youtube
						videoId={videoId}
						loading="lazy"
						opts={{
							rel: 0,
							hl: i18n.language,
							disablekb: 1,
						}}
						iframeClassName="w-full h-auto min-h-[300px] md:min-h-[400px] rounded-lg md:rounded-xl"
					/>
				</div>
				<div className="flex justify-center py-9 md:hidden">
					<DownArrowButton size={60} />
				</div>
			</div>
		</section>
	);
}
