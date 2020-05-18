import { EntityType } from "./enums";
import db, { insertDbRecord } from "../knex";

export interface Address {
    id: number;
    type: EntityType;
    entity_id: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    latitude: number;
    longitude: number;
}

export type NewAddress = Omit<Address, "id">;

export const insertAddress = async (record: NewAddress): Promise<Address> => {
    return insertDbRecord("address", record);
};

export const getAddressById = async (id: number): Promise<Address | undefined> => {
    return await db.from("address").select("*").where("id", id).first();
};

export const findAddressesForEntity = async (type: EntityType, id: number): Promise<Address[] | undefined> => {
    return await db.from("address").select("*").where("type", type).where("entity_id", id);
};
