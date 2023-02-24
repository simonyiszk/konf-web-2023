import type { Asset } from "contentful";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import type {
	LocalizedEntry,
	LocalizedFields,
	TypeOrganizerFields,
} from "@/@types/generated";

type OrganizerCardProps = {
	organizer: LocalizedFields<TypeOrganizerFields, "hu" | "en">;
};

export function OrganizerCard({ organizer }: OrganizerCardProps) {
	const { t, i18n } = useTranslation("common");

	const localized = Object.fromEntries(
		Object.entries(organizer).map(([key, value]) => [
			key,
			value[i18n.language as "en" | "hu"] ?? value.hu,
		]),
	) as unknown as Omit<TypeOrganizerFields, "image"> & {
		image: LocalizedEntry<Asset, "en" | "hu">;
	};

	const { name, title, email, image } = localized;

	return (
		<div className="w-[350px] overflow-hidden rounded-lg bg-white/10">
			<div className="relative mx-auto h-[300px] bg-gradient-to-b from-konf-primary-green to-transparent">
				<Image
					src={
						image.fields.file?.hu?.url
							? `https:${image.fields.file.hu.url}`
							: "http://placekitten.com/350/200"
					}
					fill
					className="w-[280px] select-none object-cover object-top"
					alt={name}
					draggable={false}
					sizes="(max-width: 640px) 100vw, 640px"
				/>
			</div>
			<div className="flex flex-col gap-2 p-5">
				<h2 className="text-center text-3xl font-bold">{name}</h2>
				<span className="block text-center text-2xl">{title}</span>
				<a
					className="inline text-center text-base text-konf-accent-yellow"
					href={`mailto:${email}`}
				>
					{email}
				</a>
			</div>
		</div>
	);
}
