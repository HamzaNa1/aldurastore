import db from "@/lib/db";
import { cartItems } from "@/lib/schema";
import { getServerSession } from "@/lib/userUtils";
import { eq, sql } from "drizzle-orm";

interface CartCountProps {}

export default async function CartCount({}: CartCountProps) {
	const user = getServerSession();

	if (!user) {
		return <></>;
	}

	const { count } = (
		await db
			.select({ count: sql<number>`count(${cartItems.id})` })
			.from(cartItems)
			.where(eq(cartItems.userId, user.id))
	)[0];

	return (
		<>
			<span className="text-lg font-semibold text-zinc-800 group-hover:text-primary transition">
				{count}
			</span>
		</>
	);
}
