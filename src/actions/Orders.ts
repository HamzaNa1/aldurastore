"use server";

import db from "@/lib/db";
import { Order } from "@/lib/schema";

export async function GetOrders() {
	const result: Order[] = await db.query.orders.findMany({});

	return result;
}

export async function GetOrdersByUser(userId: string) {
	const result: Order[] = await db.query.orders.findMany({
		where: (order, { eq }) => eq(order.userId, userId),
	});

	return result;
}
