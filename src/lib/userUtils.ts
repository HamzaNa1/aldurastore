import "server-only";

import { cookies } from "next/headers";
import { ValidateToken } from "./utils";
import db from "./db";
import { User, emailConfirmations } from "./schema";
import { eq } from "drizzle-orm";
import sendVerificationEmail from "./emailUtils";

export function getServerSession() {
	const cookiesStore = cookies();
	const tokenCookie = cookiesStore.get("token");

	if (!tokenCookie) {
		return null;
	}

	const token = tokenCookie.value;

	const payload = ValidateToken(token);

	if (!payload) {
		return null;
	}

	const id = payload?.id as string | undefined;
	const email = payload?.email as string | undefined;
	const name = payload?.name as string | undefined;
	const admin = payload?.admin as boolean | undefined;

	if (!id || !email || !name || admin == undefined) {
		return null;
	}

	return { id: id, email: email, name: name, admin: admin, token: token };
}

export async function sendEmailConfirmationAsync(user: User) {
	const confirmation = await db.query.emailConfirmations.findFirst({
		where: (confirmation, { eq }) => eq(confirmation.id, user.id),
	});

	if (confirmation && new Date(confirmation.expiresBy) < new Date()) {
		return;
	}

	await db.transaction(async (tx) => {
		if (confirmation) {
			await tx
				.delete(emailConfirmations)
				.where(eq(emailConfirmations.id, user.id));
		}

		const key = generateKey();
		await tx.insert(emailConfirmations).values({ id: user.id, key: key });

		await sendVerificationEmail(user.email, key);
	});
}

function generateKey() {
	const characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

	let key = "";
	for (let i = 0; i < 6; i++) {
		key += characters[Math.floor(Math.random() * characters.length)];
	}

	return key;
}
