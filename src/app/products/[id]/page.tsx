import ProductImageSlider from "@/components/ProductImageSlider";
import BackButton from "@/components/ui/BackButton";
import db from "@/lib/db";
import { productImages, products } from "@/lib/schema";
import { eq } from "drizzle-orm";

interface ProductPageProps {
	params: {
		id: string;
	};
}

export default async function Product({ params: { id } }: ProductPageProps) {
	const product = await db.query.products.findFirst({
		where: (product, { eq }) => eq(product.id, id),
	});

	if (!product) {
		return (
			<span className="text-primarytext text-4xl">Product Not Found...</span>
		);
	}

	const productImages = await db.query.productImages.findMany({
		where: (productImage, { eq }) => eq(productImage.productId, id),
	});

	const images = [product.imageURL, ...productImages.map((x) => x.imageURL)];

	const colors = ["F8F8F8", "232323", "A9B0AA"];
	const sizes = ["S", "M", "L", "XL"];

	return (
		<>
			<div className="bg-secondary w-full h-fit flex flex-row justify-center p-[60px]">
				<BackButton></BackButton>

				<ProductImageSlider imageUrls={images}></ProductImageSlider>
				<div className="w-full flex flex-col gap-20 items-end">
					<div className="w-full flex flex-col gap-2">
						<div className="w-full text-right font-bold text-3xl">
							<span className="text-primary">{product.name}</span>
						</div>
						<div className="h-[2px] w-full bg-zinc-800 mx-2"></div>
						<div className="w-full h-fit text-right text-xl">
							<span className="text-zinc-800">${product.cost}</span>
						</div>
					</div>

					<div className="flex flex-col gap-5 text-zinc-800 text-right">
						<div className="flex flex-col gap-2">
							<span className="font-bold text-xl">:اللون</span>
							<div className="flex flex-row gap-2 justify-end">
								{colors.map((color, i) => (
									<button
										key={i}
										className="w-8 h-8 rounded-md outline-black outline-[1px] outline hover:brightness-90 transition duration-300"
										style={{ backgroundColor: `#${color}` }}
									></button>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<span className="font-bold text-xl">:المقاس</span>
							<div className="flex flex-row gap-2 justify-end">
								{sizes.map((size, i) => (
									<button
										key={i}
										className="w-16 rounded-md bg-[#D9D9D9] py-1 hover:brightness-90 transition duration-300"
									>
										{size}
									</button>
								))}
							</div>
						</div>
					</div>

					<div className="flex flex-row gap-10">
						<button className="py-2 px-12 bg-primary rounded-md drop-shadow-lg hover:brightness-90 transition duration-300">
							أضف إلى السلة
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
