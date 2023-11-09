import OrderView from "@/components/OrderView";
import { idText } from "typescript";

export default function Orders() {
	const testOrder = {
		id: "AAAA-AAAA-AAAA-AAAA",
		cost: 40,
		isProcessed: true,
		boughtDate: new Date(),
		fulfilledDate: new Date(),
	};

	const orders = [testOrder, testOrder, testOrder];

	return (
		<div className="container flex flex-col bg-secondary justify-center items-center gap-20 p-10">
			<span className="text-primarytext text-5xl">طلباتك</span>
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
	);
}
