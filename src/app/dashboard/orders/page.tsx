import { GetOrders } from "@/actions/DashboardActions";
import OrderDashboard from "@/components/dashboard/orders/OrderDashboard";
import { getServerSession } from "@/lib/Utils/userUtils";
import { notFound } from "next/navigation";

export default async function ManageProducts() {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	return (
		<div className="container flex flex-col m-10 gap-1 text-zinc-800">
			<OrderDashboard action={GetOrders} />
		</div>
	);
}
