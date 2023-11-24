"use client";

import { Order } from "@/lib/schema";
import { useRouter } from "next/navigation";

interface OrderBannerProps {
	order: Order;
}

export default function OrderBanner({ order }: OrderBannerProps) {
	const router = useRouter();

	return (
		<div className={"flex w-full h-full bg-zinc-300"}>
			<div className="flex flex-col p-2 w-full justify-start text-zinc-700">
				<button
					className="text-primarytext underline hover:brightness-50"
					onClick={() => {
						router.push("/dashboard/orders/" + order.id);
					}}
				>
					{order.id}
				</button>
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
