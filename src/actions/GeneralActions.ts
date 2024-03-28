"use server";

import db from "@/lib/db";
import { locations } from "@/lib/Utils/locationUtils";
import {
	CartItem,
	NewOrder,
	cartItems,
	orders,
	ordersToProducts,
	productSettings,
} from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import { randomUUID } from "crypto";
import { and, eq, gt, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getCountry from "@/lib/country";
import { CheckoutEmail } from "@/lib/emails";
import sendEmail from "@/lib/Utils/emailUtils";
import { Language } from "@/lib/languages/dictionaries";
import { ValidateRecaptchaAsync } from "@/lib/Utils/authUtils";
import {
	AddToCookiesCart,
	ClearCookiesCart,
	GetCookiesCartAsync,
} from "@/lib/Utils/cookiesCartUtils";
import { getNextYear } from "@/lib/Utils/utils";

export async function AddCartItem(
	productId: string,
	settingId: string,
	quantity: number
) {
	const user = getServerSession();

	const product = await db.query.products.findFirst({
		where: (product, { and, eq }) =>
			and(eq(product.id, productId), eq(product.activated, true)),
		with: {
			productSettings: {
				where: (settings, { and, eq, gt }) =>
					and(eq(settings.id, settingId), gt(settings.quantity, 0)),
			},
		},
	});

	if (!product || product.productSettings.length != 1) {
		return;
	}

	if (user) {
		const item: CartItem = {
			id: randomUUID(),
			userId: user.id,
			productId: product.id,
			productSettingsId: settingId,
			quantity: quantity,
		};

		await db.insert(cartItems).values(item);
	} else {
		AddToCookiesCart(productId, settingId, quantity);
	}

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
	if (locations.findIndex((x) => x.code == country) == -1) {
		return;
	}

	const cookiesStore = cookies();
	cookiesStore.set("country", country, {
		maxAge: getNextYear(),
	});

	revalidatePath("/");
}

export async function SelectLanguage(language: Language) {
	const cookiesStore = cookies();
	cookiesStore.set("language", language, {
		maxAge: getNextYear(),
	});

	revalidatePath("/");
}

interface OrderDetails {
	token: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	location: string;
	region: string;
	area: string;
	address: string;
}

export async function CreateOrder(orderDetails: OrderDetails) {
	const success = await ValidateRecaptchaAsync(orderDetails.token);
	if (!success) {
		return false;
	}

	const user = getServerSession();

	if (!user) {
		return CreateOrderFromCookes(orderDetails);
	}

	const country = getCountry();

	const order: NewOrder = {
		id: randomUUID(),
		userId: user.id,
		country: country,
		boughtDate: new Date(),
		firstname: orderDetails.firstName,
		lastname: orderDetails.lastName,
		phonenumber: orderDetails.phoneNumber,
		location: orderDetails.location,
		region: orderDetails.region,
		area: orderDetails.area,
		address: orderDetails.address,
	};

	try {
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
				tx.rollback();
				return;
			}

			await tx.insert(orders).values(order);
			await tx.delete(cartItems).where(eq(cartItems.userId, user.id));

			for (let i = 0; i < items.length; i++) {
				if (items[i].product.productPrices.length <= 0) {
					tx.rollback();
					return;
				}

				await tx.insert(ordersToProducts).values({
					id: randomUUID(),
					orderId: order.id,
					productId: items[i].productId,
					productSettingsId: items[i].productSettingsId,
					cost: items[i].product.productPrices[0].cost,
				});

				const [query] = await tx
					.update(productSettings)
					.set({ quantity: sql`${productSettings.quantity} - 1` })
					.where(
						and(
							eq(productSettings.id, items[i].productSettingsId),
							gt(productSettings.quantity, 0)
						)
					);

				if (query.affectedRows == 0) {
					tx.rollback();
					return;
				}
			}
		});
	} catch {
		return false;
	}

	if (process.env.NODE_ENV == "production") {
		const email = CheckoutEmail({ order: order });
		await sendEmail("info@aldurastore.com", "طلب جديد", email);
	}

	return true;
}

async function CreateOrderFromCookes(orderDetails: OrderDetails) {
	const country = getCountry();

	const order: NewOrder = {
		id: randomUUID(),
		userId: null,
		country: country,
		boughtDate: new Date(),
		firstname: orderDetails.firstName,
		lastname: orderDetails.lastName,
		phonenumber: orderDetails.phoneNumber,
		location: orderDetails.location,
		region: orderDetails.region,
		area: orderDetails.area,
		address: orderDetails.address,
	};

	try {
		await db.transaction(async (tx) => {
			const items = await GetCookiesCartAsync(country);

			if (!items || items.length == 0) {
				tx.rollback();
				return;
			}

			await tx.insert(orders).values(order);

			for (let i = 0; i < items.length; i++) {
				if (items[i].product.productPrices.length <= 0) {
					tx.rollback();
					return;
				}

				await tx.insert(ordersToProducts).values({
					id: randomUUID(),
					orderId: order.id,
					productId: items[i].product.id,
					productSettingsId: items[i].productSettings.id,
					cost: items[i].product.productPrices[0].cost,
				});

				const [query] = await tx
					.update(productSettings)
					.set({ quantity: sql`${productSettings.quantity} - 1` })
					.where(
						and(
							eq(productSettings.id, items[i].productSettings.id),
							gt(productSettings.quantity, 0)
						)
					);

				if (query.affectedRows == 0) {
					tx.rollback();
					return;
				}
			}
		});
	} catch {
		return false;
	}

	ClearCookiesCart();

	if (process.env.NODE_ENV == "production") {
		const email = CheckoutEmail({ order: order });
		await sendEmail("info@aldurastore.com", "طلب جديد", email);
	}

	return true;
}
