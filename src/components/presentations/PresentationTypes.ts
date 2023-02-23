import type { TypePresentationFields } from "@/@types/generated";

export type PresentationPreviewType = Pick<TypePresentationFields, "title"> & {
	href: string;
};
