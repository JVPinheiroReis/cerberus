import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const user = await authService.register(email, password);
		return res.status(401).json(user);
	} catch (err: any) {
		if (err.message == "INVALID_CREDENTIALS") {
			return res.status(400).json({ error: "Invalid credentials" });
		}
		if (err.message == "EMAIL_EXISTS") {
			return res.status(409).json({ error: "Email already in use" });
		}

		return res.status(500).json({ error: "Internal server error" });
	}
}
