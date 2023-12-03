import "server-only";

import { cookies } from "next/headers";
import { ValidateToken } from "./authUtils";
import db from "../db";
import { emailConfirmations } from "../schema";
import { eq } from "drizzle-orm";
import sendEmail from "./emailUtils";
import { ConfirmationEmail } from "../emails";
import { Language } from "../languages/dictionaries";

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

	const id = payload.id as string | undefined;
	const email = payload.email as string | undefined;
	const name = payload.name as string | undefined;
	const admin = payload.admin as boolean | undefined;

	if (!id || !email || !name || admin == undefined) {
		return null;
	}

	return { id: id, email: email, name: name, admin: admin, token: token };
}

export async function sendEmailConfirmationAsync(
	userId: string,
	emailAddress: string
) {
	if (process.env.NODE_ENV != "production") {
		return;
	}

	const confirmation = await db.query.emailConfirmations.findFirst({
		where: (confirmation, { eq }) => eq(confirmation.id, userId),
	});

	if (confirmation && new Date(confirmation.expiresBy) > new Date()) {
		return;
	}

	const cookiesStore = cookies();
	let language: Language;
	try {
		language = (cookiesStore.get("location")?.value ?? "ar") as Language;
	} catch {
		language = "ar";
	}

	await db.transaction(async (tx) => {
		if (confirmation) {
			await tx
				.delete(emailConfirmations)
				.where(eq(emailConfirmations.id, userId));
		}

		const key = generateKey();
		await tx.insert(emailConfirmations).values({ id: userId, key: key });

		const email = ConfirmationEmail(language, { code: key });

		await sendEmail(emailAddress, "تأكيد البريد الألكتروني", email);
	});
}

function generateKey() {
	const characters = "0123456789";

	let key = "";
	for (let i = 0; i < 6; i++) {
		key += characters[Math.floor(Math.random() * characters.length)];
	}

	return key;
}
