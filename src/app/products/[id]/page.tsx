import ProductImageSlider from "@/components/ProductImageSlider";
import db from "@/lib/db";
import AddToCartForm from "@/components/AddToCartForm";
import { localizePrice } from "@/lib/Utils/locationUtils";
import getCountry from "@/lib/country";
import { sortClothingSizes } from "@/lib/Utils/utils";
import { notFound } from "next/navigation";
import { LiaShippingFastSolid } from "react-icons/lia";

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
		notFound();
	}

	const images = [
		product.imageURL,
		...product.productImages
			.sort((a, b) => a.order - b.order)
			.map((x) => x.imageURL),
	];

	return (
		<div className="container flex w-full h-full justify-center pt-20 pb-10 flex-wrap gap-1 px-1">
			<div className="flex-1 min-w-full md:min-w-0">
				<ProductImageSlider imageUrls={images}></ProductImageSlider>
			</div>
			<div className="flex-[1.5_1.5_0]">
				<div className="flex flex-col gap-6 max-w-xl ml-auto">
					<div className="flex flex-col gap-2">
						<div className="w-full text-right font-bold text-xl sm:text-2xl md:text-3xl">
							<span className="text-primary">{product.name}</span>
						</div>
						<div className="h-[2px] w-full bg-zinc-800 px-[0.5rem]" />
						<div className="w-full h-fit text-right sm:text-lg md:text-xl">
							<span className="text-zinc-800">
								{localizePrice(
									product.productPrices[0].cost,
									product.productPrices[0].country
								)}
							</span>
						</div>
					</div>
					<div
						dir="rtl"
						className="w-full h-fit text-right text-sm sm:text-base md:text-l"
					>
						<div className="text-zinc-800 whitespace-pre-wrap">
							{product.description}
						</div>
					</div>
					<div className="w-full flex flex-col gap-5 items-end">
						<AddToCartForm
							settings={product.productSettings.sort((a, b) =>
								sortClothingSizes(a.size, b.size)
							)}
						/>
						<div className="flex flex-row items-center justify-center gap-1 p-1">
							<span dir="rtl" className="text-zinc-400 text-xs">
								الشحن والتوصيل مجاني الى كافة دول مجلس التعاون خلال 7 ايام
							</span>
							<LiaShippingFastSolid className="fill-zinc-400 w-4 h-4" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div className="w-full flex justify-center items-center pt-20 md:pt-0">
	// 		<div className="bg-secondary container h-fit flex flex-row justify-center px-2 py-10 gap-5 flex-wrap lg:flex-nowrap">
	// 			<ProductImageSlider imageUrls={images}></ProductImageSlider>
	// 			<div className="w-full flex flex-col gap-20 items-end flex-1">
	// 				<div className="w-full flex flex-col gap-2">
	// 					<div className="w-full text-right font-bold text-xl sm:text-2xl md:text-3xl">
	// 						<span className="text-primary">{product.name}</span>
	// 					</div>
	// 					<div className="h-[2px] w-full bg-zinc-800 px-[0.5rem]" />
	// 					<div className="w-full h-fit text-right sm:text-lg md:text-xl">
	// 						<span className="text-zinc-800">
	// 							{localizePrice(
	// 								product.productPrices[0].cost,
	// 								product.productPrices[0].country
	// 							)}
	// 						</span>
	// 					</div>
	// 					<div
	// 						dir="rtl"
	// 						className="w-full h-fit text-right text-sm sm:text-base md:text-l"
	// 					>
	// 						<span className="text-zinc-800">{product.description}</span>
	// 					</div>
	// 				</div>

	// 				<div className="w-full flex flex-col gap-5 items-end">
	// 					<AddToCartForm
	// 						settings={product.productSettings.sort((a, b) =>
	// 							sortClothingSizes(a.size, b.size)
	// 						)}
	// 					/>
	// 					<div className="flex flex-row items-center justify-center gap-1 p-1">
	// 						<span dir="rtl" className="text-zinc-400 text-xs">
	// 							الشحن والتوصيل مجاني الى كافة دول مجلس التعاون خلال 7 ايام
	// 						</span>
	// 						<LiaShippingFastSolid className="fill-zinc-400 w-4 h-4" />
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
}
