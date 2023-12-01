import db from "@/lib/db";
import { localizePrice, localizePrices } from "@/lib/Utils/locationUtils";
import { OrdersToProducts, Product, ProductSettings } from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ViewOrderPageProps {
	params: {
		id: string;
	};
}

export default async function ViewOwnOrderPage({ params }: ViewOrderPageProps) {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	const order = await db.query.orders.findFirst({
		where: (order, { and, eq }) =>
			and(eq(order.id, params.id), eq(order.userId, user.id)),
		with: {
			ordersToProducts: {
				with: { product: true, productSettings: true },
			},
		},
	});

	if (!order) {
		notFound();
	}

	return (
		<div className="container flex py-10 text-zinc-800">
			<div className="box-content flex flex-col gap-6">
				<div className="text-sm sm:text-base h-full flex flex-row flex-wrap gap-10 px-1">
					<div className="flex justify-center sm:justify-normal flex-1 min-w-fit sm:min-w-0">
						<div
							dir="rtl"
							className="flex flex-col w-full h-fit bg-zinc-300 p-2 rounded-md drop-shadow-md"
						>
							<span className="text-base sm:text-lg text-primarytext">
								تفاصيل الطلب
							</span>
							<span>رمز الطلب: {order.id}</span>
							<span>تاريخ الشراء: {order.boughtDate.toLocaleString()}</span>

							<span>
								تاريخ المعالجة:{" "}
								{order.isProcessed
									? order.boughtDate.toLocaleString()
									: "جاري المعالجة..."}
							</span>
							<span>
								السعر الكلي:{" "}
								{localizePrices(
									order.ordersToProducts.map((x) => x.cost),
									order.country
								)}
							</span>
						</div>
					</div>

					<div className="flex justify-center sm:justify-normal flex-1 min-w-fit sm:min-w-0">
						<div
							dir="rtl"
							className="flex flex-col w-full h-fit bg-zinc-300 p-2 rounded-md drop-shadow-md"
						>
							<span className="text-base sm:text-lg text-primarytext">
								تفاصيل العنوان
							</span>
							<span>الأسم: {order.firstname}</span>
							<span>أسم العائلة: {order.lastname}</span>
							<span>رقم الهاتف: {order.phonenumber}</span>
							<span>البلد: {order.location}</span>
							<span>المقاطعة: {order.region}</span>
							<span>المنطقة: {order.area}</span>
							<span>العنوان: {order.address}</span>
						</div>
					</div>
					<div className="flex flex-col flex-[2_2_0%] gap-2 min-w-full md:min-w-0">
						<table dir="rtl" className="table-fixed w-full">
							<thead className="sticky text-zinc-50 text-xs md:text-sm text-right outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
								<tr>
									<th className="font-semibold">المنتج</th>
									<th className="font-semibold">القياس</th>
									<th className="py-1 font-semibold">السعر</th>
									<th className="w-[12.5%]"></th>
								</tr>
							</thead>
							<CartItemsTable
								items={order.ordersToProducts}
								country={order.country}
							/>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

type OrderProduct = OrdersToProducts & {
	product: Product;
	productSettings: ProductSettings;
};

function CartItemsTable({
	items,
	country,
}: {
	items: OrderProduct[];
	country: string;
}) {
	return (
		<tbody>
			{items.map((x, i) => (
				<tr
					key={i}
					className="text-xs md:text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
				>
					<td className="pl-1 py-2">
						<Link
							className="text-primarytext underline hover:brightness-50"
							href={"/products/" + x.productId}
						>
							{x.product.name}
						</Link>
					</td>
					<td className="pl-1">{x.productSettings.size}</td>
					<td className="pl-1 font-semibold">
						{localizePrice(x.cost, country)}
					</td>
					<td className="relative flex items-center justify-center h-full aspect-square">
						<div className="absolute w-full h-full p-1 flex justify-center items-center">
							<img
								src={x.product.imageURL}
								alt={x.product.name}
								className="h-full object-center object-contain"
							/>
						</div>
					</td>
				</tr>
			))}
		</tbody>
	);
}
