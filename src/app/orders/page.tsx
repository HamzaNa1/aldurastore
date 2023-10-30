import OrderView from "@/components/OrderView";

export default function Orders() {
	const testOrder = {
		id: "AAAA-AAAA-AAAA-AAAA",
		isProcessed: true,
		boughtDate: new Date(),
		fulfilledDate: null,
	};

	return (
		<div className="w-full flex flex-col bg-secondary justify-center items-center gap-20">
			<span className="text-primarytext text-5xl">طلباتك</span>
			<div className="outline outline-black outline-1">
				<OrderView
					id={testOrder.id}
					isProcessed={testOrder.isProcessed}
					boughtDate={testOrder.boughtDate}
					fulfilledDate={testOrder.fulfilledDate}
				></OrderView>
				<OrderView
					id={testOrder.id}
					isProcessed={testOrder.isProcessed}
					boughtDate={testOrder.boughtDate}
					fulfilledDate={testOrder.fulfilledDate}
				></OrderView>
				<OrderView
					id={testOrder.id}
					isProcessed={testOrder.isProcessed}
					boughtDate={testOrder.boughtDate}
					fulfilledDate={testOrder.fulfilledDate}
				></OrderView>
			</div>
		</div>
	);
}
