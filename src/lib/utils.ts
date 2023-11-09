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
		expiresIn: "1h",
	});

	return newToken;
}

const emailRegex =
	/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export function isEmailValid(email: string) {
	if (!email) return false;

	if (email.length > 254) return false;

	var valid = emailRegex.test(email);
	if (!valid) return false;

	// Further checking of some things regex can't handle
	var parts = email.split("@");
	if (parts[0].length > 64) return false;

	var domainParts = parts[1].split(".");
	if (
		domainParts.some(function (part) {
			return part.length > 63;
		})
	)
		return false;

	return true;
}
