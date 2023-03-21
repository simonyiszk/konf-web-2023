import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { FiExternalLink } from "react-icons/fi";
import Youtube, { YouTubeProps } from "react-youtube";

import { TextButton } from "../button/TextButton";
import styles from "./LiveStreamSection.module.scss";

type LiveStreamSectionProps = {
	link1: string;
	questions1: string;
	link2: string;
	questions2: string;
};

export function LiveStreamSection({
	link1,
	link2,
	questions1,
	questions2,
}: LiveStreamSectionProps) {
	const { t, i18n } = useTranslation("common");

	const opts: YouTubeProps["opts"] = {
		rel: 0,
		hl: i18n.language,
		disablekb: 1,
	};

	return (
		<section
			id="live"
			className="container mx-auto grid w-full grid-cols-1 gap-8 py-6 px-4 text-center md:py-16 lg:grid-cols-2"
		>
			<h3
				className={clsx(
					"pt-6 text-center text-4xl font-black md:text-6xl lg:col-span-2 lg:text-8xl",
					"bg-gradient-to-r bg-clip-text text-transparent",
					"from-konf-primary-blue to-konf-primary-green",
					"animate-text",
				)}
			>
				Élő közvetítés
			</h3>
			<div className="relative">
				<h4
					className={clsx(
						styles.holoTextGreen,
						"mb-4 text-5xl font-black text-transparent lg:text-7xl",
					)}
				>
					IB028
				</h4>
				<div className="aspect-w-16 aspect-h-9 rounded-2xl">
					<Youtube
						videoId={link1}
						loading="eager"
						opts={opts}
						iframeClassName="w-full h-full rounded-lg md:rounded-xl"
					/>
				</div>
				<div className="mx-auto my-8 max-w-lg">
					<TextButton
						fullWidth
						href={questions1}
						text={
							<span>
								IB028 kérdések
								<span>
									<FiExternalLink className="inline pb-1 text-white group-hover:text-konf-accent-yellow" />
								</span>
							</span>
						}
					/>
				</div>
			</div>
			<div>
				<h4
					className={clsx(
						styles.holoTextBlue,
						"mb-4 text-5xl font-black text-transparent lg:text-7xl",
					)}
				>
					IB025
				</h4>
				<div className="aspect-w-16 aspect-h-9  rounded-2xl">
					<Youtube
						videoId={link2}
						loading="eager"
						opts={opts}
						iframeClassName="w-full h-full rounded-lg md:rounded-xl"
					/>
				</div>
				<div className="mx-auto my-8 max-w-lg">
					<TextButton
						fullWidth
						href={questions2}
						text={
							<span>
								IB025 kérdések
								<span>
									<FiExternalLink className="inline pb-1 text-white group-hover:text-konf-accent-yellow" />
								</span>
							</span>
						}
					/>
				</div>
			</div>
		</section>
	);
}
