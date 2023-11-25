"use client";

import { CartItem, Product, ProductPrice, ProductSettings } from "@/lib/schema";
import { useEffect, useState } from "react";
import CartItemsTableItem from "./CartItemsTableItem";

type CartItemWithProduct = CartItem & {
	product: Product & { productPrices: ProductPrice[] };
	productSettings: ProductSettings;
};

interface CartItemsTableProps {
	items: CartItemWithProduct[];
}

export default function CartItemsTable({ items }: CartItemsTableProps) {
	const [isLoaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!isLoaded) {
		return (
			<>
				<tbody>
					<tr className="relative w-full text-zinc-800 text-sm text-right outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit">
						<td className="h-full aspect-square text-left">
							<div className="w-full h-full flex justify-center items-center">
								<div className="w-4 h-4 bg-secondary animate-pulse rounded-sm"></div>
							</div>
						</td>
						<td className="relative flex items-center justify-center h-full aspect-square">
							<div className="absolute w-full h-full p-1 flex justify-center items-center bg-secondary animate-pulse"></div>
						</td>
						<td>
							<div className="w-full h-full flex justify-end items-center pr-1">
								<div className="w-12 h-4 rounded-md bg-secondary animate-pulse"></div>
							</div>
						</td>
						<td>
							<div className="w-full h-full flex justify-end items-center pr-1">
								<div className="w-32 h-4 rounded-md bg-secondary animate-pulse"></div>
							</div>
						</td>
					</tr>
					<tr className="relative w-full text-zinc-800 text-sm text-right outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit">
						<td className="h-full aspect-square text-left">
							<div className="w-full h-full flex justify-center items-center">
								<div className="w-4 h-4 bg-secondary animate-pulse rounded-sm"></div>
							</div>
						</td>
						<td className="relative flex items-center justify-center h-full aspect-square">
							<div className="absolute w-full h-full p-1 flex justify-center items-center bg-secondary animate-pulse"></div>
						</td>
						<td>
							<div className="w-full h-full flex justify-end items-center pr-1">
								<div className="w-12 h-4 rounded-md bg-secondary animate-pulse"></div>
							</div>
						</td>
						<td>
							<div className="w-full h-full flex justify-end items-center pr-1">
								<div className="w-32 h-4 rounded-md bg-secondary animate-pulse"></div>
							</div>
						</td>
					</tr>
				</tbody>
			</>
		);
	}

	return (
		<>
			{isLoaded && (
				<tbody>
					{items.map((x, i) => (
						<CartItemsTableItem cartItemWithProduct={x} />
					))}
				</tbody>
			)}
		</>
	);
}
