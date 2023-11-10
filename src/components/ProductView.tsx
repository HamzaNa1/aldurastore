import { Product } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";

interface ProductViewProp {
	product: Product;
}

export default function ProductView({ product }: ProductViewProp) {
	return (
		<>
			<Link
				href={`/products/${product.id}`}
				className="w-[400px] h-[700px] bg-white flex flex-col"
			>
				<div className="relative w-full aspect-square">
					<Image
						src={product.imageURL}
						alt=""
						fill
						className="h-full object-center object-contain"
					/>
				</div>

				<div className="w-full h-auto p-4 flex flex-col gap-4">
					<div className="text-[#145654] right-0 text-right text-3xl">
						{product.name}
					</div>

					<div className="text-[#909090] right-0 text-right text-xl">
						{product.description}
					</div>
				</div>
			</Link>
		</>
	);
}
