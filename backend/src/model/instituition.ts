import db, { insertDbRecord } from "../knex";
import { EntityType } from "./enums";
import { Coordinate } from "../utils/geoloc";

export interface Institution {
    id: number;
    name: string;
    unique_document: string;
    owner_id: number;
    description: string;
    bank_info: string;
    profile_picture: string;
    website_url: string;
    created_at: Date;
    /// TODO: picpay, pagseguro fields
}

export interface InstitutionPin {
    id: number;
    name: string;
    description: string;
    profile_picture: string;
    latitude: number;
    longitude: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}

// future feature :)
// export interface InstitutionVolunteers {
//     id: number;
//     institution_id: number;
//     user_id: number;
//     created_at: Date;
// }

export type NewInstitution = Omit<Institution, "id" | "created_at">;

export const insertInstitution = async (record: NewInstitution): Promise<Institution> => {
    return insertDbRecord("institution", record);
};

export const updateInstitution = async (record: Institution): Promise<void> => {
    await db.from("institution").where("id", record.id).update(record);
};

export const findInstitutionById = async (id: number): Promise<Institution> => {
    return await db.from("institution").select("*").where("id", id).first();
};

export const findInstitutionByOwnerId = async (ownerId: number): Promise<Institution | undefined> => {
    return await db.from("institution").select("*").where("owner_id", ownerId).first();
};

export const findInstitutionsInRegion = async (
    startCoordinate: Coordinate,
    endCoordinate: Coordinate,
): Promise<InstitutionPin[] | undefined> => {
    return await db
        .from("address")
        .join("institution", "address.entity_id", "institution.id")
        .select(
            "institution.id",
            "institution.name",
            "institution.description",
            "institution.profile_picture",
            "address.latitude",
            "address.longitude",
            "address.address1",
            "address.address2",
            "address.city",
            "address.state",
            "address.zip_code",
            "address.country",
        )
        .where("type", EntityType.Institution)
        .whereBetween("latitude", [startCoordinate.latitude, endCoordinate.latitude])
        .whereBetween("longitude", [startCoordinate.longitude, endCoordinate.longitude]);
};
