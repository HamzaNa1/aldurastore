import db from "@/lib/db";
import { OrdersToProducts, Product, orderRelations } from "@/lib/schema";
import { getServerSession } from "@/lib/userUtils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ViewOrderPageProps {
	params: {
		id: string;
	};
}

export default async function ViewOrderPage({ params }: ViewOrderPageProps) {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	return (
		<div className="container py-10">
			<Suspense>
				<OrderView orderId={params.id} />
			</Suspense>
		</div>
	);
}

async function OrderView({ orderId }: { orderId: string }) {
	const order = await db.query.orders.findFirst({
		where: (order, { eq }) => eq(order.id, orderId),
		with: {
			ordersToProducts: {
				with: { product: true },
			},
			user: true,
		},
	});

	if (!order) {
		notFound();
	}

	return (
		<div className="w-full h-full flex flex-row">
			<div className="flex flex-col flex-1">
				<span className="text-zinc-800">Id: {order.id}</span>
				<span className="text-zinc-800">
					Bought Date: {order.boughtDate.toLocaleString()}
				</span>
				<span className="text-zinc-800">
					Is Processed: {String(order.isProcessed)}
				</span>
				{order.fulfilledDate && (
					<span className="text-zinc-800">
						Fulfilled Date: {order.fulfilledDate.toLocaleString()}
					</span>
				)}
			</div>
			<div className="flex flex-col flex-1">
				<span className="text-zinc-800">User Id: {order.userId}</span>
				<span className="text-zinc-800">Username: {order.user.name}</span>
				<span className="text-zinc-800">Email: {order.user.email}</span>
			</div>
			<div className="flex flex-col flex-1 gap-2">
				<span className="text-zinc-800">
					Total Cost:{" "}
					{order.ordersToProducts
						.reduce((acc, x) => acc + x.cost, 0)
						.toFixed(2)}
				</span>
				<table className="table-fixed w-full">
					<thead className="sticky text-zinc-50 text-sm text-left outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
						<tr>
							<th className="font-semibold">Product</th>
							<th className="py-1 font-semibold">Cost</th>
							<th className="w-[7%]"></th>
						</tr>
					</thead>
					<CartItemsTable items={order.ordersToProducts}></CartItemsTable>
				</table>
			</div>
		</div>
	);
}

type OrdersToProductsWithProducts<OrdersToProducts> =
	Partial<OrdersToProducts> & {
		product: Product;
	};

function CartItemsTable({
	items,
}: {
	items: OrdersToProductsWithProducts<OrdersToProducts>[];
}) {
	return (
		<tbody>
			{items.map((x, i) => (
				<tr
					key={i}
					className="text-zinc-800 text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
				>
					<td className="pl-1 py-2">
						<Link
							className="text-primarytext underline hover:brightness-50"
							href={"/products/" + x.productId}
						>
							{x.product.name}
						</Link>
					</td>
					<td className="pl-1 font-semibold">${x.cost}</td>
					<td className="relative flex items-center justify-center h-full aspect-square">
						<div className="absolute w-full h-full p-1 flex justify-center items-center">
							<img
								src={x.product.imageURL}
								alt=""
								className="h-full object-center object-contain"
							/>
						</div>
					</td>
				</tr>
			))}
		</tbody>
	);
}
