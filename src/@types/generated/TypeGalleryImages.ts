import type * as Contentful from "contentful";

export interface TypeGalleryImagesFields {
    name: Contentful.EntryFields.Symbol;
    images: Contentful.Asset[];
}

export type TypeGalleryImages = Contentful.Entry<TypeGalleryImagesFields>;
