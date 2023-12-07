import db from "@/lib/db";
import { localizePrice, localizePrices } from "@/lib/Utils/locationUtils";
import { OrdersToProducts, Product, ProductSettings } from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import Link from "next/link";
import { notFound } from "next/navigation";
import getLanguage from "@/lib/languages/language";
import { getDictionary } from "@/lib/languages/dictionaries";
import Image from "next/image";

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

	const language = getLanguage();
	const orderDict = (await getDictionary(language)).order;

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
								{orderDict.order.orderDetails}
							</span>
							<span>
								{orderDict.order.orderId}: {order.id}
							</span>
							<span>
								{orderDict.order.orderDate}: {order.boughtDate.toLocaleString()}
							</span>

							<span>
								{orderDict.order.processDate}:{" "}
								{order.isProcessed
									? order.boughtDate.toLocaleString()
									: orderDict.order.processing}
							</span>
							<span>
								{orderDict.order.totalCost}:{" "}
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
								{orderDict.address.addressDetails}
							</span>
							<span>
								{orderDict.address.name}: {order.firstname}
							</span>
							<span>
								{orderDict.address.lastName}: {order.lastname}
							</span>
							<span>
								{orderDict.address.phoneNumber}: {order.phonenumber}
							</span>
							<span>
								{orderDict.address.location}: {order.location}
							</span>
							<span>
								{orderDict.address.region}: {order.region}
							</span>
							<span>
								{orderDict.address.area}: {order.area}
							</span>
							<span>
								{orderDict.address.address}: {order.address}
							</span>
						</div>
					</div>
					<div className="flex flex-col flex-[2_2_0%] gap-2 min-w-full md:min-w-0">
						<table dir="rtl" className="table-fixed w-full">
							<thead className="sticky text-zinc-50 text-xs md:text-sm text-right outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
								<tr>
									<th className="font-semibold">
										{orderDict.ordersTable.product}
									</th>
									<th className="font-semibold">
										{orderDict.ordersTable.size}
									</th>
									<th className="py-1 font-semibold">
										{orderDict.ordersTable.price}
									</th>
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
			{items.map((item, i) => (
				<tr
					key={i}
					className="text-xs md:text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
				>
					<td className="pl-1 py-2">
						<Link
							className="text-primarytext underline hover:brightness-50"
							href={"/products/" + item.productId}
						>
							{item.product.name}
						</Link>
					</td>
					<td className="pl-1">{item.productSettings.size}</td>
					<td className="pl-1 font-semibold">
						{localizePrice(item.cost, country)}
					</td>
					<td className="relative flex items-center justify-center h-full aspect-square">
						<div className="absolute w-full h-full p-1 flex justify-center items-center">
							<Image
								src={item.product.imageURL}
								alt={item.product.name}
								className="absolute h-full object-center object-contain"
								fill
							/>
						</div>
					</td>
				</tr>
			))}
		</tbody>
	);
}
