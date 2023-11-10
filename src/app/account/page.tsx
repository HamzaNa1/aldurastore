import { SubmitButton } from "@/components/ui/SubmitButton";
import { getServerSession } from "@/lib/userUtils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Account() {
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

	const testOrder = {
		id: "AAAA-AAAA-AAAA-AAAA",
		cost: 40,
		isProcessed: true,
		boughtDate: new Date(),
		fulfilledDate: new Date(),
	};

	const orders = [
		testOrder,
		testOrder,
		testOrder,
		testOrder,
		testOrder,
		testOrder,
		testOrder,
		testOrder,
		testOrder,
		testOrder,
	];

	return (
		<div className="container flex flex-row bg-secondary gap-20 p-10">
			<div className="flex flex-col justify-center items-center w-full gap-2">
				<span className="text-primarytext text-3xl">طلباتك</span>
				<div className="w-full outline outline-black outline-1">
					<table className="w-full table-auto text-zinc-800 border-separate border-spacing-4">
						<thead>
							<tr>
								<th>Link</th>
								<th>تاريخ التوصيل</th>
								<th>تاريخ الشراء</th>
								<th>السعر</th>
								<th>رقم الطلب</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{orders.map((order, i) => (
								<tr key={i}>
									<td>link</td>
									<td>{order.fulfilledDate.toLocaleDateString()}</td>
									<td>{order.boughtDate.toLocaleDateString()}</td>
									<td>${order.cost}</td>
									<td>{order.id}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="flex-grow flex flex-col h-full items-center gap-10">
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
						className="bg-[#D93737] px-20 py-1 rounded-xl drop-shadow-lg hover:brightness-95 aria-disabled:brightness-90"
						fallback={null}
					>
						<span>Logout</span>
					</SubmitButton>
				</form>
			</div>
		</div>
	);
}
