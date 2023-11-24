"use server";

import db from "@/lib/db";
import {
	Product,
	ProductImage,
	ProductSettings,
	orders,
	productImages,
	productSettings,
	products,
} from "@/lib/schema";
import { getServerSession } from "@/lib/userUtils";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function DashboardDeleteProduct(productId: string) {
	const user = getServerSession();

	if (!user?.admin) {
		return;
	}

	await db.transaction(async (tx) => {
		await tx.delete(products).where(eq(products.id, productId));
		await tx
			.delete(productImages)
			.where(eq(productImages.productId, productId));
		await tx
			.delete(productSettings)
			.where(eq(productSettings.productId, productId));
	});

	revalidatePath("/dashboard/products");
}

export async function DashboardUpdateProduct(product: Product) {
	const user = getServerSession();

	if (!user?.admin) {
		return;
	}

	await db.update(products).set(product).where(eq(products.id, product.id));

	revalidatePath("/dashboard/products");
}

export async function DashboardCreateProduct(): Promise<Product | undefined> {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	const product: Product = {
		id: GenerateId(),
		name: "New Product",
		description: "Product Description",
		cost: 0,
		imageURL: "/test.png",
		showOnMain: false,
		activated: false,
	};

	await db.insert(products).values(product);
	revalidatePath("/dashboard/products");

	return product;
}

export async function DashboardAddImageToProduct(
	productId: string,
	imageURL: string,
	order: number
) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	const productImage: ProductImage = {
		id: randomUUID(),
		imageURL: imageURL,
		productId: productId,
		order: order,
	};

	await db.insert(productImages).values(productImage);
	revalidatePath("/dashboard/products/edit");
}

export async function DashboardUpdateProductImageOrders(
	images: ProductImage[]
) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	await db.transaction(async (tx) => {
		for (let i = 0; i < images.length; i++) {
			const image = images[i];

			await tx
				.update(productImages)
				.set({ order: image.order })
				.where(eq(productImages.id, image.id));
		}
	});
	revalidatePath("/dashboard/products/edit");
}

export async function DashboardDeleteProductImage(
	imageId: string,
	images: ProductImage[]
) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	await db.transaction(async (tx) => {
		await tx.delete(productImages).where(eq(productImages.id, imageId));

		for (let i = 0; i < images.length; i++) {
			const image = images[i];

			await tx
				.update(productImages)
				.set({ order: image.order })
				.where(eq(productImages.id, image.id));
		}
	});
	revalidatePath("/dashboard/products/edit");
}

export async function DashboardAddProductSettings(
	productId: string,
	size: string,
	quantity: number
) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	const settings: ProductSettings = {
		id: randomUUID(),
		productId: productId,
		size: size,
		quantity: quantity,
	};

	await db.insert(productSettings).values(settings);
	revalidatePath("/dashboard/products/edit");
}

export async function DashboardUpdateProductSettings(
	settingId: string,
	quantity: number
) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	await db
		.update(productSettings)
		.set({ quantity: quantity })
		.where(eq(productSettings.id, settingId));
	revalidatePath("/dashboard/products/edit");
}

export async function DashboardDeleteProductSettings(settingId: string) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	await db.delete(productSettings).where(eq(productSettings.id, settingId));
	revalidatePath("/dashboard/products/edit");
}

export async function MarkOrderAsProcessed(orderId: string) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	await db
		.update(orders)
		.set({ isProcessed: true, fulfilledDate: new Date() })
		.where(eq(orders.id, orderId));
	revalidatePath("/dashboard/orders");
}

export async function MarkOrderAsUnprocessed(orderId: string) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	await db.update(orders).set({ isProcessed: false, fulfilledDate: null });
	revalidatePath("/dashboard/orders");
}

export async function GetOrders(
	boughtTimestamp: number | null,
	onlyNotProcessed: boolean
) {
	const user = getServerSession();

	if (!user?.admin) {
		return undefined;
	}

	if (boughtTimestamp) {
		const boughtDate = new Date(boughtTimestamp);
		const nextDay = new Date(boughtTimestamp + 86_400_000);
		return await db.query.orders.findMany({
			where: (order, { and, eq, between }) =>
				and(
					!onlyNotProcessed ? eq(order.isProcessed, false) : undefined,

					between(orders.boughtDate, boughtDate, nextDay)
				),
			limit: 10,
		});
	} else {
		return await db.query.orders.findMany({
			where: (order, { eq }) =>
				!onlyNotProcessed ? eq(order.isProcessed, false) : undefined,
			limit: 10,
		});
	}
}

function GenerateId() {
	const characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

	let id = "";
	for (let i = 0; i < 4; i++) {
		id += characters[Math.floor(Math.random() * characters.length)];
	}

	return id;
}
