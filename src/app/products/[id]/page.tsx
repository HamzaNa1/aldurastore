import ProductImageSlider from "@/components/ProductImageSlider";
import db from "@/lib/db";
import AddToCartForm from "@/components/AddToCartForm";
import { localizePrice } from "@/lib/Utils/locationUtils";
import getCountry from "@/lib/country";
import { sortClothingSizes } from "@/lib/Utils/utils";

interface ProductPageProps {
	params: {
		id: string;
	};
}

export default async function Product({ params: { id } }: ProductPageProps) {
	const country = getCountry();

	const product = await db.query.products.findFirst({
		where: (product, { eq }) => eq(product.id, id),
		with: {
			productImages: true,
			productSettings: true,
			productPrices: { where: (price, { eq }) => eq(price.country, country) },
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
		<div className="w-full flex justify-center items-center">
			<div className="bg-secondary container h-fit flex flex-row justify-center px-2 py-10 gap-5 flex-wrap lg:flex-nowrap">
				<ProductImageSlider imageUrls={images}></ProductImageSlider>
				<div className="w-full flex flex-col gap-20 items-end">
					<div className="w-full flex flex-col gap-2">
						<div className="w-full text-right font-bold text-3xl">
							<span className="text-primary">{product.name}</span>
						</div>
						<div className="h-[2px] w-full bg-zinc-800 mx-2" />
						<div className="w-full h-fit text-right text-xl">
							<span className="text-zinc-800">
								{localizePrice(
									product.productPrices[0].cost,
									product.productPrices[0].country
								)}
							</span>
						</div>
						<div className="w-full h-fit text-right text-l">
							<span className="text-zinc-800">{product.description}</span>
						</div>
					</div>

					<AddToCartForm
						settings={product.productSettings.sort((a, b) =>
							sortClothingSizes(a.size, b.size)
						)}
					/>
				</div>
			</div>
		</div>
	);
}
