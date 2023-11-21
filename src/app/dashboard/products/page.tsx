import ProductDashboard from "@/components/dashboard/products/ProductDashboard";
import db from "@/lib/db";
import { getServerSession } from "@/lib/userUtils";
import { notFound } from "next/navigation";

export default async function ManageProducts() {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	const products = await db.query.products.findMany();

	return (
		<div className="container flex flex-col m-10 gap-1 text-zinc-800">
			<ProductDashboard products={products}></ProductDashboard>
		</div>
	);
}
