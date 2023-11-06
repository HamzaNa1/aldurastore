import ProductBannerView from "@/components/ProductBannerView";
import { Product } from "@/lib/schema";

export default function Cart() {
	const testProduct: Product = {
		id: "100",
		name: "Shirt",
		description: "Big Shirt",
		imageURL: "/test.png",
		showOnMain: false,
		activated: true,
	};

	return (
		<>
			<div className="flex flex-row w-full h-full bg-secondary px-64 justify-center items-center gap-16 p-20">
				<div className="flex flex-col h-full flex-grow gap-7">
					<span className="text-black text-3xl font-bold text-right w-full h-10 justify-end">
						تفاصيل الفاتورة
					</span>
					<div className="flex flex-row h-7 w-full outline rounded-sm p-1 bg-zinc-400 outline-zinc-400">
						<span className="text-black text-sm text-right flex-grow">
							القيمة
						</span>
						<span className="text-black text-sm text-right flex-grow">
							الوصف
						</span>
					</div>
					<div className="flex flex-row h-7 w-full outline rounded-sm p-3 bg-white outline-zinc-400"></div>
					<div className="flex flex-row h-7 w-full outline rounded-sm p-3 bg-white outline-zinc-400"></div>
					<button className="bg-black h-7 w-full rounded-md">
						متابعة الشراء
					</button>
					<button className=" text-black bg-white h-7 w-full rounded-md">
						العودة للتسوق
					</button>
				</div>
				{/*left col */}
				<div className="flex flex-col h-full flex-grow-0">
					<span className="text-black text-3xl font-bold text-right w-full h-10 justify-center">
						المنتجات
					</span>
					<div className="flex flex-row h-7 w-full outline rounded-sm p-1 bg-zinc-400 outline-zinc-400">
						<span className="text-black text-sm text-start flex-grow">
							السعر
						</span>
						<span className="text-black text-sm text-center flex-grow">
							الكمية
						</span>
						<span className="text-black text-sm text-end flex-grow">
							المنتج
						</span>
					</div>

					<ProductBannerView
						id={testProduct.id}
						name={testProduct.name}
						description={testProduct.description}
						imageURL={testProduct.imageURL}
					></ProductBannerView>
					<ProductBannerView
						id={testProduct.id}
						name={testProduct.name}
						description={testProduct.description}
						imageURL={testProduct.imageURL}
					></ProductBannerView>
					<ProductBannerView
						id={testProduct.id}
						name={testProduct.name}
						description={testProduct.description}
						imageURL={testProduct.imageURL}
					></ProductBannerView>
				</div>
				{/*right col */}
			</div>
			{/* biggest div */}
		</>
	);
}
