import "server-only";

import { cookies } from "next/headers";
import { getNextYear } from "./utils";
import { Product, ProductPrice, ProductSettings } from "../schema";
import { randomUUID } from "crypto";
import db from "../db";
import { revalidatePath } from "next/cache";

type CookiesCartItem = {
	productId: string;
	settingsId: string;
	quantity: number;
};

export function AddToCookiesCart(
	productId: string,
	settingsId: string,
	quantity: number
) {
	const item: CookiesCartItem = {
		productId,
		settingsId,
		quantity,
	};

	const cookiesStore = cookies();
	const cart = cookiesStore.get("cart");

	if (!cart) {
		cookiesStore.set("cart", `[${JSON.stringify(item)}]`, {
			maxAge: getNextYear(),
		});
		return;
	}

	try {
		const cartItems = JSON.parse(cart.value) as CookiesCartItem[];

		if (cartItems.length >= 20) {
			return;
		}

		cartItems.push(item);

		cookiesStore.set("cart", `${JSON.stringify(cartItems)}`, {
			maxAge: getNextYear(),
		});
	} catch {
		cookiesStore.set("cart", `[${JSON.stringify(item)}]`, {
			maxAge: getNextYear(),
		});
	}
}

type MyCartItem = {
	id: string;
	product: Product & { productPrices: ProductPrice[] };
	productSettings: ProductSettings;
	quantity: number;
};

export async function GetCookiesCartAsync(country?: string) {
	const cookiesStore = cookies();
	const cart = cookiesStore.get("cart");

	if (!cart) {
		return undefined;
	}

	try {
		let resave = false;
		const cookiesCartItems = JSON.parse(cart.value) as CookiesCartItem[];

		const cartItems = (
			await Promise.all(
				cookiesCartItems.map(async (i, index) => {
					const product = await db.query.products.findFirst({
						where: (p, { eq }) => eq(p.id, i.productId),
						with: {
							productPrices: {
								where: (price, { eq }) => eq(price.country, country ?? ""),
							},
							productSettings: {
								where: (settings, { eq }) => eq(settings.id, i.settingsId),
							},
						},
					});

					if (!product || product.productSettings.length == 0) {
						cookiesCartItems.splice(index, 1);
						resave = true;
						return undefined;
					}

					const item: MyCartItem = {
						id: randomUUID(),
						product: product,
						productSettings: product.productSettings[0],
						quantity: i.quantity,
					};

					return item;
				})
			)
		).filter((x): x is MyCartItem => x !== undefined);

		if (resave) {
			cookiesStore.set("cart", `${JSON.stringify(cookiesCartItems)}`, {
				maxAge: getNextYear(),
			});
		}

		return cartItems;
	} catch {
		return undefined;
	}
}

export function DeleteCookiesCart(index: number) {
	const cookiesStore = cookies();
	const cart = cookiesStore.get("cart");

	if (!cart) {
		return undefined;
	}

	try {
		const cookiesCartItems = JSON.parse(cart.value) as CookiesCartItem[];

		cookiesCartItems.splice(index, 1);

		cookiesStore.set("cart", `${JSON.stringify(cookiesCartItems)}`, {
			maxAge: getNextYear(),
		});
	} catch {
		cookiesStore.set("cart", "[]", {
			maxAge: getNextYear(),
		});
	}

	revalidatePath("/cart");
}

export function ClearCookiesCart() {
	const cookiesStore = cookies();
	cookiesStore.set("cart", "[]", {
		maxAge: getNextYear(),
	});
	revalidatePath("/cart");
}
