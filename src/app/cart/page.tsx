import BackButton from "@/components/ui/BackButton";
import CartItemsTable from "@/components/ui/CartItemsTable";
import db from "@/lib/db";
import { cartItems, products } from "@/lib/schema";
import { getServerSession } from "@/lib/userUtils";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { BsCartX } from "react-icons/bs";

export const dynamic = "force-dynamic";

export default async function Cart() {
	const user = getServerSession();

	const cart = user
		? await db
				.select()
				.from(cartItems)
				.where(eq(cartItems.userId, user.id))
				.innerJoin(products, eq(cartItems.productId, products.id))
		: [];

	if (cart.length == 0) {
		return (
			<div className="flex flex-col gap-4 place-self-center items-center py-20">
				<span className="text-zinc-800 text-3xl font-semibold place-self-center">
					سلة التسوق فارغة
				</span>
				<BsCartX className="w-48 h-48 fill-primary" />
				<Link
					href="/products"
					className="w-48 h-12 bg-white text-zinc-800 brightness-100 hover:brightness-95 rounded-lg flex items-center justify-center drop-shadow-lg transition"
				>
					<span className="text-2xl">أبدأ بالتسوق</span>
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-row w-full h-full flex-1 bg-secondary px-64 justify-center gap-16 p-20">
				<div className="flex flex-col h-full w-full gap-3">
					<span className="text-primarytext text-3xl font-bold text-right w-full h-10">
						تفاصيل الفاتورة
					</span>
					<table className="table-fixed border-separate border-spacing-y-6">
						<thead className="text-black text-sm text-right outline outline-zinc-300 bg-zinc-300 rounded-sm">
							<tr>
								<th>القيمة الكلية</th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-black text-sm text-right outline outline-zinc-300 bg-white rounded-sm">
								<td className="pr-1">
									$
									{cart.reduce((acc, x) => acc + x.products.cost, 0).toFixed(2)}
								</td>
							</tr>
						</tbody>
					</table>
					<button className="bg-primary hover:brightness-95 h-7 w-full rounded-md">
						متابعة الشراء
					</button>
					<BackButton>
						<div className=" text-black bg-white hover:brightness-[.98] h-7 w-full rounded-md">
							العودة للتسوق
						</div>
					</BackButton>
				</div>
				<div className="flex flex-col h-full w-[150%] gap-7">
					<span className="text-primarytext text-3xl font-bold text-right w-full h-10">
						المنتجات
					</span>
					<table className="table-fixed w-full">
						<thead className="sticky text-zinc-50 text-sm text-right outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
							<tr>
								<th className="w-[7%]"></th>
								<th className="w-[7%]"></th>
								<th className="py-1 font-semibold">السعر</th>
								<th className="font-semibold">المنتج</th>
							</tr>
						</thead>
						<CartItemsTable items={cart}></CartItemsTable>
					</table>
				</div>
			</div>
		</>
	);
}
