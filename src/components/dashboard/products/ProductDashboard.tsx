import { Product } from "@/lib/schema";
import { redirect } from "next/navigation";
import { DashboardCreateProduct } from "@/actions/DashboardActions";
import Slider from "../Slider";
import ProductBanner from "./ProductBanner";

interface ProductDashboardProps {
	products: Product[];
}

export default function ProductDashboard({ products }: ProductDashboardProps) {
	return (
		<>
			<form>
				<button
					formAction={async () => {
						"use server";

						const newProduct = await DashboardCreateProduct();
						redirect("/dashboard/products/edit/" + newProduct?.id);
					}}
					type="submit"
					className="w-full h-24 flex justify-center items-center bg-zinc-300 hover:brightness-90 "
				>
					Add Product
				</button>
			</form>
			<div className="h-screen">
				<Slider perView={5}>
					{products.map((product, i) => (
						<div key={i} className="keen-slider__slide w-full h-full ">
							<ProductBanner product={product}></ProductBanner>
						</div>
					))}
				</Slider>
			</div>
		</>
	);
}
