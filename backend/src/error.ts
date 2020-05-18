import { Response, Request } from "express";

export const defaultErrorHandler = (err: any, _req: Request, res: Response, _next: any) => {
    console.error(err);
    if (typeof err === "string") {
        return res.status(400).json({ message: err });
    }

    if ((err as any).name === "UnauthorizedError") {
        return res.status(401).json({ message: "Invalid Token" });
    }

    return res.status(500).json({ message: (err as any).message });
};
