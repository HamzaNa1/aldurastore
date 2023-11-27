import { CreateOrder } from "@/actions/GeneralActions";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { localizePrices } from "@/lib/Utils/locationUtils";
import { getServerSession } from "@/lib/Utils/userUtils";
import db from "@/lib/db";
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

	const orders = await db.query.orders.findMany({
		where: (order, { eq }) => eq(order.userId, user.id),
		with: {
			ordersToProducts: true,
		},
	});

	return (
		<div className="container flex flex-row bg-secondary gap-20 p-10 flex-wrap">
			<div className="flex flex-col flex-1 items-center gap-2">
				<span className="text-primarytext text-3xl">طلباتك</span>
				<div className="w-full">
					{orders.length > 0 ? (
						<table className="table-auto w-full text-right">
							<thead className="sticky text-zinc-50 text-sm text-left outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
								<tr className="text-right">
									<th className="py-1 font-semibold">تاريخ المعالجة</th>
									<th className="py-1 font-semibold">تاريخ الطلب</th>
									<th className="py-1 font-semibold">القيمة الكلية</th>
									<th className="font-semibold">رقم الطلب</th>
								</tr>
							</thead>
							<tbody className="text-zinc-800">
								{orders.map((order) => (
									<tr
										key={order.id}
										className="text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
									>
										<td dir="rtl" className="pl-1 font-semibold">
											{order.isProcessed
												? order.boughtDate.toLocaleString()
												: "جاري المعالجة..."}
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
												href={"/products/" + order.id}
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
							<span
								dir="rtl"
								className="whitespace-nowrap text-zinc-800 text-xl"
							>
								ليس لديك طلبات!
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col flex-1 items-center gap-10">
				<span className="text-primarytext text-3xl">الحساب</span>
				<div className="flex flex-col overflow-hidden text-zinc-800 whitespace-nowrap text-right">
					<span className="font-semibold">
						<span>{user.name} :</span>أسم المستخدم
					</span>
					<span className="font-semibold">
						<span>{user.email} :</span>الأيميل
					</span>
				</div>
				<form action={logout}>
					<SubmitButton
						className="bg-[#D93737] px-20 py-1 rounded-xl drop-shadow-lg hover:brightness-95 disabled:brightness-90"
						fallback={null}
					>
						<span>Logout</span>
					</SubmitButton>
				</form>
			</div>
		</div>
	);
}
