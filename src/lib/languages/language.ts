import "server-only";

import { cookies } from "next/headers";
import { Language } from "./dictionaries";

export default function getLanguage(): Language {
	const cookiesStore = cookies();
	const country = (cookiesStore.get("language")?.value as Language) ?? "ar";

	return country;
}

export function getDirection() {
	const cookiesStore = cookies();
	const country = (cookiesStore.get("language")?.value as Language) ?? "ar";

	return country == "ar" ? "rtl" : "ltr";
}
