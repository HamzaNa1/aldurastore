import { currencies } from "@/lib/locationUtils";
import { ProductPrice } from "@/lib/schema";
import ProductPriceEditor from "./ProductPriceEditor";

interface ProductPricesFormProps {
	productPrices: ProductPrice[];
}

export default function ProductPricesForm({
	productPrices,
}: ProductPricesFormProps) {
	return (
		<div className="w-full">
			<div className="flex flex-col gap-6 w-96">
				{productPrices.map((price, i) => (
					<div key={price.id}>
						<div className="w-full h-12 bg-zinc-300 flex flex-row items-center px-4 gap-8 ">
							<div className="w-4 shrink-0">
								<span>{currencies[price.country]}</span>
							</div>
							<div className="w-4 shrink-0">
								<span>{price.cost}</span>
							</div>
							<ProductPriceEditor price={price} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
