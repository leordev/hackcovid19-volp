import db, { insertDbRecord } from "../knex";

import { HelpStatus } from "./enums";
import { Coordinate } from "../utils/geoloc";
import { Address } from "./address";
import { User } from "./user";
import { PhoneNumber } from "./phone";

export interface HelpRequest {
    id: number;
    requester_id: number;
    address_id: number;
    description: string;
    offered_amount: number;
    helper_id: number;
    paid_amount: number;
    receipt: string;
    status: HelpStatus;
    created_at: Date;
    completed_at: Date;
}

export interface FullHelpRequest extends HelpRequest {
    requester: User;
    address: Address;
    requester_phones: PhoneNumber[];
    helper?: User;
    helper_phones: PhoneNumber[];
}

export type HelpRequestWithAddress = HelpRequest & Omit<Address, "id" | "type" | "entity_id">;

export type NewHelpRequest = Omit<HelpRequest, "id" | "created_at" | "completed_at">;

export const insertHelpRequest = async (record: NewHelpRequest): Promise<HelpRequest> => {
    return insertDbRecord("help_request", record);
};

export const getHelpRequestById = async (id: number): Promise<HelpRequest | undefined> => {
    return await db.from("help_request").select("*").where("id", id).first();
};

export const updateHelpRequest = async (record: HelpRequest): Promise<void> => {
    await db.from("help_request").where("id", record.id).update(record);
};

export const findHelpRequestsForRequester = async (requesterId: number): Promise<HelpRequest[]> => {
    return await db.from("help_request").select("*").where("requester_id", requesterId);
};

export const findHelpRequestsForHelper = async (helperId: number): Promise<HelpRequest[]> => {
    return await db.from("help_request").select("*").where("helper_id", helperId);
};

export const findHelpRequestsInRegion = async (
    startCoordinate: Coordinate,
    endCoordinate: Coordinate,
    status: HelpStatus,
): Promise<HelpRequestWithAddress[] | undefined> => {
    return await db
        .from("help_request")
        .join("address", "address.id", "help_request.address_id")
        .select(
            "help_request.id",
            "help_request.requester_id",
            "help_request.address_id",
            "help_request.description",
            "help_request.offered_amount",
            "help_request.helper_id",
            "help_request.paid_amount",
            "help_request.receipt",
            "help_request.status",
            "help_request.created_at",
            "help_request.completed_at",
            "address.latitude",
            "address.longitude",
            "address.address1",
            "address.address2",
            "address.city",
            "address.state",
            "address.zip_code",
            "address.country",
        )
        .where("status", status)
        .whereBetween("latitude", [startCoordinate.latitude, endCoordinate.latitude])
        .whereBetween("longitude", [startCoordinate.longitude, endCoordinate.longitude]);
};
