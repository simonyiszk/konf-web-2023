import type { Asset, Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeSponsorLogoFields {
    name: EntryFields.Symbol;
    link?: EntryFields.Symbol;
    sponsorshipGrade: "főtámogató" | "kiemelt támogató" | "támogató";
    image: Asset;
}

export type TypeSponsorLogo = Entry<TypeSponsorLogoFields>;
export type LocalizedTypeSponsorLogoFields<Locales extends keyof any> = LocalizedFields<TypeSponsorLogoFields, Locales>;
export type LocalizedTypeSponsorLogo<Locales extends keyof any> = LocalizedEntry<TypeSponsorLogo, Locales>;
