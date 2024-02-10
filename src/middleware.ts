import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locations } from "./lib/Utils/locationUtils";
import { URL } from "url";
import { getNextYear } from "./lib/Utils/utils";

export function middleware(request: NextRequest) {
	const location = request.cookies.get("country");
	const language = request.cookies.get("language");

	if (location && language) {
		return;
	}

	const acceptLanguage = request.headers.get("Accept-Language");

	if (!acceptLanguage) {
		return;
	}

	const url = request.nextUrl.clone();
	const response = NextResponse.redirect(url);

	response.headers.set("Set-Cookie", `Max-Age=${getNextYear()}; Path=/;`);

	if (!location) {
		const codes = acceptLanguage
			.split(",")
			.map((x) => x.split(";"))
			.map((x) => x[0].split("-"))
			.filter((x) => x.length == 2)
			.map((x) => x[1].toLowerCase());

		const code = locations.find((x) => codes.includes(x.code))?.code ?? "sa";

		response.cookies.set("country", code);
	}

	if (!language) {
		const languages = acceptLanguage
			.split(",")
			.map((x) => x.split(";"))
			.map((x) => x[0].split("-"))
			.map((x) => x[0].toLowerCase());

		const language = languages.find((x) => x == "en" || x == "ar") ?? "ar";

		response.cookies.set("language", language);
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
