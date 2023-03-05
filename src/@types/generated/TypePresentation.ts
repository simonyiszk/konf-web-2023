import type { Asset, Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";
import type { TypeSponsorLogoFields } from "./TypeSponsorLogo";

export interface TypePresentationFields {
    room?: "IB025" | "IB028";
    title: EntryFields.Symbol;
    name: EntryFields.Symbol;
    profession?: EntryFields.Symbol;
    startDate: EntryFields.Date;
    endDate: EntryFields.Date;
    image: Asset;
    description: EntryFields.Text;
    videoLink?: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    sponsorLogo?: Entry<TypeSponsorLogoFields>;
}

export type TypePresentation = Entry<TypePresentationFields>;
export type LocalizedTypePresentationFields<Locales extends keyof any> = LocalizedFields<TypePresentationFields, Locales>;
export type LocalizedTypePresentation<Locales extends keyof any> = LocalizedEntry<TypePresentation, Locales>;
