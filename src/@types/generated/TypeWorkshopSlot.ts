import type { Entry, EntryFields } from "contentful";

export interface TypeWorkshopSlotFields {
    name?: EntryFields.Symbol;
    startDate: EntryFields.Date;
    endDate: EntryFields.Date;
    room: EntryFields.Symbol;
}

export type TypeWorkshopSlot = Entry<TypeWorkshopSlotFields>;
