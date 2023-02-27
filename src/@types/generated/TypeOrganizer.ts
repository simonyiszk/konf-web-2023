import type { Asset, Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeOrganizerFields {
    name: EntryFields.Symbol;
    title: EntryFields.Symbol;
    email: EntryFields.Symbol;
    image: Asset;
    order: EntryFields.Integer;
}

export type TypeOrganizer = Entry<TypeOrganizerFields>;
export type LocalizedTypeOrganizerFields<Locales extends keyof any> = LocalizedFields<TypeOrganizerFields, Locales>;
export type LocalizedTypeOrganizer<Locales extends keyof any> = LocalizedEntry<TypeOrganizer, Locales>;
