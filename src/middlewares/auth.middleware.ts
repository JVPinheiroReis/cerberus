import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const payload = verifyToken(token);
        req.user = payload;
        return next();
    } catch {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
