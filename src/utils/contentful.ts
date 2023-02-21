import { createClient } from "contentful";
import { serialize } from "next-mdx-remote/serialize";

import type {
	LocalizedTypePresentation,
	TypeGalleryImagesFields,
	TypeParagraphFields,
	TypePresentationFields,
	TypeSponsorLogoFields,
} from "@/@types/generated/index";

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID ?? "ErrorNoSpaceID",
	accessToken:
		(process.env.VERCEL_ENV === "production"
			? process.env.CONTENTFUL_ACCESS_TOKEN
			: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) ?? "ErrorNoAccessToken",
	host:
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
	});

	const bronzeSponsors = await client.getEntries<TypeSponsorLogoFields>({
		content_type: "sponsorLogo",
		"fields.sponsorshipGrade[in]": "támogató",
	});

	return { goldSponsor, silverSponsors, bronzeSponsors };
}

export type ReturnTypeSponsors = Awaited<ReturnType<typeof getSponsors>>;

export async function getPresentations() {
	const presentations =
		await client.withAllLocales.getEntries<TypePresentationFields>({
			content_type: "presentation",
		});
	return presentations;
}

export type ReturnTypePresentations = Awaited<
	ReturnType<typeof getPresentations>
>;

export async function getPresentation(slug: string) {
	const presentation =
		await client.withAllLocales.getEntries<TypePresentationFields>({
			content_type: "presentation",
			"fields.slug": slug,
			limit: 1,
		});

	console.log(slug);
	console.log(presentation);

	/* return (
		(presentation.items as LocalizedTypePresentation<"hu" | "en">[]).find(
			(e) => e.fields.slug?.hu === slug,
		) ?? null
	); */

	return presentation.items[0] ?? null;
}
