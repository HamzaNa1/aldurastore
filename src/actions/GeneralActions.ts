"use server";

import db from "@/lib/db";
import { countries } from "@/lib/Utils/locationUtils";
import { CartItem, cartItems } from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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
	const user = getServerSession();

	if (!user) {
		redirect("/login");
	}

	await db
		.delete(cartItems)
		.where(and(eq(cartItems.userId, user.id), eq(cartItems.id, cartItemId)));
	revalidatePath("/");
}

export async function SelectLocation(country: string) {
	if (countries.findIndex((x) => x == country) == -1) {
		return;
	}

	const cookiesStore = cookies();
	cookiesStore.set("country", country);

	revalidatePath("/");
}
