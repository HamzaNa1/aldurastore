import { cookies } from "next/headers";
import "server-only";

export default function getCountry() {
	const cookiesStore = cookies();
	const country = cookiesStore.get("country")?.value ?? "sa";

	return country;
}
