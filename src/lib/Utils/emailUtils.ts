import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export default async function sendEmail(
	to: string,
	title: string,
	email: React.JSX.Element
) {
	await resend.emails.send({
		from: "متجر الدرة <noreply@aldurastore.com>",
		to: to,
		subject: title,
		react: email,
	});
}
