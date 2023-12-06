import { localizePrice } from "@/lib/Utils/locationUtils";
import { ProductViewDict } from "@/lib/languages/types";
import { Product, ProductPrice } from "@/lib/schema";
import Link from "next/link";

interface ProductViewProp {
	product: Product & {
		productPrices: ProductPrice[];
	};
	dict: ProductViewDict;
}

export default function ProductView({ product, dict }: ProductViewProp) {
	return (
		<Link
			href={`/products/${product.id}`}
			className="w-full flex flex-col rounded-md drop-shadow-xl pb-1 hover:shadow-inside hover:shadow-[#39777A]/60 bg-white transition duration-300"
		>
			<div className="relative w-full aspect-square">
				<img
					src={product.imageURL}
					alt={product.name}
					className="absolute w-full h-full object-center object-contain"
				/>
			</div>

			<div className="w-full h-full p-3 flex flex-col gap-4">
				<div className="w-full h-10 sm:h-auto">
					<span className="text-[#145654] text-base md:text-lg lg:text-xl line-clamp-2">
						{product.name}
					</span>
				</div>
				<span className="text-zinc-800 text-sm sm:text-base md:text-lg lg:text-xl">
					{localizePrice(
						product.productPrices[0].cost,
						product.productPrices[0].country
					)}
				</span>
				<div className="w-fit text-xs sm:text-sm md:text-base bg-zinc-300 text-center text-zinc-800 py-2 px-1 sm:px-2 md:px-4 rounded-full drop-shadow-md brightness-100 hover:brightness-90 transition duration-300">
					<span>{dict.showProduct}</span>
				</div>
			</div>
		</Link>
	);
}

export function ProductViewSkeleton() {
	return (
		<div className="w-full flex flex-col rounded-md drop-shadow-xl bg-white pb-1">
			<div className="relative w-full aspect-square">
				<div className="absolute w-full h-full bg-zinc-100 animate-pulse"></div>
			</div>

			<div className="w-full h-full p-3 flex flex-col gap-4">
				<div className="h-[24px] sm:h-[28px] lg:h-[36px] w-[60%] rounded-full bg-secondary animate-pulse"></div>

				<div className="h-[20px] sm:h-[24px] md:h-[28px] w-[30%] rounded-full bg-secondary animate-pulse"></div>
				<div className="w-36 h-10 max-w-[50%] p-2 rounded-full drop-shadow-md brightness-100 hover:brightness-90 bg-secondary animate-pulse"></div>
			</div>
		</div>
	);
}
