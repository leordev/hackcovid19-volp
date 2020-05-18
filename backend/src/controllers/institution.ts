import { Request, Response, NextFunction } from "express";

import {
    Institution,
    NewInstitution,
    insertInstitution,
    findInstitutionById,
    updateInstitution,
    findInstitutionsInRegion,
} from "../model/instituition";
import { getTokenUser } from "../services/jwt";
import { findAddressesForEntity } from "../model/address";
import { EntityType } from "../model/enums";
import { findPhonesForEntity } from "../model/phone";
import { RegionQueryParams, calculateRegionFromQueryParams } from "../utils/geoloc";

export const getInstitution = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const institution = await findInstitutionById(parseInt(req.params.id));
        const addresses = await findAddressesForEntity(EntityType.Institution, institution.id);
        const phones = await findPhonesForEntity(EntityType.Institution, institution.id);
        res.send({ ...institution, addresses, phones });
    } catch (err) {
        next(err);
    }
};

export const listInstitutions = async (
    req: Request<{}, {}, {}, RegionQueryParams>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const region = calculateRegionFromQueryParams(req.query);
        const locations = await findInstitutionsInRegion(region.start, region.end);
        res.send(locations);
    } catch (err) {
        next(err);
    }
};

export const newInstitution = async (req: Request<{}, {}, NewInstitution>, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const newInstitution = req.body;
        newInstitution.owner_id = user.userId;

        const institution = await insertInstitution(newInstitution);
        res.send(institution);
    } catch (err) {
        next(err);
    }
};

export const modifyInstitution = async (req: Request<{}, {}, Institution>, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const updatedInstitution = req.body;

        const institution = await findInstitutionById(updatedInstitution.id);
        if (!institution || institution.owner_id !== user.userId) {
            throw new Error("Invalid Institution");
        }

        delete updatedInstitution.created_at;
        await updateInstitution(updatedInstitution);

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
