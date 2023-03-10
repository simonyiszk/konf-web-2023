import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeSponsorLogoFields {
    name: EntryFields.Symbol;
    link?: EntryFields.Symbol;
    sponsorshipGrade: "főtámogató" | "kiemelt támogató" | "támogató";
    image: Asset;
}

export type TypeSponsorLogo = Entry<TypeSponsorLogoFields>;
