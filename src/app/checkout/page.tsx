import CheckoutForm from "@/components/ui/CheckoutForm";
import getCountry from "@/lib/country";
import db from "@/lib/db";
import { localizePrice } from "@/lib/Utils/locationUtils";
import { cartItems, productPrices, products } from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Checkout() {
	const user = getServerSession();

	if (!user) {
		redirect("/login");
	}

	const country = getCountry();

	const total = (
		await db
			.select({ total: sql<number>`sum(${productPrices.cost})` })
			.from(cartItems)
			// .innerJoin(products, eq(cartItems.productId, products.id))
			.innerJoin(
				productPrices,
				and(
					eq(cartItems.productId, productPrices.productId),
					eq(productPrices.country, country)
				)
			)
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
								<td className="pr-1">{localizePrice(total, country)}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CheckoutForm />
			</div>
		</>
	);
}
