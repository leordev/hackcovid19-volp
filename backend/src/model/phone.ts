import { EntityType } from "./enums";
import db, { insertDbRecord } from "../knex";

export interface PhoneNumber {
    id: number;
    type: EntityType;
    entity_id: number;
    phone: string;
}

export type NewPhoneNumber = Omit<PhoneNumber, "id">;

export const insertPhone = async (record: NewPhoneNumber): Promise<PhoneNumber> => {
    return insertDbRecord("phone_number", record);
};

export const findPhoneByNumber = async (phone: string): Promise<PhoneNumber | undefined> => {
    return await db.from("phone_number").select("*").where("phone", phone).first();
};

export const findPhonesForEntity = async (type: EntityType, id: number): Promise<PhoneNumber[]> => {
    return await db.from("phone_number").select("*").where("type", type).where("entity_id", id);
};
