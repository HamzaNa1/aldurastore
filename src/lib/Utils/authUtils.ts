import "server-only";

import { JwtPayload, verify, sign } from "jsonwebtoken";

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
