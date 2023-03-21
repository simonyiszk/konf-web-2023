import clsx from "clsx";
import { useRef, useState } from "react";
import { MdLocationPin } from "react-icons/md";

import styles from "./Floorplan.module.scss";
import { Map } from "./Map";

const map = [
	"Regisztrációs pult",
	"Nova Services",
	"Kir-Dev",
	"Ipar 4.0 technológiai központ",
	"KUKA",
	"LEGO kör",
	"Zoosh",
	"Robert Bosch Kft.",
	"Schönherz Elektronikai Műhely",
	"Aliz",
	"ProDSP",
	"HA5KFU Rádióamatőr Klub",
	"ICF Tech",
	"Supercharge",
	"schdesign",
	"Nokia",
	"HVT",
	"A konferencia történelme",
	"Silicon Labs",
	"TMIT",
	"Schönherz iskolaszövetkezet",
	"Catering",
];

export function Floorplan() {
	const [active, setActive] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	return (
		<section className="container mx-auto max-w-4xl py-6 px-4 md:py-16">
			<h4
				className={clsx(
					"mb-4 pt-6 text-center text-4xl font-black md:text-6xl lg:col-span-2 lg:text-8xl",
					"bg-gradient-to-r bg-clip-text text-transparent",
					"from-konf-primary-blue to-konf-primary-green",
					"animate-text",
				)}
			>
				Térkép
			</h4>
			<div className="relative grid w-full grid-cols-1 gap-8 rounded-lg bg-white/10 p-4 backdrop-blur lg:grid-cols-[1fr_400px]">
				<ol className="list-decimal pl-8">
					{map.map((name, i) => {
						return (
							<li key={name} className="text-lg">
								<button
									type="button"
									className="group py-1 pl-1 text-left"
									onClick={() => {
										if (ref.current) {
											ref.current.scrollIntoView({
												behavior: "smooth",
												inline: "start",
											});
										}
										setActive(i + 1);
									}}
								>
									{name}
									<span>
										<MdLocationPin
											className={clsx(
												"inline pb-1  group-hover:text-konf-accent-yellow",
												active === i + 1
													? "text-konf-accent-yellow"
													: "text-white",
											)}
										/>
									</span>
								</button>
							</li>
						);
					})}
				</ol>
				<div className="pointer-events-none relative select-none">
					<div ref={ref} className={clsx(styles.scrollMargin)}>
						<Map active={active} />
					</div>
				</div>
			</div>
		</section>
	);
}
