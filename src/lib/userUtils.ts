import { cookies } from "next/headers";
import { ValidateToken } from "./utils";

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

	if (!id || !email || !name) {
		return null;
	}

	return { id: id, email: email, name: name, token: token };
}
