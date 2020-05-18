import { Request, Response, NextFunction } from "express";
import * as BrV from "br-validations";
import * as EmailValidator from "email-validator";

import { EntityType } from "../model/enums";
import { findPhoneByNumber, NewPhoneNumber, insertPhone } from "../model/phone";
import { NewUser, insertUser, findUserByEmail } from "../model/user";
import smsVerifierService from "../services/sms-verify";
import { generateUserToken } from "../services/jwt";

export interface SignupApi {
    user: NewUser;
    phoneNumber: string;
    smsVerificationCode: string;
}

export const signup = async (req: Request<{}, {}, SignupApi>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const signup = req.body;
        signup.phoneNumber = signup.phoneNumber.replace(/\D/g, "");

        await verifyUserInfo(signup);

        const newUser = await insertUser(signup.user);

        const phone: NewPhoneNumber = {
            type: EntityType.User,
            entity_id: newUser.id,
            phone: signup.phoneNumber,
        };
        await insertPhone(phone);

        res.send({ user: newUser, token: generateUserToken(newUser.id) });
    } catch (e) {
        next(e);
    }
};

const verifyUserInfo = async (signup: SignupApi): Promise<void> => {
    const validCpf = BrV.cpf.validate(signup.user.unique_document);
    if (!validCpf) {
        throw new Error("Invalid CPF");
    }

    const validEmail = EmailValidator.validate(signup.user.email);
    if (!validEmail) {
        throw new Error("Invalid Email address");
    }

    if (signup.phoneNumber.length !== 11) {
        throw new Error("phone number is invalid, please insert the full number with code area");
    }

    const existingEmail = await findUserByEmail(signup.user.email);
    if (existingEmail) {
        throw new Error("email is already being used");
    }

    const existingPhone = await findPhoneByNumber(signup.phoneNumber);
    if (existingPhone) {
        throw new Error("phone is already being used");
    }

    const validSmsCode = await smsVerifierService.verifySmsCode(signup.phoneNumber, signup.smsVerificationCode);
    if (!validSmsCode) {
        throw new Error("Invalid SMS Code");
    }
};
