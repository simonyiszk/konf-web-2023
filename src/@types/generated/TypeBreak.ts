import type { Entry, EntryFields } from "contentful";
import type { LocalizedEntry, LocalizedFields } from "./Localized";

export interface TypeBreakFields {
    isDouble: EntryFields.Boolean;
    room?: "IB025" | "IB028";
    startDate: EntryFields.Date;
    endDate: EntryFields.Date;
    content: EntryFields.Text;
}

export type TypeBreak = Entry<TypeBreakFields>;
export type LocalizedTypeBreakFields<Locales extends keyof any> = LocalizedFields<TypeBreakFields, Locales>;
export type LocalizedTypeBreak<Locales extends keyof any> = LocalizedEntry<TypeBreak, Locales>;
