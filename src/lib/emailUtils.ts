import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export default async function sendVerificationEmail(
	userEmail: string,
	key: string
) {
	await resend.emails.send({
		from: "noreply@aldurastore.com",
		to: userEmail,
		subject: "Hello world",
		text: "key: " + key,
	});
}
