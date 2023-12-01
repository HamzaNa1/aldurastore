"use server";

import db from "@/lib/db";
import { emailConfirmations, users } from "@/lib/schema";
import { SignToken } from "@/lib/Utils/authUtils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ConfirmUser(userId: string, key: string) {
	await new Promise((r) => setTimeout(r, 1000));

	const confirmation = await db.query.emailConfirmations.findFirst({
		where: (confirmation, { eq }) => eq(confirmation.id, userId),
	});

	if (!confirmation || new Date(confirmation.expiresBy) < new Date()) {
		redirect("/login");
	}

	if (confirmation.key != key) {
		return;
	}

	await db.transaction(async (tx) => {
		await tx
			.delete(emailConfirmations)
			.where(eq(emailConfirmations.id, userId));
		await tx
			.update(users)
			.set({ emailConfirmed: true })
			.where(eq(users.id, userId));
	});

	const user = await db.query.users.findFirst({
		where: (user, { eq }) => eq(user.id, userId),
	});

	if (!user) {
		redirect("/login");
	}

	const token = SignToken({
		id: user.id,
		email: user.email,
		name: user.name,
		admin: user.admin,
	});

	const cookiesStore = cookies();
	cookiesStore.set("token", token);

	redirect("/");
}
