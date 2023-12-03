import CheckoutForm from "@/components/CheckoutForm";
import getCountry from "@/lib/country";
import db from "@/lib/db";
import { localizePrice } from "@/lib/Utils/locationUtils";
import { cartItems, productPrices } from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import getLanguage, { getDirection } from "@/lib/languages/language";
import { getDictionary } from "@/lib/languages/dictionaries";

export default async function Checkout() {
	const user = getServerSession();

	if (!user) {
		redirect("/login");
	}

	const country = getCountry();

	const language = getLanguage();
	const checkoutDict = (await getDictionary(language)).checkout;
	const dir = getDirection();

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
			<div
				dir="ltr"
				className="max-w-[1000px] w-full h-full flex flex-row bg-secondary justify-center gap-16 py-20 px-2 flex-wrap"
			>
				<div dir={dir} className="flex flex-col flex-[1_1_200px] h-full gap-6">
					<span className="text-primarytext text-3xl font-bold w-full h-10">
						{checkoutDict.billDetails}
					</span>
					<table className="table-fixed">
						<tbody className="border border-zinc-300 bg-white rounded-lg">
							<tr className="text-zinc-800 text-sm">
								<td className="px-1 p-1">{checkoutDict.cost}:</td>
								<td className="px-1 font-semibold">
									{localizePrice(total, country)}
								</td>
							</tr>
							<tr className="text-zinc-800 text-sm">
								<td className="px-1 p-1">{checkoutDict.shipping}:</td>
								<td className="px-1 font-semibold">
									{localizePrice(0, country)}
								</td>
							</tr>
						</tbody>
					</table>
					<table className="table-fixed">
						<tbody className="border border-zinc-300 bg-white rounded-lg">
							<tr className="text-zinc-800 text-sm">
								<td className="px-1 p-1">{checkoutDict.totalCost}:</td>
								<td className="px-1 font-semibold">
									{localizePrice(total, country)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div
					dir={dir}
					className="flex flex-col items-end gap-6 flex-[2_2_auto]"
				>
					<span className="text-primarytext text-3xl font-bold w-full h-10">
						{checkoutDict.addressDetails}
					</span>
					<CheckoutForm dict={checkoutDict.locationForm} dir={dir} />
				</div>
			</div>
		</>
	);
}
