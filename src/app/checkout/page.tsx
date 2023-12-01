import CheckoutForm from "@/components/CheckoutForm";
import getCountry from "@/lib/country";
import db from "@/lib/db";
import { localizePrice } from "@/lib/Utils/locationUtils";
import { cartItems, productPrices } from "@/lib/schema";
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
			<div className="max-w-[1000px] w-full h-full flex flex-row bg-secondary justify-center gap-16 py-20 px-2 flex-wrap">
				<div className="flex flex-col flex-[1_1_200px] h-full gap-6">
					<span className="text-primarytext text-3xl font-bold text-right w-full h-10">
						تفاصيل الفاتورة
					</span>
					<table dir="rtl" className="table-fixed">
						<tbody className="border border-zinc-300 bg-white rounded-lg">
							<tr className="text-zinc-800 text-sm text-right">
								<td className="pr-1 p-1">القيمة:</td>
								<td className="pr-1 font-semibold">
									{localizePrice(total, country)}
								</td>
							</tr>
							<tr className="text-zinc-800 text-sm text-right">
								<td className="pr-1 p-1">رسوم الشحن:</td>
								<td className="pr-1 font-semibold">
									{localizePrice(0, country)}
								</td>
							</tr>
						</tbody>
					</table>
					<table dir="rtl" className="table-fixed">
						<tbody className="border border-zinc-300 bg-white rounded-lg">
							<tr className="text-zinc-800 text-sm text-right">
								<td className="pr-1 p-1">القيمة الكلية:</td>
								<td className="pr-1 font-semibold">
									{localizePrice(total, country)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CheckoutForm />
			</div>
		</>
	);
}
