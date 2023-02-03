import { createClient } from "contentful";
import { serialize } from "next-mdx-remote/serialize";

import type {
	TypeGalleryImagesFields,
	TypeParagraphFields,
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

export async function getGalleryImages() {
	const gallery = await client.getEntries<TypeGalleryImagesFields>({
		content_type: "galleryImages",
		order: "-fields.year",
	});
	return gallery.items.map((item) => item.fields);
}
