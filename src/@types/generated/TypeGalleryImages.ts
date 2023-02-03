import type * as Contentful from "contentful";

export interface TypeGalleryImagesFields {
    name: Contentful.EntryFields.Symbol;
    images: Contentful.Asset[];
    thumbnail: Contentful.Asset;
    year: Contentful.EntryFields.Symbol;
}

export type TypeGalleryImages = Contentful.Entry<TypeGalleryImagesFields>;
