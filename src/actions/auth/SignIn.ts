"use server";

import db from "@/lib/db";
import hash from "@/lib/salt";
import UserToken from "@/lib/types/UserToken";
import { getServerSession, sendEmailConfirmationAsync } from "@/lib/userUtils";
import { SignToken, isEmailValid } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

	if (!user.emailConfirmed) {
		await sendEmailConfirmationAsync(user);
		redirect("/confirm?id=" + user.id);
	}

	const token = SignToken({
		id: user.id,
		email: email,
		name: user.name,
		admin: user.admin,
	});

	const cookiesStore = cookies();
	cookiesStore.set("token", token);

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		admin: user.admin,
		token: token,
	};
}
