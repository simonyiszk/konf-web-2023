import clsx from "clsx";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type {
	TypeWorkshopFields,
	TypeWorkshopPersonFields,
} from "@/@types/generated";
import { EVENTBRITE_LINK } from "@/utils/constants";

import { TextButton } from "../button/TextButton";
import { components } from "../mdx/MDXComponents";
import { WorkshopCardBase } from "./WorkshopCardBase";
import { WorkshopCardSchdesignSection } from "./WorkshopCardSchdesignSection";
import { WorkshopPlace, WorkshopTimeRange } from "./WorkshopElements";

type WorkshopCardProps = {
	workshop: TypeWorkshopFields;
	mdxSource: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
};

const workshopRenderComponents = {
	...components,
	p: (
		props: React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLParagraphElement>,
			HTMLParagraphElement
		>,
	) => <p className="text-lg md:text-xl" {...props} />,
	ul: (
		props: React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLUListElement>,
			HTMLUListElement
		>,
	) => <ul className="list-inside list-disc text-xl" {...props} />,
	a: (
		props: React.DetailedHTMLProps<
			React.AnchorHTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		>,
	) => (
		<a
			// eslint-disable-next-line tailwindcss/no-custom-classname
			className={clsx(
				"text-konf-accent-yellow underline",
				(process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
					process.env.VERCEL_ENV === "production") &&
					"unami--click--workshop-link",
			)}
			{...props}
			target="_blank"
			rel="noreferrer"
		>
			{props.children}
		</a>
	),
};

export function WorkshopCard({ workshop, mdxSource }: WorkshopCardProps) {
	const { title, variant, company, room, eventSlot, name, image, presenter } =
		workshop;

	const presenters: TypeWorkshopPersonFields[] =
		presenter?.map((p) => p.fields) ?? [];
	return (
		<WorkshopCardBase
			header={{
				company: company ?? "",
				name: name ?? "",
				place: room,
				time: {
					start: new Date(eventSlot[0].fields.startDate),
					end: new Date(eventSlot[0].fields.endDate),
				},
				variant,
			}}
			fullSizedImage={
				image?.fields.file?.url
					? {
							src: `https:${image.fields.file.url}`,
							alt: company ?? "",
					  }
					: undefined
			}
		>
			<h2 className="mb-8 text-3xl font-bold sm:text-3xl lg:text-5xl">
				{title}
			</h2>
			<MDXRemote {...mdxSource} components={workshopRenderComponents} />
			{variant === "schdesign" && (
				<WorkshopCardSchdesignSection presenters={presenters} />
			)}

			{variant === "ipar4.0" && (
				<>
					<span className="my-2 block text-3xl font-medium">
						Több időpontban is!
					</span>
					<div className="text-2xl">
						{eventSlot.map((slot) => {
							const start = new Date(slot.fields.startDate);
							const end = new Date(slot.fields.endDate);
							return (
								<li className="flex flex-row gap-2">
									<WorkshopPlace place={slot.fields.room} />
									<span className="select-none">|</span>
									<WorkshopTimeRange start={start} end={end} />
								</li>
							);
						})}
					</div>
				</>
			)}

			<TextButton
				text="Regisztráció"
				href={EVENTBRITE_LINK}
				className="mt-4"
				fullWidth
			/>
		</WorkshopCardBase>
	);
}
