"use client";

import { Product } from "@/lib/schema";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface ProductBannerProps {
	product: Product;
}

export default function ProductBanner({ product }: ProductBannerProps) {
	const router = useRouter();

	const { pending } = useFormStatus();

	return (
		<div
			className={
				"flex w-full h-full bg-zinc-300 " + (pending ? "brightness-90" : "")
			}
		>
			<div className="h-full aspect-square bg-white select-none">
				<img
					className="w-full h-full object-center object-contain mx-auto"
					src={product.imageURL}
				></img>
			</div>
			<div className="flex flex-col p-2 w-full justify-start items-end text-zinc-700">
				<span className="text-primarytext text-xl font-bold">
					{product.name}
				</span>
				<span className="text-md font-bold overflow-hidden">
					{product.description}
				</span>
				<span className="text-md font-bold self-start">
					Is Active: {`${product.activated}`}
				</span>
				<span className="text-md font-bold self-start">
					Show On Main: {`${product.showOnMain}`}
				</span>
				<div className="self-start mt-auto flex gap-2">
					<button
						className="text-primarytext underline disabled:cursor-pointer"
						type="button"
						disabled={pending}
						onClick={() =>
							router.push("/dashboard/products/edit/" + product.id)
						}
					>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
}
