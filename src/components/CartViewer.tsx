"use client";

import { DeleteCartItem } from "@/actions/GeneralActions";
import { localizePrice } from "@/lib/Utils/locationUtils";
import { CartItem, Product, ProductPrice, ProductSettings } from "@/lib/schema";
import Image from "next/image";
import { FaSquareXmark } from "react-icons/fa6";
import { SubmitButton } from "./ui/SubmitButton";
import { CartTableDict } from "@/lib/languages/types";

type CartItemsWithProducts = CartItem & {
	product: Product & { productPrices: ProductPrice[] };
	productSettings: ProductSettings;
};

interface CartViewerProps {
	cartItems: CartItemsWithProducts[];
	dir: "rtl" | "ltr";
	cartTableDict: CartTableDict;
}

export default function CartTable({
	cartItems,
	dir,
	cartTableDict,
}: CartViewerProps) {
	return (
		<>
			<table className="sticky table-fixed w-full">
				<thead className="sticky text-zinc-50 text-sm outline outline-[0.5px] rounded-tr-sm rounded-tl-sm bg-primary outline-primary h-fit">
					<tr className={dir == "rtl" ? "text-right" : "text-left"}>
						<th className="font-semibold">{cartTableDict.product}</th>
						<th className="font-semibold">{cartTableDict.size}</th>
						<th className="py-1 font-semibold">{cartTableDict.price}</th>
						<th className="w-[12.5%]"></th>
						<th className="w-[7%]"></th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((item) => (
						<tr
							key={item.id}
							className={
								"text-zinc-800 text-sm outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
							}
						>
							<td className="relative px-1 py-2">
								{item.productSettings.quantity <= 0 && (
									<div
										className={
											"select-none absolute text-xs text-white pb-[2px] px-[2px] bg-red-500 top-[1px]" +
											(dir == "rtl"
												? " right-0 rounded-bl-md pl-1"
												: " left-0 rounded-br-md pr-1")
										}
									>
										{cartTableDict.nostock}
									</div>
								)}
								{item.product.name}
							</td>
							<td className="px-1 py-2">{item.productSettings.size}</td>
							<td className="px-1 font-semibold">
								{localizePrice(
									item.product.productPrices[0].cost,
									item.product.productPrices[0].country
								)}
							</td>
							<td className="relative flex items-center justify-center h-full aspect-square">
								<div className="absolute w-full h-full p-1 flex justify-center items-center">
									<Image
										src={item.product.imageURL}
										alt={item.product.name}
										className="absolute h-full object-center object-contain"
										fill
									/>
								</div>
							</td>
							<td className="h-full aspect-square">
								<div className="w-full h-full flex justify-center items-center">
									<form
										action={async () => {
											"use server";
											if (!item.id) {
												return;
											}

											await DeleteCartItem(item.id);
										}}
									>
										<SubmitButton
											className="w-4 h-4 disabled:brightness-50"
											fallback={undefined}
										>
											<FaSquareXmark className="w-full h-full fill-primary hover:brightness-90 transition duration-300" />
										</SubmitButton>
									</form>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
