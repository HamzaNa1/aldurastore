import { SubmitButton } from "@/components/ui/SubmitButton";
import { localizePrices } from "@/lib/Utils/locationUtils";
import { getServerSession } from "@/lib/Utils/userUtils";
import db from "@/lib/db";
import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Account() {
	async function logout() {
		"use server";

		const cookiesStore = cookies();
		cookiesStore.delete("token");

		redirect("/");
	}

	const user = getServerSession();

	if (!user) {
		redirect("/login");
	}

	const language = getLanguage();
	const accountDict = (await getDictionary(language)).account;

	const orders = await db.query.orders.findMany({
		where: (order, { eq }) => eq(order.userId, user.id),
		with: {
			ordersToProducts: true,
		},
		orderBy: (order, { desc }) => desc(order.boughtDate),
		limit: 7,
	});

	return (
		<div className="container flex flex-row bg-secondary gap-6 px-1 py-10 flex-wrap-reverse">
			<div className="flex flex-col flex-1 items-center gap-10">
				<span className="text-primarytext text-3xl">{accountDict.account}</span>
				<div className="flex flex-col overflow-hidden text-zinc-800 whitespace-nowrap">
					<span className="font-semibold">
						{accountDict.username}: {user.name}
					</span>
					<span className="font-semibold">
						{accountDict.email}: {user.email}
					</span>
				</div>
				<form action={logout}>
					<SubmitButton
						className="bg-[#D93737] px-20 py-1 rounded-xl drop-shadow-lg hover:brightness-95 disabled:brightness-90"
						fallback={null}
					>
						<span>{accountDict.logout}</span>
					</SubmitButton>
				</form>
			</div>
			<div className="flex flex-col flex-[2_2_0] items-center gap-4">
				<span className="text-primarytext text-3xl">{accountDict.orders}</span>
				<div className="w-full">
					{orders.length > 0 ? (
						<table className="table-auto w-full min-[550px]:min-w-[520px]">
							<thead className="sticky text-zinc-50 text-xs md:text-sm text-left outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
								<tr>
									<th className="py-1 font-semibold">
										{accountDict.ordersTable.processDate}
									</th>
									<th className="py-1 font-semibold">
										{accountDict.ordersTable.orderDate}
									</th>
									<th className="py-1 font-semibold">
										{accountDict.ordersTable.totalCost}
									</th>
									<th className="font-semibold">
										{accountDict.ordersTable.orderId}
									</th>
								</tr>
							</thead>
							<tbody className="text-zinc-800">
								{orders.map((order) => (
									<tr
										key={order.id}
										className="text-xs md:text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
									>
										<td className="pl-1 font-semibold">
											{order.isProcessed
												? order.boughtDate.toLocaleString()
												: accountDict.ordersTable.processing}
										</td>
										<td className="pl-1 font-semibold">
											{order.boughtDate.toLocaleString()}
										</td>
										<td className="pl-1 font-semibold">
											{localizePrices(
												order.ordersToProducts.map((x) => x.cost),
												order.country
											)}
										</td>
										<td className="pl-1 py-2">
											<Link
												className="text-primarytext underline hover:brightness-50"
												href={"/orders/" + order.id}
											>
												{order.id}
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="flex mt-10 justify-center items-center">
							<span className="whitespace-nowrap text-zinc-800 text-xl">
								{accountDict.noOrders}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
