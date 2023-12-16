"use client";

import { Order, OrdersToProducts, Product } from "@/lib/schema";
import OrderBanner from "./OrderBanner";
import { useEffect, useState } from "react";
import Slider from "../Slider";
import { IoDownloadOutline } from "react-icons/io5";
import { toast } from "sonner";

type OrderWithProducts = Order & {
	ordersToProducts: OrdersToProducts[];
};

interface OrderDashboardProps {
	action: (
		boughtTimestamp: number | null,
		processed: boolean
	) => Promise<OrderWithProducts[] | undefined>;
}

export default function OrderDashboard({ action }: OrderDashboardProps) {
	const [orders, setOrders] = useState<OrderWithProducts[]>([]);
	const [processed, setProcessed] = useState(true);

	const [date, setDate] = useState<Date | null>(null);

	useEffect(() => {
		setOrders([]);

		const refreshOrders = async (signal: AbortSignal) => {
			const newOrders = await action(date?.getTime() ?? null, processed);
			signal.throwIfAborted();

			setOrders(newOrders ?? []);
		};

		const controller = new AbortController();
		refreshOrders(controller.signal);

		return () => controller.abort("cancel");
	}, [date, processed]);

	const handleDownloadOrders = () => {
		if (orders.length == 0) {
			toast.error("No orders to download");
			return;
		}

		let csv = [
			"order id,user id,currency,price,product amount,date,is processed,process date,first name,last name,phone number,location,region,area,address",
		];

		orders.forEach(
			(order) =>
				(csv = [
					...csv,
					`${order.id},${order.userId},${order.country},${order.ordersToProducts
						.reduce((acc, x) => acc + x.cost, 0)
						.toFixed(2)},${
						order.ordersToProducts.length
					},\"${order.boughtDate.toLocaleString()}\",${order.isProcessed},\"${
						order.fulfilledDate?.toLocaleString() ?? ""
					}\",${order.firstname},${order.lastname},${order.phonenumber},${
						order.location
					},${order.region},${order.area},${order.address}`,
				])
		);

		const file = new Blob(["\ufeff", csv.join("\n")], { type: "text/plain" });
		const url = URL.createObjectURL(file);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${date?.toDateString() ?? "orders"}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<>
			<div className="flex flex-row gap-6">
				<input
					onChange={(e) => {
						if (!e.currentTarget.valueAsDate) {
							setDate(null);
							return;
						}

						const newDate = e.currentTarget.valueAsDate;
						newDate.setHours(0, 0, 0, 0);

						setDate(newDate);
					}}
					value={date ? GetDateAsString(date) : ""}
					type="date"
				/>
				<div onClick={() => setProcessed((prev) => !prev)}>
					<input onChange={() => {}} checked={processed} type="checkbox" />
					<label> Show Unprocessed Only </label>
				</div>
				<button onClick={handleDownloadOrders} className="h-full aspect-square">
					<IoDownloadOutline className="w-full h-full fill-zinc-800" />
				</button>
			</div>
			<div className="h-screen">
				{orders.length > 0 ? (
					<Slider>
						{orders.map((order, i) => (
							<div key={i} className="flex-[0_0_10%]">
								<OrderBanner order={order}></OrderBanner>
							</div>
						))}
					</Slider>
				) : (
					<div className="flex h-full justify-center items-center">
						<span className="text-6xl">No Orders</span>
					</div>
				)}
			</div>
		</>
	);
}

function GetDateAsString(date: Date) {
	const day = ("0" + date.getDate()).slice(-2);
	const month = ("0" + (date.getMonth() + 1)).slice(-2);
	const year = date.getFullYear();

	return year + "-" + month + "-" + day;
}
