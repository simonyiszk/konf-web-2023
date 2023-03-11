import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeOrganizerFields {
    name: EntryFields.Symbol;
    title: EntryFields.Symbol;
    email: EntryFields.Symbol;
    image: Asset;
    order: EntryFields.Integer;
}

export type TypeOrganizer = Entry<TypeOrganizerFields>;
