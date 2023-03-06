import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type {
	LocalizedTypeWorkshopFields,
	LocalizedTypeWorkshopPersonFields,
	LocalizedTypeWorkshopSlotFields,
	TypeWorkshopSlotFields,
} from "@/@types/generated";
import { EVENTBRITE_LINK } from "@/utils/constants";

import { TextButton } from "../button/TextButton";
import { components } from "../mdx/MDXComponents";
import { WorkshopCardBase } from "./WorkshopCardBase";
import { WorkshopCardSchdesignSection } from "./WorkshopCardSchdesignSection";
import { WorkshopPlace, WorkshopTimeRange } from "./WorkshopElements";
import type {
	RemappedWorkshop,
	RemappedWorkshopPresenter,
} from "./WorkshopTypes";

type WorkshopCardProps = {
	workshop: LocalizedTypeWorkshopFields<"en" | "hu">;
	mdxSource: {
		en: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
		hu: MDXRemoteSerializeResult<{ [key: string]: unknown }>;
	};
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
	const { i18n } = useTranslation("common");

	const localized = Object.fromEntries(
		Object.entries(workshop).map(([key, value]) => [
			key,
			value[i18n.language as "en" | "hu"] ?? value.hu,
		]),
	) as unknown as RemappedWorkshop;

	const localizedMdxSource = mdxSource[i18n.language as "en" | "hu"];

	const presenters =
		localized.presenter?.map((p) => {
			const fields = p.fields as LocalizedTypeWorkshopPersonFields<"hu" | "en">;
			return Object.fromEntries(
				Object.entries(fields).map(([key, value]) => [
					key,
					value[i18n.language as "en" | "hu"] ?? value.hu,
				]),
			) as unknown as RemappedWorkshopPresenter;
		}) ?? [];

	const eventSlots = localized.eventSlot.map((s) => {
		const fields = s.fields as LocalizedTypeWorkshopSlotFields<"hu" | "en">;
		return Object.fromEntries(
			Object.entries(fields).map(([key, value]) => [
				key,
				value[i18n.language as "en" | "hu"] ?? value.hu,
			]),
		) as unknown as TypeWorkshopSlotFields;
	});

	return (
		<WorkshopCardBase
			header={{
				company: localized.company ?? "",
				name: localized.name ?? "",
				place: localized.room,
				time: {
					start: new Date(eventSlots[0].startDate),
					end: new Date(eventSlots[0].endDate),
				},
				variant: localized.variant,
			}}
			fullSizedImage={
				localized.image?.fields.file?.hu?.url
					? {
							src: `https:${localized.image.fields.file.hu.url}`,
							alt: localized.company ?? "",
					  }
					: undefined
			}
		>
			<h2 className="mb-8 text-3xl font-bold sm:text-3xl lg:text-5xl">
				{localized.title}
			</h2>
			<MDXRemote
				{...localizedMdxSource}
				components={workshopRenderComponents}
			/>
			{localized.variant === "schdesign" && (
				<WorkshopCardSchdesignSection presenters={presenters} />
			)}

			{localized.variant === "ipar4.0" && (
				<>
					<span className="my-2 block text-3xl font-medium">
						Több időpontban is!
					</span>
					<div className="text-2xl">
						{eventSlots.map((slot) => {
							const start = new Date(slot.startDate);
							const end = new Date(slot.endDate);
							return (
								<li className="flex flex-row gap-2">
									<WorkshopPlace place={slot.room} />
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
