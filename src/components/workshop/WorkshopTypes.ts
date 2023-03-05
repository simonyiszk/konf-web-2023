import type { Asset } from "contentful";

import type {
	LocalizedEntry,
	TypeWorkshopFields,
	TypeWorkshopPersonFields,
} from "@/@types/generated";

export type WorkshopVariantType = TypeWorkshopFields["variant"];
export type RemappedWorkshopPresenter = Omit<
	TypeWorkshopPersonFields,
	"image"
> & {
	image: LocalizedEntry<Asset, "en" | "hu">;
};
export type RemappedWorkshop = Omit<TypeWorkshopFields, "image"> & {
	image?: LocalizedEntry<Asset, "en" | "hu">;
};

export const localizedTimeOptions: Intl.DateTimeFormatOptions = {
	hour: "2-digit",
	minute: "2-digit",
};
