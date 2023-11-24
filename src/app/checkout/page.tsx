import CheckoutForm from "@/components/ui/CheckoutForm";
import db from "@/lib/db";
import { cartItems, products } from "@/lib/schema";
import { getServerSession } from "@/lib/userUtils";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Checkout() {
	const user = getServerSession();

	if (!user) {
		redirect("/login");
	}

	const total = (
		await db
			.select({ total: sql<number>`sum(${products.cost})` })
			.from(cartItems)
			.innerJoin(products, eq(cartItems.productId, products.id))
			.where(eq(cartItems.userId, user.id))
	)[0].total;

	return (
		<>
			<div className="flex flex-row container h-full bg-secondary justify-center gap-16 py-20 px-2 flex-wrap">
				<div className="flex flex-col flex-[1_1_200px] h-full gap-3">
					<span className="text-primarytext text-3xl font-bold text-right w-full h-10">
						تفاصيل الفاتورة
					</span>
					<table className="table-fixed border-separate border-spacing-y-6">
						<thead className="text-black text-sm text-right outline outline-zinc-300 bg-zinc-300 rounded-sm">
							<tr>
								<th>القيمة الكلية</th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-black text-sm text-right outline outline-zinc-300 bg-white rounded-sm">
								<td className="pr-1">${total.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CheckoutForm />
			</div>
		</>
	);
}
