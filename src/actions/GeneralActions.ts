"use server";

import db from "@/lib/db";
import { CartItem, cartItems } from "@/lib/schema";
import { getServerSession } from "@/lib/userUtils";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function AddCartItem(
	productId: string,
	settingId: string,
	quantity: number
) {
	const user = getServerSession();

	if (!user) {
		redirect("/login");
	}

	const item: CartItem = {
		id: randomUUID(),
		userId: user.id,
		productId: productId,
		productSettingsId: settingId,
		quantity: quantity,
	};

	await db.insert(cartItems).values(item);
	redirect("/cart");
}

export async function DeleteCartItem(cartItemId: string) {
	await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
	revalidatePath("/");
}
