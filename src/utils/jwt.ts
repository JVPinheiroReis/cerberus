import jwt from "jsonwebtoken";

const SECRET = "dev-secret"; // replace later with env var

export function signToken(payload: object): string {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, SECRET);
}
