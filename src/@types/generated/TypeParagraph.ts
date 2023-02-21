import type * as Contentful from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeParagraphFields {
    name: Contentful.EntryFields.Symbol;
    content: Contentful.EntryFields.Text;
    image?: Contentful.Asset;
    video?: Contentful.EntryFields.Symbol;
    mediaSide?: "left" | "right";
}

export type TypeParagraph = Contentful.Entry<TypeParagraphFields>;
export type LocalizedTypeParagraphFields<Locales extends keyof any> = LocalizedFields<TypeParagraphFields, Locales>;
export type LocalizedTypeParagraph<Locales extends keyof any> = LocalizedEntry<TypeParagraph, Locales>;
