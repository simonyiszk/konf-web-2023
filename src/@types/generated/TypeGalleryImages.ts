import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeGalleryImagesFields {
    name: EntryFields.Symbol;
    images: Asset[];
    thumbnail: Asset;
    year: EntryFields.Symbol;
}

export type TypeGalleryImages = Entry<TypeGalleryImagesFields>;
