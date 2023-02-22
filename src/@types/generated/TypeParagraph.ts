import type { Asset, Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeParagraphFields {
    name: EntryFields.Symbol;
    content: EntryFields.Text;
    image?: Asset;
    video?: EntryFields.Symbol;
    mediaSide?: "left" | "right";
}

export type TypeParagraph = Entry<TypeParagraphFields>;
export type LocalizedTypeParagraphFields<Locales extends keyof any> = LocalizedFields<TypeParagraphFields, Locales>;
export type LocalizedTypeParagraph<Locales extends keyof any> = LocalizedEntry<TypeParagraph, Locales>;
