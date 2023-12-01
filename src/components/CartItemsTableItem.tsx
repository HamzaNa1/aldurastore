"use client";

import { CartItem, Product, ProductPrice, ProductSettings } from "@/lib/schema";
import { SubmitButton } from "./ui/SubmitButton";
import { FaSquareXmark } from "react-icons/fa6";
import { DeleteCartItem } from "@/actions/GeneralActions";
import { useState } from "react";
import { localizePrice } from "@/lib/Utils/locationUtils";

type CartItemWithProduct = CartItem & {
	product: Product & { productPrices: ProductPrice[] };
	productSettings: ProductSettings;
};

interface CartItemsTableItemProps {
	cartItemWithProduct: CartItemWithProduct;
}

export default function CartItemsTableItem({
	cartItemWithProduct,
}: CartItemsTableItemProps) {
	const [pending, setPending] = useState(false);

	return (
		<tr
			className={
				"text-zinc-800 text-sm text-right outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit " +
				(pending ? "brightness-75" : "")
			}
		>
			<td className="h-full aspect-square text-left">
				<div className="w-full h-full flex justify-center items-center">
					<form
						action={async () => {
							if (!cartItemWithProduct.id) {
								return;
							}

							setPending(true);
							await DeleteCartItem(cartItemWithProduct.id);
							setPending(false);
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
			<td className="relative flex items-center justify-center h-full aspect-square">
				<div className="absolute w-full h-full p-1 flex justify-center items-center">
					<img
						src={cartItemWithProduct.product.imageURL}
						alt={cartItemWithProduct.product.name}
						className="h-full object-center object-contain"
					/>
				</div>
			</td>
			<td className="pr-1 font-semibold">
				{localizePrice(
					cartItemWithProduct.product.productPrices[0].cost,
					cartItemWithProduct.product.productPrices[0].country
				)}
			</td>
			<td className="pr-1 py-2">
				{`${cartItemWithProduct.productSettings.size} ${cartItemWithProduct.product.name}`}
			</td>
		</tr>
	);
}
