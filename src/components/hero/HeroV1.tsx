import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import { CountdownTimer } from "../timer/CountdownTimer";
import styles from "./HeroV1.module.scss";

export function HeroV1() {
	return (
		<div className={styles.heroV1}>
			<div className="w-full">
				<div className="my-16 mx-8 hidden self-start sm:block">
					<p className="">Tekintsd meg a korábbi konferenciáinkat:</p>
					<ul className="my-2 flex flex-row justify-start gap-1">
						<li>
							<Link
								className="whitespace-nowrap p-2 pl-0 opacity-70 hover:underline hover:opacity-90"
								href="/2022"
							>
								2022
								<FiExternalLink className="ml-1 inline-block pb-1" />
							</Link>
						</li>
						<li>
							<Link
								className="whitespace-nowrap p-2 opacity-70 hover:underline hover:opacity-90"
								href="/2021"
							>
								2021
								<FiExternalLink className="ml-1 inline-block pb-1" />
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="mx-1 flex flex-col justify-center">
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
						<div className="mt-[2px] mr-[6px] leading-[1.1] sm:mt-[3px]">
							<span className="bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text font-medium text-transparent">
								2023
							</span>
							<br /> március{" "}
						</div>
						<span className="text-[56px] font-black leading-none">21</span>
					</h2>
					<div className="ml-[8px] mr-[10px] mt-[5px] mb-[10px] w-[2px] bg-konf-primary-blue" />
					<h3 className="mt-[2px] mr-1 leading-[1.1] sm:mt-[3px]">
						<span className="bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text font-medium text-transparent">
							BME
						</span>
						<br /> I épület
					</h3>
				</span>
			</div>
			<div className="mt-2">
				<CountdownTimer endDate="2023.03.21.08:00" />
			</div>
			<div className="my-16" />
		</div>
	);
}
