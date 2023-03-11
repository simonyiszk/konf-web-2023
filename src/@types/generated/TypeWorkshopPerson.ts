import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeWorkshopPersonFields {
    name: EntryFields.Symbol;
    image: Asset;
    title?: EntryFields.Symbol;
}

export type TypeWorkshopPerson = Entry<TypeWorkshopPersonFields>;
