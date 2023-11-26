import { getServerSession } from "@/lib/Utils/userUtils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Dashboard() {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	return (
		<div className="container py-10 flex flex-col justify-center items-center text-zinc-800 gap-2">
			<Link
				href="/dashboard/products"
				className="w-64 h-16 bg-zinc-300 rounded-lg hover:brightness-90 flex items-center justify-center"
			>
				Manage Products
			</Link>
			<Link
				href="dashboard/orders"
				className="w-64 h-16 bg-zinc-300 rounded-lg hover:brightness-90 flex items-center justify-center"
			>
				Manage Orders
			</Link>
		</div>
	);
}
