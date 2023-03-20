import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import { Highlighted } from "@/components/highlight/Highlighted";

import styles from "./GiveawaySection.module.scss";

const budsBlurhash =
	"data:image/webp;base64,UklGRvgDAABXRUJQVlA4WAoAAAAgAAAAXQEAXQEAVlA4INoDAABwMwCdASpeAV4BPvl2tFWqpqSjInB6YVAfCWlu3tJmT9H+pkwmjBIk9Zq5vcg/v/9ABRO3cIytbege/QEp7NO3Pas/vhjvwKbvCnwBZUMX7aq7L2N/7PdB8AocDb5T6PQ9H4F+APAcW/6gD/DMJEtJIOiym6EuYVwBn/NC+VdjlevJe6W4B33XCsCb2xOnU6vMrU76rw8pRK1qkDJmIipvOZXv0cQ+yduofLcdPnIQg3KE1sqQOyyDYsEd2KJeHOdzFg0BjK9+jDDLfpn4vUScnCIYRi/O7vo8DJyWOfPGsQcwuPzWVY2E6ZnhA2YDo3gH0fKDQ13PiiKqj4zJFTPnJ463Y+fUxUyEAgn7OieMt8gwC2YNoPay/e7nKgSbnO98goeZ1+x5WgLbCMtlfo6XvksPmZjn1rYFB55lNRLOWwCKkXpopy/wJmJzTmlxrVRfhQCUkdZOff3WtunB6i8lQ2gWUUHWJZxgEADL00EfuZp9j2xzikOAG+ZhxB/hCb6n+jd/fS/u910+BC9NCdzpG1qBq2DsjVC1CR5zENogRijVtQAA/hX/AnfrzJYH/X37s/dm7T8qVRX7p2fR3cSj4nhHhZVaX/H/vlxpTHcr1Zj/aCU79Tb4zgekf7ohIguiHn4TnfEKkzRgJQP5PKqqqteHLVauXwMVbMlacAcNCtjDgjwEXaV35p4YeiGLsPF6DH0QKGR6L+HvNJOw8p21YnCvLI72iAKaGfBYB2lICBmA8AsPF9lPiJC0l5m3VfAReWRK7q6lRALmRMwHSd5VYiXScbyaHAyFYdShMaE65RB8Unf/TXgmJEPWU6HQ0Vj+8VLM7ojpCBGm5mUxFvyOT5z/+41WhtVkxQCXC4gGZWP2GJzlMC+2PaU8w0jR4fTguSwbdnUZUhLPGoo1NHvQlqRKnQxNWq24rPDXtLhLJT5SipKP8dZjMEkRqTgvLaIgV2Lu9ipPgbxOqCTP4QI+joN87NmlwPhVME2RTFRngHIgIP8f8tEQVNPiOKj/c88B6q8t6WY3ppwLHGxF48CYRDqoxw2a8D+0NSyNOIUWpbedA9LsWIXiwSwenj4HPt7NPHSuH9WOvwkAm2K/wq/7pbhIHsCrn5SaIA/LmBAb33YoL+AtQcZHCsm/xTCGKO2rh2+gfDCqOKa4bHehlFC2wZdT+wj7/pvMV1d1cfYb3DVu2aLdh+ERNKGSp2C+BgJB/S0bfqVXuYMKC9f34zoYv6VQ6C3ogm18uBbRDDpDr5wP5jpTt+ppl1CGefp48iesjZpMI5f1bn/BHgJk94AxYot+t6N6kAAAAA==";

function LinkWrapper(
	props: DetailedHTMLProps<
		HTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>,
) {
	const { children } = props;
	return (
		<a
			href="https://www.samsung.com/global/galaxy/galaxy-buds2-pro/"
			className={clsx(
				"bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text font-bold text-transparent",
				"group transition-all duration-200 hover:text-konf-accent-yellow",
			)}
			target="_blank"
			rel="noreferrer"
			{...props}
		>
			{children}
			<FiExternalLink className="ml-1 inline-block pb-1 text-white transition-all group-hover:text-konf-accent-yellow" />
		</a>
	);
}

export function GiveawaySection({
	showDetailsLink,
}: {
	showDetailsLink?: boolean;
}) {
	const { t, i18n } = useTranslation("common");

	const [counter, setCounter] = React.useState(0);
	const [isAnimating, setIsAnimating] = React.useState(false);

	const incrementCounter = () => {
		setCounter(counter + 1);
		if (counter % 3 === 0) {
			setIsAnimating(true);
		}
	};

	return (
		<section id="nyeremenyjatek" className="container mx-auto px-4">
			<div className="backdrop-blur-safari mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 rounded-2xl bg-white/10 px-8 py-10 backdrop-blur sm:flex-row">
				<div
					className={clsx(
						"aspect-1 w-full shrink-0 rounded-full sm:h-[250px] sm:w-[250px] lg:h-[350px] lg:w-[350px]",
						"bg-gradient-to-r from-konf-primary-blue/80 to-konf-primary-green/80",
					)}
				>
					<div className="relative h-full w-full">
						<Image
							src="/assets/images/buds_2.png"
							alt="Galaxy Buds 2"
							fill
							blurDataURL={budsBlurhash}
							placeholder="blur"
							className={clsx(
								"scale-110 cursor-pointer rounded-full object-contain transition duration-200 hover:scale-125",
								isAnimating && styles["rotate-once"],
							)}
							draggable={false}
							onClick={incrementCounter}
							onAnimationEnd={() => setIsAnimating(false)}
							unoptimized
						/>
					</div>
				</div>
				<div className="flex max-w-xl flex-col justify-center gap-4">
					<h2 className="bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text text-4xl font-bold text-transparent">
						<Highlighted
							text={t("raffle.items.title")}
							highlight={i18n.language === "hu" ? "és" : "and"}
							className="text-white"
						/>
					</h2>
					<p className="text-2xl">
						<Highlighted
							text={t("raffle.items.registrated")}
							highlight="Samsung Galaxy Buds 2 Pro"
							wrapper={LinkWrapper}
						/>
					</p>
					<p className="text-2xl">{t("raffle.items.attendance")}</p>
					{showDetailsLink && (
						<Link
							href="/nyeremenyjatek"
							className={clsx(
								"bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text text-2xl font-bold text-transparent",
								"group transition-all duration-200 hover:text-konf-accent-yellow",
							)}
						>
							További részletek{" "}
							<FaArrowRight className=" inline-block pb-1 text-white transition-all group-hover:text-konf-accent-yellow" />{" "}
						</Link>
					)}
				</div>
			</div>
		</section>
	);
}
