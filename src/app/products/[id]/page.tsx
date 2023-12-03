import ProductImageSlider from "@/components/ProductImageSlider";
import db from "@/lib/db";
import AddToCartForm from "@/components/AddToCartForm";
import { localizePrice } from "@/lib/Utils/locationUtils";
import getCountry from "@/lib/country";
import { sortClothingSizes } from "@/lib/Utils/utils";
import { notFound } from "next/navigation";
import { LiaShippingFastSolid } from "react-icons/lia";
import getLanguage, { getDirection } from "@/lib/languages/language";
import { getDictionary } from "@/lib/languages/dictionaries";
import { sql } from "drizzle-orm";
import { products } from "@/lib/schema";

interface ProductPageProps {
	params: {
		id: string;
	};
}

export default async function Product({ params: { id } }: ProductPageProps) {
	const country = getCountry();

	const language = getLanguage();

	const product = await db.query.products.findFirst({
		extras:
			language == "en"
				? {
						name: sql<string>`${products.nameEN}`.as("name"),
				  }
				: undefined,
		where: (product, { eq }) => eq(product.id, id),
		with: {
			productImages: true,
			productSettings: true,
			productPrices: { where: (price, { eq }) => eq(price.country, country) },
		},
	});

	if (!product) {
		notFound();
	}

	const productDict = (await getDictionary(language)).product;
	const dir = getDirection();

	const images = [
		product.imageURL,
		...product.productImages
			.sort((a, b) => a.order - b.order)
			.map((x) => x.imageURL),
	];

	return (
		<div
			dir="ltr"
			className="container flex w-full h-full justify-center pt-20 pb-10 flex-wrap gap-1 px-1"
		>
			<div className="flex-1 min-w-full md:min-w-0">
				<ProductImageSlider imageUrls={images}></ProductImageSlider>
			</div>
			<div dir={dir} className="flex-[1.5_1.5_0]">
				<div className="flex flex-col gap-6 max-w-xl ml-auto">
					<div className="flex flex-col gap-2">
						<div className="w-full font-bold text-xl sm:text-2xl md:text-3xl">
							<span className="text-primary">{product.name}</span>
						</div>
						<div className="h-[2px] w-full bg-zinc-800 px-[0.5rem]" />
						<div className="w-full h-fit sm:text-lg md:text-xl">
							<span className="text-zinc-800">
								{localizePrice(
									product.productPrices[0].cost,
									product.productPrices[0].country
								)}
							</span>
						</div>
					</div>
					<div className="w-full h-fit text-sm sm:text-base md:text-l">
						<span className="text-zinc-800">{product.description}</span>
					</div>
					<div className="w-full flex flex-col gap-5">
						<AddToCartForm
							settings={product.productSettings.sort((a, b) =>
								sortClothingSizes(a.size, b.size)
							)}
							dict={productDict.addToCartForm}
						/>
						<div className="flex flex-row items-center gap-1 p-1">
							<LiaShippingFastSolid className="fill-zinc-400 w-4 h-4" />
							<span className="text-zinc-400 text-xs">{productDict.label}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
