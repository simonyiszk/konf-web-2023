import Image from "next/image";
import Link from "next/link";

import styles from "./HeroV1.module.scss";

export function HeroV1() {
	return (
		<div className={styles.heroV1}>
			<div className="mx-1 flex h-full flex-col justify-center">
				<div className="aspect-w-16 aspect-h-7 relative mb-6 w-[252px] sm:mx-28 sm:-mb-6 sm:w-[276px]">
					<Image
						src="/favicon.svg"
						alt="XX. Simonyi Konferencia logó"
						className=""
						fill
					/>
				</div>
				<h1 className="mx-1 mb-4 text-center text-[48px] font-black uppercase leading-10 sm:text-[56px] sm:leading-[0.825]">
					Simonyi
					<br />
					<span className="text-[42px] font-light lowercase leading-9 sm:text-[48px]">
						Konferencia
					</span>
				</h1>
				<span className="mx-1 mb-8 flex flex-row justify-center text-[22px]">
					<h2 className="flex flex-row text-right">
						<div className="mt-[2px] mr-[6px] leading-[1.1]">
							<span className="bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text font-medium text-transparent">
								2023
							</span>
							<br /> március{" "}
						</div>
						<span className="text-[56px] font-black leading-none">21</span>
					</h2>
					<div className="ml-[8px] mr-[10px] mt-[5px] mb-[10px] w-[2px] bg-konf-primary-blue" />
					<h3 className="mt-[2px] mr-1 leading-[1.1]">
						<span className="bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text font-medium text-transparent">
							BME
						</span>
						<br /> I épület
					</h3>
				</span>
			</div>
			<div className="mb-16">
				<p className="my-4 text-center text-xl">
					Addig is tekintsd meg a korábbi konferenciáinkat:
				</p>
				<ul className="my-2 flex flex-row justify-evenly text-lg">
					<li>
						<Link
							className="underline opacity-70 hover:opacity-90"
							href="/2022"
						>
							2022
						</Link>
					</li>
					<li>
						<Link
							className="underline opacity-70 hover:opacity-90"
							href="/2021"
						>
							2021
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
