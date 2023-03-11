import { createClient } from "contentful";
import { serialize } from "next-mdx-remote/serialize";

import type {
	TypeBreakFields,
	TypeGalleryImagesFields,
	TypeOrganizer,
	TypeParagraphFields,
	TypePresentationFields,
	TypeSponsorLogoFields,
	TypeWorkshopFields,
} from "@/@types/generated/index";

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID ?? "ErrorNoSpaceID",
	accessToken:
		(process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
		process.env.VERCEL_ENV === "production"
			? process.env.CONTENTFUL_ACCESS_TOKEN
			: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) ?? "ErrorNoAccessToken",
	host:
		process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
		process.env.VERCEL_ENV === "production"
			? "cdn.contentful.com"
			: "preview.contentful.com",
}).withoutUnresolvableLinks;

export async function getParagraphs() {
	const paragraphs = await client.getEntries<TypeParagraphFields>({
		content_type: "paragraph",
		order: "fields.order",
	});

	const renderedParagraphs = await Promise.all(
		paragraphs.items.map(async (paragraph) => {
			const mdxSource = await serialize(paragraph.fields.content);
			return { mdxSource, ...paragraph };
		}),
	);

	return renderedParagraphs;
}

export type ReturnTypeParagraphs = Awaited<ReturnType<typeof getParagraphs>>;

export async function getGalleryImages() {
	const gallery = await client.getEntries<TypeGalleryImagesFields>({
		content_type: "galleryImages",
		order: "-fields.year",
	});
	return gallery.items.map((item) => item.fields);
}

export type ReturnTypeGalleryImages = Awaited<
	ReturnType<typeof getGalleryImages>
>;

export async function getSponsors() {
	const goldSponsor = (
		await client.getEntries<TypeSponsorLogoFields>({
			content_type: "sponsorLogo",
			"fields.sponsorshipGrade[in]": "főtámogató",
			limit: 1,
		})
	).items[0];

	const silverSponsors = await client.getEntries<TypeSponsorLogoFields>({
		content_type: "sponsorLogo",
		"fields.sponsorshipGrade[in]": "kiemelt támogató",
		order: "fields.name",
	});

	const bronzeSponsors = await client.getEntries<TypeSponsorLogoFields>({
		content_type: "sponsorLogo",
		"fields.sponsorshipGrade[in]": "támogató",
		order: "fields.name",
	});

	return { goldSponsor, silverSponsors, bronzeSponsors };
}
export type ReturnTypeSponsors = Awaited<ReturnType<typeof getSponsors>>;

export async function getPresentations() {
	const presentations = await client.getEntries<TypePresentationFields>({
		content_type: "presentation",
		order: "fields.name",
	});

	const renderedPresentations = await Promise.all(
		presentations.items.map(async (presentation) => {
			const mdxSource = await serialize(presentation.fields.description);

			return {
				mdxSource,
				...presentation,
			};
		}),
	);

	return renderedPresentations;
}
export type ReturnTypePresentations = Awaited<
	ReturnType<typeof getPresentations>
>;

export async function getPresentation({
	slug,
	presenter,
}: {
	slug?: string;
	presenter?: string;
}) {
	const presentation = await client.getEntries<TypePresentationFields>({
		content_type: "presentation",
		"fields.slug": slug,
		"fields.name": presenter,
		limit: 1,
	});

	const renderedPresentation = await Promise.all(
		presentation.items.map(async (p) => {
			const mdxSource = await serialize(p.fields.description);
			return {
				mdxSource,
				...p,
			};
		}),
	);

	return renderedPresentation[0] ?? undefined;
}
export type ReturnTypePresentation = Awaited<
	ReturnType<typeof getPresentation>
>;

export async function getOrganizers() {
	const organizers = await client.getEntries({
		content_type: "organizer",
		order: "fields.order",
	});

	return organizers.items as TypeOrganizer[];
}

export async function getWorkshops() {
	const workshops = await client.getEntries<TypeWorkshopFields>({
		content_type: "workshop",
		order: "fields.order",
		include: 2,
	});

	const renderedWorkshops = await Promise.all(
		workshops.items.map(async (ws) => {
			const mdxSource = await serialize(ws.fields.description);
			return {
				mdxSource,
				...ws,
			};
		}),
	);

	return renderedWorkshops;
}

export async function getBreaks() {
	const breaks = await client.getEntries<TypeBreakFields>({
		content_type: "break",
		order: "fields.startDate",
	});

	return breaks.items;
}
