import { hashPassword } from "../utils/hash";
import { randomUUID } from "crypto";

type User = {
	id: string;
	email: string;
	passwordHash: string;
};

const users: User[] = [];

export async function register(email: string, password: string) {
	const normalizedEmail = email.toLowerCase();

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
