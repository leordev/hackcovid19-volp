import { Request, Response, NextFunction } from "express";

import { findInstitutionById } from "../model/instituition";
import { getTokenUser } from "../services/jwt";
import { findDonationById, NewDonation, insertDonation, validateDonation } from "../model/donation";

export const getDonation = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const donation = await findDonationById(parseInt(req.params.id));

        const user = getTokenUser(req);
        if (donation.donator_id !== user.userId) {
            const institution = await findInstitutionById(donation.institution_id);
            if (!institution || institution.owner_id !== user.userId) {
                throw new Error("Invalid Credentials");
            }
        }

        res.send(donation);
    } catch (err) {
        next(err);
    }
};

export const newDonation = async (req: Request<{}, {}, NewDonation>, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const newDonation = req.body;
        newDonation.donator_id = user.userId;
        newDonation.is_valid = false;

        const institution = await insertDonation(newDonation);
        res.send(institution);
    } catch (err) {
        next(err);
    }
};

export const acceptDonation = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const donationId = parseInt(req.params.id);

        const donation = await findDonationById(donationId);
        if (!donation) {
            throw new Error("invalid donation");
        }

        const institution = await findInstitutionById(donation.institution_id);
        if (!institution || institution.owner_id !== user.userId) {
            throw new Error("Invalid Institution");
        }

        await validateDonation(donation.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
