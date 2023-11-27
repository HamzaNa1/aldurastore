"use server";

import db from "@/lib/db";
import { countries } from "@/lib/Utils/locationUtils";
import {
	CartItem,
	NewOrder,
	Order,
	cartItems,
	orders,
	ordersToProducts,
} from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getCountry from "@/lib/country";

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

interface OrderDetails {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	location: string;
	region: string;
	address: string;
}

export async function CreateOrder(orderDetails: OrderDetails) {
	const user = getServerSession();

	if (!user) {
		redirect("/");
	}

	const country = getCountry();

	const order: NewOrder = {
		id: randomUUID(),
		userId: user.id,
		country: country,
		firstname: orderDetails.firstName,
		lastname: orderDetails.lastName,
		phonenumber: orderDetails.phoneNumber,
		location: orderDetails.location,
		region: orderDetails.region,
		address: orderDetails.address,
	};

	await db.transaction(async (tx) => {
		const items = await tx.query.cartItems.findMany({
			where: (item, { eq }) => eq(item.userId, user.id),
			with: {
				product: {
					with: {
						productPrices: {
							where: (price, { eq }) => eq(price.country, country),
						},
					},
				},
			},
		});

		if (items.length == 0) {
			return;
		}

		await tx.insert(orders).values(order);
		await tx.delete(cartItems).where(eq(cartItems.userId, user.id));

		for (let i = 0; i < items.length; i++) {
			await tx.insert(ordersToProducts).values({
				orderId: order.id,
				productId: items[i].productId,
				productSettingsId: items[i].productSettingsId,
				cost: items[i].product.productPrices[0].cost,
			});
		}
	});

	redirect("/thank-you");
}
