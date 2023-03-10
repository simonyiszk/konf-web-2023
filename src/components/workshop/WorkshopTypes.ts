import type { TypeWorkshopFields } from "@/@types/generated";

export type WorkshopVariantType = TypeWorkshopFields["variant"];

export const localizedTimeOptions: Intl.DateTimeFormatOptions = {
	hour: "2-digit",
	minute: "2-digit",
};
