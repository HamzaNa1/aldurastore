"use server";

import UserToken from "@/lib/types/UserToken";
import { getServerSession } from "@/lib/Utils/userUtils";
import { SignToken, ValidateToken } from "@/lib/Utils/authUtils";
import { cookies } from "next/headers";

export default async function RenewUser(): Promise<UserToken | null> {
	const user = getServerSession();

	if (!user || !ValidateToken(user.token)) {
		return null;
	}

	const newToken = SignToken({ ...user });

	const cookiesStore = cookies();
	cookiesStore.set("token", newToken);

	return { ...user, token: newToken };
}
