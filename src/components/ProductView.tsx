import { Product } from "@/lib/schema";
import Link from "next/link";

interface ProductViewProp {
	product: Product;
}

export default function ProductView({ product }: ProductViewProp) {
	return (
		<Link
			href={`/products/${product.id}`}
			className="w-full flex flex-col aspect-[1/1.175] hover:shadow-inside hover:shadow-[#39777A]/60 bg-white transition duration-300"
		>
			<div className="relative w-full aspect-square">
				<img
					src={product.imageURL}
					alt=""
					className="absolute w-full h-full object-center object-contain"
				/>
			</div>

			<div className="w-full h-full p-4 flex flex-col gap-4">
				<div className="text-[#145654] right-0 text-right text-3xl">
					{product.name}
				</div>

				<div className="text-[#909090] right-0 text-right text-xl flex-1 relative">
					<div className="absolute inset-0 overflow-hidden">
						<p className="relative">{product.description}</p>

						<div className="absolute inset-y-0 left-0 w-full overflow-hidden">
							<div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-transparent to-white"></div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export function ProductViewSkeleton() {
	return (
		<div className="w-full flex flex-col aspect-[1/1.175] bg-white">
			<div className="relative w-full aspect-square">
				<div className="absolute w-full h-full bg-zinc-100 animate-pulse"></div>
			</div>

			<div className="w-full h-full p-4 flex flex-col gap-10 items-end">
				<div className="h-8 w-[60%] rounded-full bg-secondary animate-pulse"></div>

				<div className="w-full flex flex-col gap-4 items-end">
					<div className="h-6 w-[100%] rounded-full bg-secondary animate-pulse"></div>
					<div className="h-6 w-[100%] rounded-full bg-secondary animate-pulse"></div>
					<div className="h-6 w-[100%] rounded-full bg-secondary animate-pulse"></div>
					<div className="h-6 w-[100%] rounded-full bg-secondary animate-pulse"></div>
				</div>
			</div>
		</div>
	);
}
