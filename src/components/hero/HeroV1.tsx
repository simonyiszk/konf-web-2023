import Link from "next/link";

import styles from "./HeroV1.module.scss";

export function HeroV1() {
	return (
		<div className={styles.heroV1}>
			<div>
				<h1 className="mx-1 my-8 text-center text-5xl font-bold">
					Hamarosan...
				</h1>
				<p className="my-4 text-center text-xl">
					Addig is tekintsd meg a korábbi konferenciáinkat:
				</p>
				<ul className="my-2 flex flex-row justify-evenly text-lg ">
					<li>
						<Link
							className="opacity-70 hover:underline hover:opacity-90"
							href="/2022"
						>
							2022
						</Link>
					</li>
					<li>
						<Link
							className="opacity-70 hover:underline hover:opacity-90"
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
