import * as Contentful from "contentful";
import { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeGalleryImagesFields {
    name: Contentful.EntryFields.Symbol;
    images: Contentful.Asset[];
    thumbnail: Contentful.Asset;
    year: Contentful.EntryFields.Symbol;
}

export type TypeGalleryImages = Contentful.Entry<TypeGalleryImagesFields>;
export type LocalizedTypeGalleryImagesFields<Locales extends keyof any> = LocalizedFields<TypeGalleryImagesFields, Locales>;
export type LocalizedTypeGalleryImages<Locales extends keyof any> = LocalizedEntry<TypeGalleryImages, Locales>;
