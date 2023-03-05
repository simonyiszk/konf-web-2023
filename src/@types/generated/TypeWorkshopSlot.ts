import type { Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeWorkshopSlotFields {
    name?: EntryFields.Symbol;
    startDate: EntryFields.Date;
    endDate: EntryFields.Date;
    room: EntryFields.Symbol;
}

export type TypeWorkshopSlot = Entry<TypeWorkshopSlotFields>;
export type LocalizedTypeWorkshopSlotFields<Locales extends keyof any> = LocalizedFields<TypeWorkshopSlotFields, Locales>;
export type LocalizedTypeWorkshopSlot<Locales extends keyof any> = LocalizedEntry<TypeWorkshopSlot, Locales>;
