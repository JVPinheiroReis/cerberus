import { comparePassword, hashPassword } from "../utils/hash";
import { randomUUID } from "crypto";
import { signToken } from "../utils/jwt";

type User = {
	id: string;
	email: string;
	passwordHash: string;
};

const users: User[] = [];

export async function register(email: string, password: string) {
	const normalizedEmail = email.toLowerCase();

	if (!email || !password || password.length < 8) {
		throw new Error("INVALID_CREDENTIALS");
	}

	const existing = users.find((u) => u.email == normalizedEmail);
	if (existing) {
		throw new Error("EMAIL_EXISTS");
	}

	const passwordHash = await hashPassword(password);

	const user: User = {
		id: randomUUID(),
		email: normalizedEmail,
		passwordHash,
	};

	users.push(user);

	return {
		id: user.id,
		email: user.email,
	};
}

export async function login(email: string, password: string) {
	const normalizedEmail = email.toLowerCase();

	const user = users.find((u) => u.email == normalizedEmail);
	if (!user) {
		throw new Error("INVALID_CREDENTIALS");
	}

	const valid = await comparePassword(password, user.passwordHash);
	if (!valid) {
		throw new Error("INVALID_CREDENTIALS");
	}

	const token = signToken({ userId: user.id });

	return { accessToken: token };
}
