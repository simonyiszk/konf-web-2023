import type * as Contentful from "contentful";

export interface TypeParagraphFields {
    name: Contentful.EntryFields.Symbol;
    content: Contentful.EntryFields.Text;
    image?: Contentful.Asset;
    video?: Contentful.EntryFields.Symbol;
    mediaSide?: "left" | "right";
}

export type TypeParagraph = Contentful.Entry<TypeParagraphFields>;
