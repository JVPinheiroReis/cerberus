import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await authService.register(email, password);
        return res.status(201).json(user);
    } catch (err: any) {
        switch (err.message) {
            case "INVALID_CREDENTIALS":
                return res.status(401).json({ error: "Invalid credentials" });

            case "EMAIL_EXISTS":
                return res.status(409).json({ error: "Email already in use" });

            default:
                return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        return res.json(token);
    } catch (err: any) {
        switch (err.message) {
            case "INVALID_CREDENTIALS":
                return res.status(401).json({ error: "Invalid credentials" });

            default:
                return res.status(500).json({ erro: "Internal server error" });
        }
    }
}
