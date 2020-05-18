import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

import { app } from "../config";
import { Request } from "express";

export const jwtMiddleware = () => {
    const { secret } = app;
    return expressJwt({ secret }).unless({
        path: [
            "/",
            "/signup",
            "/authenticate",
            "/auth-verify-code",
            { url: /^\/institution\/.*/, method: "GET" },
            { url: "/institution", method: "GET" },
        ],
    });
};

export const signJwt = (object: any) => {
    return jwt.sign(object, app.secret);
};

export interface UserToken {
    userId: number;
    iat: number;
}

export const generateUserToken = (userId: number) => {
    return signJwt({ userId });
};

export const getTokenUser = (req: Request<any, any, any, any>): UserToken => {
    const { user } = req as any;
    if (!user) {
        throw "request has no user token";
    }
    return user;
};
