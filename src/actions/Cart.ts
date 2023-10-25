"use server";

import db from "@/lib/db";
import { cartItems, products } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GetCartByUser(userId: string) {
	const result = await db
		.select()
		.from(cartItems)
		.innerJoin(products, eq(cartItems.productId, products.id));

	return result;
}
