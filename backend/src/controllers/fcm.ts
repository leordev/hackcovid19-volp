import { Request, Response, NextFunction } from "express";

import { getTokenUser } from "../services/jwt";
import { sendNotification } from "../services/fcm";
import { NewFcmKey, insertOrUpdateFCM } from "../model/fcmKey";

export interface TokenInfo {
    token: string;
    source: "WEB" | "IOS" | "ANDROID";
}

export const updateTokenFcm = async (req: Request<{}, {}, TokenInfo>, res: Response, next: NextFunction) => {
    if (!["WEB", "IOS", "ANDROID"].includes(req.body.source)) {
        next(new Error("Invalid source"));
    }

    const user = getTokenUser(req);
    const fcmData: NewFcmKey = { ...req.body, user_id: user.userId };

    try {
        const fcm = await insertOrUpdateFCM(fcmData);

        sendNotification(fcmData.token, {
            title: "Notificações configuradas!",
            body: `Bem vindo ao Volp, notificando diretamente ${
                req.body.source === "WEB" ? "da" : "do"
            } ${getTextSource(req.body.source)}`,
        });
        res.send(fcm);
    } catch (err) {
        next(err);
    }
};

const getTextSource = (source: "WEB" | "IOS" | "ANDROID") =>
    source === "ANDROID" ? "Android" : source === "IOS" ? "iOS" : "WEB";
