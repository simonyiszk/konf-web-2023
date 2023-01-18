import Image from "next/image";
import clsx from "clsx";

import manifest from "../../../package.json";

type FooterProps = {
	fill?: "none" | "pattern";
};

export function Footer({ fill = "pattern" }: FooterProps) {
	return (
		<footer
			className={clsx(
				fill === "pattern" && "bg-hero-pattern bg-cover bg-bottom bg-no-repeat",
				"z-20 w-full  p-8",
			)}
			id="footer"
		>
			<div className="container mx-auto flex flex-col items-center justify-center space-y-6">
				{/* social icons */}
				<div className="flex w-full items-center justify-center gap-10 lg:w-1/3 lg:gap-16">
					<a href="mailto:konferencia@simonyi.bme.hu">
						<Image
							src="/assets/icon/email.svg"
							alt="Simonyi Konferencia Instagram"
							width={40}
							height={40}
							unoptimized
						/>
					</a>
					<a
						href="https://www.instagram.com/simonyikonf/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/assets/icon/ig.svg"
							alt="Simonyi Konferencia Instagram"
							width={40}
							height={40}
							unoptimized
						/>
					</a>
					<a
						href="https://fb.me/e/myxPUe7JM"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/assets/icon/fb.svg"
							alt="Simonyi Konferencia Facebook"
							width={40}
							height={40}
							unoptimized
						/>
					</a>
					<a
						href="https://www.youtube.com/user/SimonyiSzakkoli/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/assets/icon/yt.svg"
							alt="Simonyi Konferencia Youtube"
							width={40}
							height={40}
							unoptimized
						/>
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
							href="https://github.com/simonyiszk/konf-2022-web"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub repo link"
							className="hover:text-white"
						>
							{`v${manifest.version}`}
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
