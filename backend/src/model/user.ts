import db, { insertDbRecord } from "../knex";

import { HealthStatus, EntityType } from "./enums";
import { Coordinate } from "src/utils/geoloc";

export interface User {
    id: number;
    name: string;
    birthdate: Date;
    email: string;
    unique_document: string;
    is_helper: boolean;
    profile_picture: string;
    created_at: Date;
}

export type NewUser = Omit<User, "id" | "created_at">;

export interface UserHealth {
    id: number;
    user_id: number;
    status: HealthStatus;
    reported_by_id: number;
    reported_at: Date;
}

export type NewUserHealth = Omit<UserHealth, "id" | "reported_at">;

export const insertUser = async (record: NewUser): Promise<User> => {
    return insertDbRecord("user", record);
};

export const updateUserHelperStatus = async (id: number, is_helper: boolean): Promise<void> => {
    await db.from("user").where("id", id).update({ is_helper });
};

export const insertUserHealth = async (record: NewUserHealth): Promise<UserHealth> => {
    return insertDbRecord("user_health", record);
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    return await db.from("user").select("*").where("email", email).first();
};

export const findUserById = async (id: number): Promise<User | undefined> => {
    return await db.from("user").select("*").where("id", id).first();
};

export const findHelpersInRegion = async (
    startCoordinate: Coordinate,
    endCoordinate: Coordinate,
    limit = 50,
): Promise<{ id: number }[]> => {
    return await db
        .from("address")
        .join("user", "address.entity_id", "user.id")
        .select("user.id")
        .where("type", EntityType.User)
        .where("is_helper", true)
        .whereBetween("latitude", [startCoordinate.latitude, endCoordinate.latitude])
        .whereBetween("longitude", [startCoordinate.longitude, endCoordinate.longitude])
        .limit(limit);
};
