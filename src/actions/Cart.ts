"use server";

import db from "@/lib/db";
import { cartItems } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function DeleteItem(cartItemId: string) {
	await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
	revalidatePath("/");
}
