import { comparePassword, hashPassword } from "../utils/hash";
import { randomUUID } from "crypto";
import { signToken } from "../utils/jwt";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { pool } from "../db/client";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";

export async function register(email: string, password: string) {
    if (!email || !password || password.length < 8) {
        throw new InvalidCredentialsError();
    }

    const normalizedEmail = email.toLowerCase();
    const passwordHash = await hashPassword(password);

    try {
        const result = await pool.query(
            `
                INSERT INTO users (id, email, password_hash)
                VALUES ($1, $2, $3)
                RETURNING id, email
            `,
            [randomUUID(), normalizedEmail, passwordHash],
        );

        return result.rows[0];
    } catch (err: any) {
        if (err.code === "23505" && err.constraint === "users_email_unique") {
            throw new EmailAlreadyExistsError();
        }
        throw err;
    }
}

export async function login(email: string, password: string) {
    const normalizedEmail = email.toLowerCase();

    const result = await pool.query(
        `
        SELECT id, email, password_hash
        FROM users
        WHERE email = $1
    `,
        [normalizedEmail],
    );

    const user = result.rows[0];
    if (!user) {
        throw new InvalidCredentialsError();
    }

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) {
        throw new InvalidCredentialsError();
    }

    const token = signToken({ userId: user.id });

    return { accessToken: token };
}

export async function me(userId: string) {
    const result = await pool.query(
        `
        SELECT id, email
        FROM users
        WHERE id = $1
    `,
        [userId],
    );

    const user = result.rows[0];

    return user;
}
