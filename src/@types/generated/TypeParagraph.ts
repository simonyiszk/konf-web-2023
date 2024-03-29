import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeParagraphFields {
    id: EntryFields.Symbol;
    name: EntryFields.Symbol;
    content: EntryFields.Text;
    image?: Asset;
    video?: EntryFields.Symbol;
    mediaSide?: "left" | "right";
}

export type TypeParagraph = Entry<TypeParagraphFields>;
