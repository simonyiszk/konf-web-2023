import * as Contentful from "contentful";

export interface TypeSponsorLogoFields {
    name: Contentful.EntryFields.Symbol;
    link?: Contentful.EntryFields.Symbol;
    sponsorshipGrade: "főtámogató" | "kiemelt támogató" | "támogató";
    image: Contentful.Asset;
}

export type TypeSponsorLogo = Contentful.Entry<TypeSponsorLogoFields>;
