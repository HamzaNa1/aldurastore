import {
	MarkOrderAsProcessed,
	MarkOrderAsUnprocessed,
} from "@/actions/DashboardActions";
import BackButton from "@/components/ui/BackButton";
import { SubmitButton } from "@/components/ui/SubmitButton";
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
		<div className="container flex py-10 text-zinc-800">
			<Suspense fallback={<h1 className="m-auto text-4xl">LOADING...</h1>}>
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
		<div className="box-content flex flex-col gap-6 py-10">
			<div className="h-full flex flex-row flex-wrap gap-6">
				<div className="flex flex-col flex-1 gap-10">
					<div className="flex flex-col">
						<span>Id: {order.id}</span>
						<span>Bought Date: {order.boughtDate.toLocaleString()}</span>
						<span className="line-clamp-1">
							Is Processed: {String(order.isProcessed)}
						</span>
						{order.fulfilledDate && (
							<span>
								Fulfilled Date: {order.fulfilledDate.toLocaleString()}
							</span>
						)}
					</div>
					<form
						action={async () => {
							"use server";

							if (order.isProcessed) {
								await MarkOrderAsUnprocessed(order.id);
							} else {
								await MarkOrderAsProcessed(order.id);
							}
						}}
					>
						<div className="flex flex-col gap-2 w-[50%]">
							<SubmitButton
								className="w-full bg-zinc-300 hover:brightness-90 disabled:brightness-90"
								fallback={
									order.isProcessed ? "Unprocessing..." : "Processing..."
								}
							>
								{order.isProcessed
									? "Mark as Unprocessed"
									: "Mark as Processed"}
							</SubmitButton>
							<BackButton className="w-full bg-zinc-300 hover:brightness-90">
								Back
							</BackButton>
						</div>
					</form>
				</div>
				<div className="flex flex-col flex-1 flex-shrink">
					<span>User Id: {order.userId}</span>
					<span>Username: {order.user.name}</span>
					<span>Email: {order.user.email}</span>
				</div>
				<div className="flex flex-col flex-1 gap-2 flex-shrink-0">
					<span>
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
		</div>
	);
}

type OrdersToProductsWithProducts = OrdersToProducts & {
	product: Product;
};

function CartItemsTable({ items }: { items: OrdersToProductsWithProducts[] }) {
	return (
		<tbody>
			{items.map((x, i) => (
				<tr
					key={i}
					className="text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
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