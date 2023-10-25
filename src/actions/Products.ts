"use server";

import db from "@/lib/db";
import { Product } from "@/lib/schema";

export async function GetAllProducts() {
	const result: Product[] = await db.query.products.findMany({});

	return result;
}

export async function GetMainPageProducts() {
	const result: Product[] = await db.query.products.findMany({
		where: (product, { eq }) => eq(product.showOnMain, true),
	});

	return result;
}

export async function GetProduct(id: string) {
	const result: Product | undefined = await db.query.products.findFirst({
		where: (product, { eq }) => eq(product.id, id),
	});

	return result;
}
