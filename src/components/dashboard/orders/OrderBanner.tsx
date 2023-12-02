"use client";

import { Order } from "@/lib/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OrderBannerProps {
	order: Order;
}

export default function OrderBanner({ order }: OrderBannerProps) {
	return (
		<div className={"flex w-full h-full bg-zinc-300"}>
			<div className="flex flex-col p-2 w-full justify-start text-zinc-700">
				<Link
					className="text-primarytext underline hover:brightness-50 flex text-center"
					href={"/dashboard/orders/" + order.id}
				>
					{order.id}
				</Link>
			</div>
			<div className="flex flex-col p-2 w-full justify-start text-zinc-700">
				<span className="text-zinc-800" suppressHydrationWarning>
					Bought Date: {order.boughtDate.toLocaleString()}
				</span>
			</div>
			<div className="flex flex-col p-2 w-full justify-start text-zinc-700">
				<span className="text-zinc-800">
					Is Processed: {String(order.isProcessed)}
				</span>
				{order.fulfilledDate && (
					<span className="text-zinc-800" suppressHydrationWarning>
						Fulfilled Date: {order.fulfilledDate.toLocaleString()}
					</span>
				)}
			</div>
		</div>
	);
}
