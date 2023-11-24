"use server";

import db from "@/lib/db";
import hash from "@/lib/salt";
import { NewUser, users } from "@/lib/schema";
import { SignToken, isEmailValid } from "@/lib/utils";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

interface SignUpProps {
	name: string;
	email: string;
	password: string;
}

export interface SignUpError {
	invalidEmail: boolean;
	invalidPassword: boolean;
	emailUsed: boolean;
}

export default async function SignUp({
	name,
	email,
	password,
}: SignUpProps): Promise<SignUpError | undefined> {
	const emailInvalid = !isEmailValid(email);
	const passwordInvalid = password.length < 8;
	if (emailInvalid || passwordInvalid) {
		return {
			invalidEmail: emailInvalid,
			invalidPassword: passwordInvalid,
			emailUsed: false,
		};
	}

	const saltedPassword = hash(password);

	const newUser: NewUser = {
		id: randomUUID(),
		name,
		email,
		password: saltedPassword,
	};

	try {
		await db.insert(users).values(newUser);
	} catch {
		return { invalidEmail: false, invalidPassword: false, emailUsed: true };
	}

	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY is not defined");
	}

	const token = SignToken({ id: newUser.id, email, name });

	const cookiesStore = cookies();
	cookiesStore.set("token", token);
}
