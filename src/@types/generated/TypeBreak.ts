import type { Entry, EntryFields } from "contentful";

export interface TypeBreakFields {
    isDouble: EntryFields.Boolean;
    room?: "IB025" | "IB028";
    startDate: EntryFields.Date;
    endDate: EntryFields.Date;
    content: EntryFields.Text;
}

export type TypeBreak = Entry<TypeBreakFields>;
