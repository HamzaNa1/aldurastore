"use client";

import { Order } from "@/lib/schema";
import OrderBanner from "./OrderBanner";
import { useEffect, useState } from "react";
import Slider from "../Slider";

interface OrderDashboardProps {
	action: (
		boughtTimestamp: number | null,
		processed: boolean
	) => Promise<Order[] | undefined>;
}

export default function OrderDashboard({ action }: OrderDashboardProps) {
	const [orders, setOrders] = useState<Order[]>([]);
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
			</div>
			<div className="h-screen">
				{orders.length > 0 && (
					<Slider>
						{orders.map((order, i) => (
							<div key={i} className="flex-[0_0_10%]">
								<OrderBanner order={order}></OrderBanner>
							</div>
						))}
					</Slider>
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
