import Link from "next/link";

interface OrderViewProps {
	id: string;
	isProcessed: boolean;
	boughtDate: Date;
	fulfilledDate: Date | null;
}

export default function OrderView({
	id,
	isProcessed,
	boughtDate,
	fulfilledDate,
}: OrderViewProps) {
	return (
		<div className="flex flex-row text-zinc-800 gap-5 p-5">
			<Link href={`/orders/${id}`} className="hover:underline">
				{id}
			</Link>
			<span>Processed: {isProcessed ? "YES" : "NO"}</span>
			<span>Date: {boughtDate.toLocaleString()}</span>
			<span>
				Fulfilled Date: {fulfilledDate?.toLocaleString() ?? "Not Fulfilled Yet"}
			</span>
		</div>
	);
}
