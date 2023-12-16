import "server-only";

import { JwtPayload, verify, sign } from "jsonwebtoken";

const RECAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function ValidateRecaptchaAsync(token: string) {
	const response = await fetch(RECAPTCHA_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}`,
	});

	const responseBody = await response.json();

	return responseBody.success as boolean;
}

export function ValidateToken(token: string) {
	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY is not defined");
	}

	try {
		const payload = verify(token, process.env.JWT_KEY, {
			algorithms: ["HS256"],
			issuer: "https://www.aldurastore.com/",
			audience: "https://www.aldurastore.com/",
		}) as JwtPayload;

		return payload;
	} catch {
		return;
	}
}

export function SignToken(payload: any) {
	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY is not defined");
	}

	const newToken = sign(payload, process.env.JWT_KEY, {
		issuer: "https://www.aldurastore.com/",
		audience: "https://www.aldurastore.com/",
		algorithm: "HS256",
		expiresIn: "5h",
	});

	return newToken;
}
