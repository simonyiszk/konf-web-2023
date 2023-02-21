import type * as Contentful from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";
import type { TypeSponsorLogoFields } from "./TypeSponsorLogo";

export interface TypePresentationFields {
    room?: "IB025" | "IB028";
    title: Contentful.EntryFields.Symbol;
    name: Contentful.EntryFields.Symbol;
    profession: Contentful.EntryFields.Symbol;
    startDate: Contentful.EntryFields.Date;
    endDate: Contentful.EntryFields.Date;
    image: Contentful.Asset;
    description: Contentful.EntryFields.Text;
    videoLink?: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    sponsorLogo?: Contentful.Entry<TypeSponsorLogoFields>;
}

export type TypePresentation = Contentful.Entry<TypePresentationFields>;
export type LocalizedTypePresentationFields<Locales extends keyof any> = LocalizedFields<TypePresentationFields, Locales>;
export type LocalizedTypePresentation<Locales extends keyof any> = LocalizedEntry<TypePresentation, Locales>;
