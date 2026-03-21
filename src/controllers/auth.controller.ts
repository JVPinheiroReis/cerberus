import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await authService.register(email, password);
        return res.status(201).json(user);
    } catch (err: any) {
        if (err instanceof InvalidCredentialsError) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        if (err instanceof EmailAlreadyExistsError) {
            return res.status(409).json({ error: "Email already in use" });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        return res.json(token);
    } catch (err: any) {
        if (err instanceof InvalidCredentialsError) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function me(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await authService.me(req.user.userId);
    return res.json(user);
}
