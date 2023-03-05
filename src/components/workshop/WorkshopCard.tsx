import type { Asset } from "contentful";
import { useTranslation } from "next-i18next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type {
	LocalizedEntry,
	LocalizedTypeWorkshopFields,
	LocalizedTypeWorkshopPersonFields,
	TypeWorkshopFields,
} from "@/@types/generated";
import { EVENTBRITE_LINK } from "@/utils/constants";

import { TextButton } from "../button/TextButton";
import { components } from "../mdx/MDXComponents";
import { WorkshopCardBase } from "./WorkshopCardBase";
import { WorkshopCardSchdesignSection } from "./WorkshopCardSchdesignSection";
import { headerVariants } from "./WorkshopHeader";
import {
	localizedTimeOptions,
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

	return (
		<WorkshopCardBase
			header={headerVariants[localized.variant]({
				company: localized.company,
				name: localized.name ?? presenters[0]?.name,
				place: localized.room,
				time: `${new Date(localized.startDate).toLocaleTimeString(
					"hu",
					localizedTimeOptions,
				)} - ${new Date(localized.endDate).toLocaleTimeString(
					"hu",
					localizedTimeOptions,
				)}`,
			})}
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

			<TextButton text="regisztráció" href={EVENTBRITE_LINK} className="mt-4" />
		</WorkshopCardBase>
	);
}
