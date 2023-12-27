import db from "@/lib/db";
import { cartItems } from "@/lib/schema";
import { GetCookiesCartAsync } from "@/lib/Utils/cookiesCartUtils";
import { getServerSession } from "@/lib/Utils/userUtils";
import { eq, sql } from "drizzle-orm";

interface CartCountProps {}

export default async function CartCount({}: CartCountProps) {
	const user = getServerSession();

	let count = 0;

	if (!user) {
		count = (await GetCookiesCartAsync())?.length ?? 0;
	} else {
		count = (
			await db
				.select({ count: sql<number>`count(${cartItems.id})` })
				.from(cartItems)
				.where(eq(cartItems.userId, user.id))
		)[0].count;
	}

	if (count == 0) {
		return <></>;
	}

	return (
		<>
			<span className="text-lg font-semibold text-zinc-800 group-hover:text-primary transition">
				{count}
			</span>
		</>
	);
}
