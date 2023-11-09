"use server";

import db from "@/lib/db";
import hash from "@/lib/salt";
import UserToken from "@/lib/types/UserToken";
import { SignToken, isEmailValid } from "@/lib/utils";
import { cookies } from "next/headers";

interface SignInProps {
	email: string;
	password: string;
}

export default async function SignIn({
	email,
	password,
}: SignInProps): Promise<UserToken | null> {
	if (!isEmailValid(email)) {
		return null;
	}

	const saltedPassword = hash(password);

	const user = await db.query.users.findFirst({
		where: (user, { eq }) =>
			eq(user.email, email) && eq(user.password, saltedPassword),
	});

	if (!user) {
		return null;
	}

	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY is not defined");
	}

	const token = SignToken({ email: email, name: user.name });

	const cookiesStore = cookies();
	cookiesStore.set("token", token);

	return { email: user.email, name: user.name, token: token };
}