"use client";

import { DeleteItem } from "@/actions/Cart";
import { CartItem, Product } from "@/lib/schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { useEffect, useState } from "react";
import { FaSquareXmark } from "react-icons/fa6";
import { SubmitButton } from "./SubmitButton";

interface CartItemsTableProps {
	items: { products: Product; cartItems: CartItem }[];
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
						<tr
							key={i}
							className="text-zinc-800 text-sm text-right outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit"
						>
							<td className="h-full aspect-square text-left">
								<div className="w-full h-full flex justify-center items-center">
									<form
										action={async () => {
											await DeleteItem(x.cartItems.id);
										}}
									>
										<SubmitButton className="w-4 h-4" fallback={undefined}>
											<FaSquareXmark className="w-full h-full fill-primary hover:brightness-90 transition duration-300" />
										</SubmitButton>
									</form>
								</div>
							</td>
							<td className="relative flex items-center justify-center h-full aspect-square">
								<div className="absolute w-full h-full p-1 flex justify-center items-center">
									<img
										src={x.products.imageURL}
										alt=""
										className="h-full object-center object-contain"
									/>
								</div>
							</td>
							<td className="pr-1 font-semibold">${x.products.cost}</td>
							<td className="pr-1 py-2">{x.products.name}</td>
						</tr>
					))}
				</tbody>
			)}
		</>
	);
}
