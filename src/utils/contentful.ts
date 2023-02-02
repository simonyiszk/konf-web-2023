import { createClient } from "contentful";
import { serialize } from "next-mdx-remote/serialize";

import type {
	TypeParagraphFields,
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
