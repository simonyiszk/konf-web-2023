import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import type { TypePresentationFields } from "@/@types/generated";

export function SlugLink({ slug }: { slug: string }) {
	return (
		<Link
			href={`/eloadasok/${slug}`}
			className={clsx(
				"bg-gradient-to-r from-konf-primary-blue to-konf-primary-green bg-clip-text text-2xl font-bold text-transparent",
				"group transition-all duration-200 hover:text-konf-accent-yellow",
			)}
		>
			További részletek{" "}
			<FaArrowRight className=" inline-block pb-1 text-white transition-all group-hover:text-konf-accent-yellow" />{" "}
		</Link>
	);
}

export function CharlesSection({
	image,
	slug,
}: Pick<TypePresentationFields, "slug" | "image">) {
	return (
		<section id="charles" className="container mx-auto px-4">
			<div className="backdrop-blur-safari mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 rounded-2xl bg-white/10 px-8 py-10 backdrop-blur sm:flex-row">
				<div className="order-2 col-span-3 sm:order-1">
					<h2
						className={clsx(
							"text-4xl font-bold",
							"bg-gradient-to-r bg-clip-text text-transparent",
							"from-konf-primary-blue to-konf-primary-green",
							"animate-text",
							"mb-5",
						)}
					>
						Online beszélgetés <span>Charles Simonyival</span>
					</h2>
					<div className="text-2xl">
						<p className="mb-4">
							Kíváncsi vagy, hogyan jutott el Charles Simonyi Budapestről a
							Szilícium-völgyön át egészen a világűrig?
						</p>
						<p className="mb-4">
							Nézd meg a Simonyi Károly Szakkollégium tagjai által készített
							online interjút a híres magyar űrutazóval, és sok más érdekesség
							mellett erre is választ kaphatsz!
						</p>
						<p className="mb-4">
							A beszélgetés angol nyelvű, magyarul feliratozva.
						</p>
					</div>
					<SlugLink slug={slug} />
				</div>
				<div
					className={clsx(
						"order-1 sm:order-2",
						"aspect-1 w-full shrink-0 overflow-hidden rounded-full sm:h-[250px] sm:w-[250px] lg:h-[350px] lg:w-[350px]",
						"bg-gradient-to-r from-konf-primary-blue/80 to-konf-primary-green/80",
					)}
				>
					<div className="relative h-full w-full">
						<Image
							src={image.fields.file ? `https:${image.fields.file.url}` : ""}
							alt="Charles Simonyi"
							fill
							className={clsx("object-contain")}
							draggable={false}
							unoptimized
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
