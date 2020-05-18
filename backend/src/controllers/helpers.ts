import { findUserById, updateUserHelperStatus } from "../model/user";
import { getTokenUser } from "../services/jwt";
import { Request, Response, NextFunction } from "express";

export const setHelper = async (req: Request<{}, {}, { setIsHelper: boolean }>, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const userData = await findUserById(user.userId);

        if (!userData) {
            throw "invalid user";
        }

        const isHelper = req.body.setIsHelper;
        if (userData.is_helper === isHelper) {
            throw "profile didn't change";
        }

        await updateUserHelperStatus(user.userId, isHelper);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
