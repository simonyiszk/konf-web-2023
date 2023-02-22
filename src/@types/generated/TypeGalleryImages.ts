import type { Asset, Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeGalleryImagesFields {
    name: EntryFields.Symbol;
    images: Asset[];
    thumbnail: Asset;
    year: EntryFields.Symbol;
}

export type TypeGalleryImages = Entry<TypeGalleryImagesFields>;
export type LocalizedTypeGalleryImagesFields<Locales extends keyof any> = LocalizedFields<TypeGalleryImagesFields, Locales>;
export type LocalizedTypeGalleryImages<Locales extends keyof any> = LocalizedEntry<TypeGalleryImages, Locales>;
