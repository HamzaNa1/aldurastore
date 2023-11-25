import ProductImageSlider from "@/components/ProductImageSlider";
import BackButton from "@/components/ui/BackButton";
import db from "@/lib/db";
import { BiArrowBack } from "react-icons/bi";
import AddToCartForm from "@/components/ui/AddToCartForm";
import { localizePrice } from "@/lib/locationUtils";

interface ProductPageProps {
	params: {
		id: string;
	};
}

export default async function Product({ params: { id } }: ProductPageProps) {
	const product = await db.query.products.findFirst({
		where: (product, { eq }) => eq(product.id, id),
		with: {
			productImages: true,
			productSettings: true,
			productPrices: { where: (price, { eq }) => eq(price.country, "om") },
		},
	});

	if (!product) {
		return (
			<span className="text-primarytext text-4xl">Product Not Found...</span>
		);
	}

	const images = [
		product.imageURL,
		...product.productImages
			.sort((a, b) => a.order - b.order)
			.map((x) => x.imageURL),
	];

	return (
		<>
			<div className="relative bg-secondary container h-fit flex flex-row justify-center p-[60px]">
				<div className="absolute left-0">
					<BackButton>
						<div className="w-8 h-8 border-2 border-zinc-800 rounded-full hover:border-primary transition duration-300">
							<BiArrowBack className="w-full h-full fill-zinc-800 hover:fill-primary transition duration-300" />
						</div>
					</BackButton>
				</div>
				<ProductImageSlider imageUrls={images}></ProductImageSlider>
				<div className="w-full flex flex-col gap-20 items-end">
					<div className="w-full flex flex-col gap-2">
						<div className="w-full text-right font-bold text-3xl">
							<span className="text-primary">{product.name}</span>
						</div>
						<div className="h-[2px] w-full bg-zinc-800 mx-2" />
						<div className="w-full h-fit text-right text-xl">
							<span className="text-zinc-800">
								{localizePrice(product.productPrices[0])}
							</span>
						</div>
						<div className="w-full h-fit text-right text-l">
							<span className="text-zinc-800">{product.description}</span>
						</div>
					</div>

					<AddToCartForm settings={product.productSettings} />
				</div>
			</div>
		</>
	);
}
