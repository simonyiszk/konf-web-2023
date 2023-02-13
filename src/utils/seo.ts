import type { Event } from "schema-dts";

type StructuredDataDTO = {
	title?: string;
	description: string;
	startDate: Date;
	endDate: Date;
	sponsors: {
		name: string;
		website: string;
	}[];
	speakers: {
		name: string;
	}[];
};

export function generateStructuredData({
	title,
	description,
	startDate,
	endDate,
	sponsors,
}: StructuredDataDTO): Event {
	return {
		"@type": "Event",
		name: title ?? "Simonyi Konferencia 2023",
		description,
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
		organizer: {
			"@type": "Organization",
			name: "Simonyi Károly Szakkollégium",
		},
		typicalAgeRange: "18-",
		location: {
			"@type": "PostalAddress",
			addressCountry: "HU",
			postalCode: "1117",
			streetAddress: "Magyar Tudósok Körútja 2",
			addressLocality: "Budapest",
		},
		sponsor: sponsors.map(({ name, website }) => ({
			"@type": "Organization",
			name,
			url: website,
		})),
	};
}
