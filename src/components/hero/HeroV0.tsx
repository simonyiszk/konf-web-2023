import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FiExternalLink } from "react-icons/fi";

import { useBool } from "@/utils/hooks";

import { Menu } from "../menu/Menu";
import { MenuButton } from "../menu/MenuButton";
import { CountdownTimer } from "../timer/CountdownTimer";
import styles from "./HeroV0.module.scss";

function HeroDesktopTop() {
	const { t } = useTranslation("common");
	return (
		<div className="flex w-full flex-row justify-between sm:self-start">
			<div className="m-8 hidden self-start sm:block xl:my-16">
				<p className="">{t("conferences.checkout")}:</p>
				<ul className="my-2 flex flex-row justify-start gap-1">
					<li>
						<Link
							className="whitespace-nowrap p-2 pl-0 hover:underline hover:opacity-75"
							href="/2022"
							target="_blank"
							rel="noreferrer"
						>
							2022
							<FiExternalLink className="ml-1 inline-block pb-1" />
						</Link>
					</li>
					<li>
						<Link
							className="whitespace-nowrap p-2 hover:underline hover:opacity-75"
							href="/2021"
							target="_blank"
							rel="noreferrer"
						>
							2021
							<FiExternalLink className="ml-1 inline-block pb-1" />
						</Link>
					</li>
				</ul>
			</div>
			<ul className="mx-8 hidden flex-row justify-center gap-4 sm:flex">
				<li className="relative mb-2">
					<a
						href="https://vik.bme.hu"
						className="relative mt-8 inline-block h-12 w-12 hover:opacity-75 xl:mt-16"
						target="_blank"
						rel="noreferrer"
					>
						<Image
							src="/assets/logo/vik.svg"
							alt="BME VIK logó"
							fill
							unoptimized
						/>
					</a>
				</li>
				<li className="relative mb-2">
					<a
						href="https://simonyi.bme.hu"
						className="relative mt-8 inline-block h-12 w-48 hover:opacity-75 xl:mt-16"
						target="_blank"
						rel="noreferrer"
					>
						<Image
							src="/assets/logo/simonyi.svg"
							alt="Simonyi károly szakkollégium logó"
							fill
							unoptimized
						/>
					</a>
				</li>
			</ul>
		</div>
	);
}

function HeroBottom() {
	const { t } = useTranslation("common");
	return (
		<div className="flex w-full flex-row justify-center sm:justify-between sm:self-start">
			<ul className="m-8 flex flex-row justify-center gap-8 sm:justify-start xl:my-16">
				<li>
					<a
						href="https://instagram.com/simonyikonf"
						className="hover:opacity-75"
						target="_blank"
						rel="noreferrer"
					>
						<Image
							src="/assets/icon/ig.svg"
							alt="Simonyi Konferencia Instagram"
							width={40}
							height={40}
							unoptimized
						/>
					</a>
				</li>
				<li>
					<a
						href="https://facebook.com/simonyiszk"
						className="hover:opacity-75"
						target="_blank"
						rel="noreferrer"
					>
						<Image
							src="/assets/icon/fb.svg"
							alt="Simonyi Konferencia Facebook"
							width={40}
							height={40}
							unoptimized
						/>
					</a>
				</li>
				<li>
					<a
						href="https://youtu.be/FpFWqHySuVA?list=PLovp3RCdzQGxJ7c0HIpTkgMYuqJj4V4yE"
						className="hover:opacity-75"
						target="_blank"
						rel="noreferrer"
					>
						<Image
							src="/assets/icon/yt.svg"
							alt="Simonyi Konferencia YouTube"
							width={40}
							height={40}
							unoptimized
						/>
					</a>
				</li>
			</ul>
			<div className="my-8 mb-2 hidden flex-col text-center text-sm font-light sm:flex xl:my-16">
				<a
					href="https://vercel.com/?utm_source=kir-dev&utm_campaign=oss"
					className="relative inline-block h-8 w-36 text-white hover:opacity-75"
					target="_blank"
					rel="noreferrer"
				>
					<Image
						src="/assets/logo/vercel.svg"
						fill
						alt="Vercel logó"
						unoptimized
					/>
				</a>
			</div>
			<div className="relative mb-2 -mt-6 hidden w-fit flex-col items-end text-sm font-light sm:flex xl:mt-2">
				<p className="mx-8 mb-2 mt-4 w-fit text-right">
					<span className="inline-block">{t("schdesigncredits.upper")}</span>{" "}
					<br />
					<span className="inline-block">{t("schdesigncredits.lower")}: </span>
				</p>
				<a
					href="https://schdesign.hu"
					className="relative mx-8 block h-8 w-28 text-white hover:opacity-75"
					target="_blank"
					rel="noreferrer"
				>
					<Image
						src="/assets/logo/schdesign.svg"
						alt="schdesign logó"
						fill
						unoptimized
					/>
				</a>
			</div>
		</div>
	);
}

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

function LocalMenu() {
	const [isMenuOpen, setMenuOpen] = useBool(false);
	return (
		<>
			<div className="fixed top-2 left-2 z-30 sm:hidden">
				<button
					type="button"
					className="p-2 hover:opacity-75"
					onClick={setMenuOpen.toggle}
					aria-label="Menü megnyitása"
				>
					<MenuButton isOpen={isMenuOpen} className="m-2" />
				</button>
			</div>
			<Menu isOpen={isMenuOpen} closeFn={setMenuOpen.setFalse} />
		</>
	);
}
export function HeroV0() {
	return (
		<div className={styles.heroV0}>
			<LocalMenu />
			<HeroDesktopTop />
			<Hero />
			<CountdownTimer endDate="2023-03-21T08:00:00.000+02:00" />
			<HeroBottom />
		</div>
	);
}
