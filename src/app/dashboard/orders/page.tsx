import OrderDashboard from "@/components/dashboard/orders/OrderDashboard";
import db from "@/lib/db";
import { getServerSession } from "@/lib/userUtils";
import { notFound } from "next/navigation";

export default async function ManageProducts() {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	const orders = await db.query.orders.findMany();

	return (
		<div className="container flex flex-col m-10 gap-1 text-zinc-800">
			<OrderDashboard orders={orders}></OrderDashboard>
		</div>
	);
}
