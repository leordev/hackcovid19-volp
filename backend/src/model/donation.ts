import db, { insertDbRecord } from "../knex";

export interface Donation {
    id: number;
    donator_id: number;
    institution_id: number;
    message: string;
    service: string;
    amount: number;
    receipt: string;
    is_valid: boolean;
    created_at: Date;
    /// TODO: integrate with payment gateways? picpay, pagseguro
}

export type NewDonation = Omit<Donation, "id" | "created_at">;

export const insertDonation = async (record: NewDonation): Promise<Donation> => {
    return insertDbRecord("donation", record);
};

export const findDonationById = async (id: number): Promise<Donation> => {
    return await db.from("donation").select("*").where("id", id).first();
};

export const validateDonation = async (id: number): Promise<void> => {
    await db.from("donation").where("id", id).update({ is_valid: true });
};
