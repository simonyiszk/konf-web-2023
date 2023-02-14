import type * as Contentful from "contentful";

export interface TypePresentationFields {
    room: Contentful.EntryFields.Symbol;
    title: Contentful.EntryFields.Symbol;
    name: Contentful.EntryFields.Symbol;
    profession: Contentful.EntryFields.Symbol;
    startDate: Contentful.EntryFields.Date;
    endDate: Contentful.EntryFields.Date;
    image: Contentful.Asset;
    description: Contentful.EntryFields.Text;
    videoLink?: Contentful.EntryFields.Symbol;
}

export type TypePresentation = Contentful.Entry<TypePresentationFields>;
