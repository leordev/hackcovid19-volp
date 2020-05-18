import db, { insertDbRecord } from "../knex";

export interface FcmKey {
    id: number;
    token: string;
    source: "WEB" | "IOS" | "ANDROID";
    user_id: number;
    created_at: Date;
    updated_at: Date;
}

export type NewFcmKey = Omit<FcmKey, "id" | "created_at" | "updated_at">;

export const insertOrUpdateFCM = async (record: NewFcmKey): Promise<FcmKey> => {
    const fcm: FcmKey | undefined = await db
        .from("fcm_key")
        .select("*")
        .where({
            user_id: record.user_id,
            source: record.source,
        })
        .first();

    if (!!fcm) {
        fcm.token = record.token;

        await db
            .from("fcm_key")
            .where({
                user_id: record.user_id,
                source: record.source,
            })
            .update({
                token: record.token,
                updated_at: new Date(),
            });
        return fcm;
    }

    return insertDbRecord("fcm_key", record);
};

export const findFcmKeyByToken = async (token: string): Promise<FcmKey | undefined> => {
    return await db.from("fcm_key").select("*").where("token", token).first();
};

export const findFcmKeysByUserId = async (user_id: number): Promise<FcmKey[]> => {
    return await db.from("fcm_key").select("*").where("user_id", user_id);
};
