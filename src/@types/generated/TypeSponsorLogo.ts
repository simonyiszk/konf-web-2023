import * as Contentful from "contentful";
import { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeSponsorLogoFields {
    name: Contentful.EntryFields.Symbol;
    link?: Contentful.EntryFields.Symbol;
    sponsorshipGrade: "főtámogató" | "kiemelt támogató" | "támogató";
    image: Contentful.Asset;
}

export type TypeSponsorLogo = Contentful.Entry<TypeSponsorLogoFields>;
export type LocalizedTypeSponsorLogoFields<Locales extends keyof any> = LocalizedFields<TypeSponsorLogoFields, Locales>;
export type LocalizedTypeSponsorLogo<Locales extends keyof any> = LocalizedEntry<TypeSponsorLogo, Locales>;
