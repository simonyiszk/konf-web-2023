import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { DownArrowButton } from "../button/DownArrowButton";
import { TextButton } from "../button/TextButton";
import { CountdownTimer } from "../timer/CountdownTimer";
import styles from "./HeroV1.module.scss";

function Hero() {
	const { t, i18n } = useTranslation("common");
	return (
		<div className="mx-1 mt-8 flex flex-col justify-center sm:mt-0 xl:-mt-8">
			<div className="aspect-w-16 aspect-h-7 relative mb-6 w-[252px] sm:mx-28 sm:-mb-6 sm:w-[276px]">
				<Image
					src="/favicon.svg"
					alt="XX. Simonyi Konferencia logó"
					className=""
					fill
					priority
					unoptimized
				/>
			</div>
			<h1 className="mx-1 mb-4 text-center text-[48px] font-black uppercase leading-10 sm:text-[56px] sm:leading-[0.825]">
				Simonyi
				<br />
				<span className="text-[42px] font-light lowercase leading-9 sm:text-[48px]">
					{t("name.conference")}
				</span>
			</h1>
			<span className="mx-1 mb-4 flex flex-row justify-center text-[22px]">
				<h2 className="flex flex-row text-right">
					<div className="mt-[2px] mr-[6px] leading-[1.1] sm:mt-[3px]">
						<span className="blue-green-gradient gradient-on-text font-medium">
							2023
						</span>
						<br />{" "}
						{new Date("2023. 03. 21")
							.toLocaleString(i18n.language, {
								month: "long",
							})
							.toLowerCase()}{" "}
					</div>
					<span className="text-[56px] font-black leading-none">21</span>
				</h2>
				<div className="ml-[8px] mr-[10px] mt-[5px] mb-[10px] w-[2px] bg-konf-primary-blue" />
				<h3 className="mt-[2px] mr-1 leading-[1.1] sm:mt-[3px]">
					<span className="blue-green-gradient gradient-on-text font-medium">
						BME
					</span>
					<br /> {t("location.items.building")}
				</h3>
			</span>
		</div>
	);
}

function CTA() {
	const { t } = useTranslation("common");
	return (
		<div className="mt-4 flex flex-col items-center gap-12">
			<TextButton
				text={t("cta.register")}
				href="https://simonyi-konferencia.eventbrite.com"
				target="_blank"
			/>
			<DownArrowButton
				href="#video"
				scroll={false}
				className="block"
				size={60}
			/>
		</div>
	);
}

export function HeroV1() {
	return (
		<div className={clsx(styles.heroV1, "bg-hero-pattern")}>
			<Hero />
			<CountdownTimer endDate="2023-03-21T08:00:00.000+02:00" />
			<CTA />
			<div className="pointer-events-none absolute bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-konf-background-blue" />
			<div className="pointer-events-none absolute -bottom-16 h-16 w-full bg-gradient-to-t from-transparent to-konf-background-blue" />
		</div>
	);
}
