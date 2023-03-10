import clsx from "clsx";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

import type { TypeWorkshopPersonFields } from "@/@types/generated";

import { Highlighted } from "../highlight/Highlighted";

function LinkWrapper(
	props: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>,
) {
	const { children } = props;
	return (
		<a
			href={
				process.env.VERCEL_ENV !== "production" ||
				process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
					? "https://schdesign.hu"
					: "https://schdesign.hu?utm_source=simonyi_konferencia&utm_medium=konf&utm_campaign=konf2023&utm_content=workshop"
			}
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

export function WorkshopCardSchdesignSection({
	presenters,
}: {
	presenters: TypeWorkshopPersonFields[];
}) {
	return (
		<div className="my-4">
			<span className="mb-3 block">
				<Highlighted
					highlight="schdesign"
					text="a workshopot az schdesign következő tagjai tartják:"
					wrapper={LinkWrapper}
				/>
			</span>
			<div
				className="grid gap-4"
				style={{
					gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
				}}
			>
				{presenters.map((p) => (
					<div key={p.name} className="">
						<div className="relative aspect-1">
							<Image
								src={
									p.image.fields.file ? `https:${p.image.fields.file.url}` : ""
								}
								fill
								draggable={false}
								alt={p.name}
								className="rounded-lg object-cover"
								sizes="(max-width: 768px) 50vw,
							(max-width: 1200px) 40vw,
							25vw"
							/>
						</div>
						<h3 className="mt-4 text-center">{p.name}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
