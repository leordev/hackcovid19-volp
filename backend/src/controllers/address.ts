import { Request, Response, NextFunction } from "express";

import { findInstitutionById } from "../model/instituition";
import { getTokenUser } from "../services/jwt";
import { NewAddress, insertAddress, findAddressesForEntity } from "../model/address";
import { EntityType } from "../model/enums";

export const listMyAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = getTokenUser(req);
        const addresses = await findAddressesForEntity(EntityType.User, userId);
        res.send(addresses);
    } catch (err) {
        next(err);
    }
};

export const newAddress = async (req: Request<{}, {}, NewAddress>, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const newAddress = req.body;
        if (!newAddress.country) {
            newAddress.country = "BR"; /// TODO: revisit default country
        }

        let hasEntityCredentials = true;
        if (newAddress.type === EntityType.Institution) {
            const { owner_id } = await findInstitutionById(newAddress.entity_id);
            if (owner_id !== user.userId) {
                hasEntityCredentials = false;
            }
        } else if (newAddress.entity_id !== user.userId) {
            hasEntityCredentials = false;
        }
        if (!hasEntityCredentials) {
            throw "invalid credentials to update address";
        }

        const address = await insertAddress(newAddress);
        res.send(address);
    } catch (err) {
        next(err);
    }
};
