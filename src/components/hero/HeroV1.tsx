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
								className="whitespace-nowrap p-2 pl-0 hover:underline hover:opacity-75"
								href="/2022"
							>
								2022
								<FiExternalLink className="ml-1 inline-block pb-1" />
							</Link>
						</li>
						<li>
							<Link
								className="whitespace-nowrap p-2 hover:underline hover:opacity-75"
								href="/2021"
							>
								2021
								<FiExternalLink className="ml-1 inline-block pb-1" />
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="mx-1 mt-16 flex flex-col justify-center sm:mt-0">
				<div className="aspect-w-16 aspect-h-7 relative mb-6 w-[252px] sm:mx-28 sm:-mb-6 sm:w-[276px]">
					<Image
						src="/favicon.svg"
						alt="XX. Simonyi Konferencia logó"
						className=""
						fill
						priority
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
							<span className="blue-green-gradient gradient-on-text font-medium">
								2023
							</span>
							<br /> március{" "}
						</div>
						<span className="text-[56px] font-black leading-none">21</span>
					</h2>
					<div className="ml-[8px] mr-[10px] mt-[5px] mb-[10px] w-[2px] bg-konf-primary-blue" />
					<h3 className="mt-[2px] mr-1 leading-[1.1] sm:mt-[3px]">
						<span className="blue-green-gradient gradient-on-text font-medium">
							BME
						</span>
						<br /> I épület
					</h3>
				</span>
			</div>
			<div className="mt-2">
				<CountdownTimer endDate="2023-03-21T08:00:00.000+02:00" />
			</div>
			<div className="my-16 mx-8 w-full sm:self-start">
				<ul className="flex flex-row justify-center gap-8 sm:justify-start">
					<li>
						<a
							className="hover:opacity-75"
							href="https://instagram.com/simonyikonf"
						>
							<Image
								src="/assets/icon/ig.svg"
								alt="Simonyi Konferencia Instagram"
								width={40}
								height={40}
							/>
						</a>
					</li>
					<li>
						<a
							className="hover:opacity-75"
							href="https://instagram.com/simonyikonf"
						>
							<Image
								src="/assets/icon/fb.svg"
								alt="Simonyi Konferencia Facebook"
								width={40}
								height={40}
							/>
						</a>
					</li>
					<li>
						<a
							className="hover:opacity-75"
							href="https://instagram.com/simonyikonf"
						>
							<Image
								src="/assets/icon/yt.svg"
								alt="Simonyi Konferencia YouTube"
								width={40}
								height={40}
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
