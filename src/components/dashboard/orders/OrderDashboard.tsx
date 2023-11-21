import { Order } from "@/lib/schema";
import OrderBanner from "./OrderBanner";
import Slider from "../Slider";

interface OrderDashboardProps {
	orders: Order[];
}

export default function OrderDashboard({ orders }: OrderDashboardProps) {
	return (
		<div className="h-screen">
			<Slider perView={10}>
				{orders.map((order, i) => (
					<div key={i} className="keen-slider__slide w-full h-full ">
						<OrderBanner order={order}></OrderBanner>
					</div>
				))}
			</Slider>
		</div>
	);
}
