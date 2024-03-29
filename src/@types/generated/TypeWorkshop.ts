import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeWorkshopPersonFields } from "./TypeWorkshopPerson";
import type { TypeWorkshopSlotFields } from "./TypeWorkshopSlot";

export interface TypeWorkshopFields {
    variant: "gile" | "ipar4.0" | "schdesign";
    name?: EntryFields.Symbol;
    title: EntryFields.Symbol;
    description: EntryFields.Text;
    room: EntryFields.Symbol;
    startDate: EntryFields.Date;
    endDate: EntryFields.Date;
    presenter?: Entry<TypeWorkshopPersonFields>[];
    company?: EntryFields.Symbol;
    image?: Asset;
    eventSlot: Entry<TypeWorkshopSlotFields>[];
    order: EntryFields.Integer;
}

export type TypeWorkshop = Entry<TypeWorkshopFields>;
