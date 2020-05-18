import { Request, Response, NextFunction } from "express";

import { findPhoneByNumber } from "../model/phone";
import smsService from "../services/sms-verify";
import { generateUserToken, getTokenUser } from "../services/jwt";
import smsVerifierService from "../services/sms-verify";
import { findUserById } from "../model/user";
import { findInstitutionByOwnerId } from "../model/instituition";

interface AuthPhoneApi {
    phoneNumber: string;
    code: string;
}

export const authSmsVerificationCode = async (req: Request<{}, {}, { phoneNumber: string }>, res: Response) => {
    let verificationRequest;
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        throw new Error("phone number is required");
    }

    /// TODO: prevent abuse here. we can't freely call our sms verify services without any check
    await smsVerifierService.sendVerificationCodeSms(phoneNumber);

    console.debug(verificationRequest);
    return res.send({ ok: true });
};

export const authenticate = async (req: Request<{}, {}, AuthPhoneApi>, res: Response, next: NextFunction) => {
    try {
        const { phoneNumber, code } = req.body;
        const isValid = await smsService.verifySmsCode(phoneNumber, code);
        if (!isValid) {
            throw "Invalid Credentials";
        }

        const phone = await findPhoneByNumber(phoneNumber);
        if (!phone) {
            throw "Invalid Auth user";
        }

        const authData = await getUserAuthData(phone.entity_id);
        res.send(authData);
    } catch (err) {
        next(err);
    }
};

export const renewToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = getTokenUser(req);
        const authData = await getUserAuthData(user.userId);
        res.send(authData);
    } catch (err) {
        next(err);
    }
};

const getUserAuthData = async (userId: number) => {
    const user = await findUserById(userId);
    if (!user) {
        throw "Invalid user";
    }

    const institution = await findInstitutionByOwnerId(user.id);
    const ownsInstitutionId = institution ? institution.id : 0;
    return {
        user,
        ownsInstitutionId,
        token: generateUserToken(user.id),
    };
};
