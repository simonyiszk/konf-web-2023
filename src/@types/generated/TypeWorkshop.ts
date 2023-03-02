import type { Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";
import type { TypeWorkshopPersonFields } from "./TypeWorkshopPerson";

export interface TypeWorkshopFields {
    variant: "gile" | "ipar4.0" | "schdesign";
    name?: EntryFields.Symbol;
    title: EntryFields.Symbol;
    description: EntryFields.Text;
    room: EntryFields.Symbol;
    startDate: EntryFields.Date;
    endDate: EntryFields.Date;
    presenter?: Entry<TypeWorkshopPersonFields>[];
}

export type TypeWorkshop = Entry<TypeWorkshopFields>;
export type LocalizedTypeWorkshopFields<Locales extends keyof any> = LocalizedFields<TypeWorkshopFields, Locales>;
export type LocalizedTypeWorkshop<Locales extends keyof any> = LocalizedEntry<TypeWorkshop, Locales>;
