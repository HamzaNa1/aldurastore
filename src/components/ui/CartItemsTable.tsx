"use client";

import { Product } from "@/lib/schema";
import { useEffect, useState } from "react";

interface CartItemsTableProps {
	items: Product[];
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
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
					</tr>
					<tr className="relative w-full text-zinc-800 text-sm text-right outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit">
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
					</tr>
					<tr className="relative w-full text-zinc-800 text-sm text-right outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit">
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
					</tr>
					<tr className="relative w-full text-zinc-800 text-sm text-right outline outline-[0.5px] last:rounded-b-sm bg-white outline-zinc-400 h-fit">
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
						<td className="relative pb-[7%] w-fit"></td>
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
							<td className="relative flex items-center justify-center h-full aspect-square">
								<div className="absolute w-full h-full p-1 flex justify-center items-center">
									<img
										src={x.imageURL}
										alt=""
										className="h-full object-center object-contain"
									/>
								</div>
							</td>
							<td className="pr-1 font-semibold">{x.cost}</td>
							<td className="pr-1 py-2">{x.name}</td>
						</tr>
					))}
				</tbody>
			)}
		</>
	);
}
