"use server";

import db from "@/lib/db";
import hash from "@/lib/salt";
import { NewUser, users } from "@/lib/schema";
import { ValidateRecaptchaAsync } from "@/lib/Utils/authUtils";
import { sendEmailConfirmationAsync } from "@/lib/Utils/userUtils";
import { isEmailValid } from "@/lib/Utils/utils";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

interface SignUpProps {
	name: string;
	email: string;
	password: string;
	token: string;
}

interface SignUpError {
	invalidEmail: boolean;
	invalidPassword: boolean;
	emailUsed: boolean;
	unexpectedError: boolean;
}

export default async function SignUp({
	name,
	email,
	password,
	token,
}: SignUpProps): Promise<SignUpError | undefined> {
	const success = await ValidateRecaptchaAsync(token);

	if (!success) {
		return {
			invalidEmail: false,
			invalidPassword: false,
			emailUsed: false,
			unexpectedError: true,
		};
	}

	const emailInvalid = !isEmailValid(email);
	const passwordInvalid = password.length < 8;
	if (emailInvalid || passwordInvalid) {
		return {
			invalidEmail: emailInvalid,
			invalidPassword: passwordInvalid,
			emailUsed: false,
			unexpectedError: false,
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
		return {
			invalidEmail: false,
			invalidPassword: false,
			emailUsed: true,
			unexpectedError: false,
		};
	}

	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY is not defined");
	}

	await sendEmailConfirmationAsync(newUser.id, newUser.email);
	redirect("/confirm?id=" + newUser.id);
}
