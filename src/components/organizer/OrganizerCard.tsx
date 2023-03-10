import Image from "next/image";

import type { TypeOrganizerFields } from "@/@types/generated";

type OrganizerCardProps = {
	organizer: TypeOrganizerFields;
};

export function OrganizerCard({ organizer }: OrganizerCardProps) {
	const { name, title, email, image } = organizer;

	return (
		<div className="w-full min-w-[320px] overflow-hidden rounded-lg bg-white/10 backdrop-blur">
			<div className="relative mx-auto aspect-1 bg-gradient-to-b from-konf-primary-green to-transparent">
				<Image
					src={
						image.fields.file?.url
							? `https:${image.fields.file.url}`
							: "http://placekitten.com/350/200"
					}
					fill
					className="w-[280px] select-none object-cover object-top"
					alt={name}
					draggable={false}
					sizes="(max-width: 640px) 100vw, 640px"
				/>
			</div>
			<div className="flex shrink grow flex-col gap-2 p-5">
				<h2 className="text-center text-3xl font-bold">{name}</h2>
				<span className="block text-center text-2xl">{title}</span>
				<a
					className="inline break-words text-center text-base text-konf-accent-yellow"
					href={`mailto:${email}`}
				>
					{email}
				</a>
			</div>
		</div>
	);
}
