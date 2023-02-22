import clsx from "clsx";
import Image from "next/image";

import {
	EmailIcon,
	FacebookIcon,
	InstagramIcon,
	YoutubeIcon,
} from "@/components/icon";
import { FB_EVENT_LINK } from "@/utils/constants";

import manifest from "../../../../package.json";

type FooterProps = {
	fill?: "none" | "pattern";
	buildDate?: number;
};

export function Footer({ fill = "pattern", buildDate }: FooterProps) {
	const buildDateFormat = buildDate ? new Date(buildDate) : new Date();
	const buildDateString = new Intl.DateTimeFormat("hu-HU", {
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	})
		.format(buildDateFormat)
		.match(/\d+/g)
		?.join("");

	return (
		<footer
			className={clsx(
				fill === "pattern" && "bg-hero-pattern bg-cover bg-bottom bg-no-repeat",
				"z-20 w-full p-8",
			)}
			id="footer"
		>
			<div className="container mx-auto flex flex-col items-center justify-center space-y-6">
				{/* social icons */}
				<div className="flex w-full items-center justify-center gap-10 lg:w-1/3 lg:gap-16">
					<a href="mailto:konferencia@simonyi.bme.hu">
						<EmailIcon className="h-10 w-10 hover:opacity-75" />
					</a>
					<a
						href="https://www.instagram.com/simonyikonf/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<InstagramIcon className="h-10 w-10 hover:opacity-75" />
					</a>
					<a href={FB_EVENT_LINK} target="_blank" rel="noopener noreferrer">
						<FacebookIcon className="h-10 w-10 hover:opacity-75" />
					</a>
					<a
						href="https://www.youtube.com/user/SimonyiSzakkoli/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<YoutubeIcon className="h-10 w-10 hover:opacity-75" />
					</a>
				</div>
				<div className="grid w-full grid-cols-1 items-center justify-items-center gap-4 lg:w-auto lg:grid-cols-3">
					<a
						href="https://simonyi.bme.hu"
						target="_blank"
						rel="noopener noreferrer"
						className="relative inline-block h-12 w-48 hover:opacity-75"
					>
						<Image
							src="/assets/logo/simonyi.svg"
							alt="Simonyi károly szakkollégium logó"
							fill
							unoptimized
						/>
					</a>
					<a
						href="https://vik.bme.hu"
						target="_blank"
						rel="noopener noreferrer"
						className="relative inline-block h-16 w-16 hover:opacity-75"
					>
						<Image
							src="/assets/logo/vik.svg"
							alt="Villamosmérnöki és Informatikai Kar Logo"
							fill
							unoptimized
						/>
					</a>
					<a
						href="https://schdesign.hu"
						target="_blank"
						rel="noopener noreferrer"
						className="relative  block h-14 w-40 text-white hover:opacity-75"
					>
						<Image
							src="/assets/logo/schdesign.svg"
							alt="schdesign logó"
							fill
							unoptimized
						/>
					</a>
				</div>
				<a
					href="https://vercel.com?utm_source=kir-dev&utm_campaign=oss"
					target="_blank"
					rel="noopener noreferrer"
					className="relative mx-8 block h-8 w-40 text-white hover:opacity-75"
				>
					<Image
						src="/assets/logo/vercel.svg"
						fill
						alt="Vercel logó"
						unoptimized
					/>
				</a>
				{/* vercel logo and build */}
				<div className="flex w-full flex-row justify-center">
					<p className="text-xs">
						<a
							href={manifest.homepage}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub repo link"
							className="hover:text-white"
						>
							{`v${manifest.version}.${buildDateString}`}
						</a>{" "}
						<a
							href="https://github.com/simonyiszk"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub link"
							className="hover:text-white"
						>
							©&nbsp;2023&nbsp;simonyiszk
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
