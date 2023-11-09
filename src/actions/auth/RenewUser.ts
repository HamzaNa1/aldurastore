"use server";

import UserToken from "@/lib/types/UserToken";
import { getServerSession } from "@/lib/userUtils";
import { SignToken, ValidateToken } from "@/lib/utils";

interface RenewUserProps {}

export default async function RenewUser({}: RenewUserProps): Promise<UserToken | null> {
	const user = getServerSession();

	if (!user || !ValidateToken(user.token)) {
		return null;
	}

	const newToken = SignToken({ ...user });

	return { ...user, token: newToken };
}
