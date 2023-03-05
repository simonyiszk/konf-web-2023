import type { Asset, Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeWorkshopPersonFields {
    name: EntryFields.Symbol;
    image: Asset;
    title?: EntryFields.Symbol;
}

export type TypeWorkshopPerson = Entry<TypeWorkshopPersonFields>;
export type LocalizedTypeWorkshopPersonFields<Locales extends keyof any> = LocalizedFields<TypeWorkshopPersonFields, Locales>;
export type LocalizedTypeWorkshopPerson<Locales extends keyof any> = LocalizedEntry<TypeWorkshopPerson, Locales>;
