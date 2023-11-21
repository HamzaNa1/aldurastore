import { Product } from "@/lib/schema";
import { redirect } from "next/navigation";
import { DashboardCreateProduct } from "@/actions/GeneralActions";
import Slider from "../Slider";
import ProductBanner from "./ProductBanner";

interface ProductDashboardProps {
	products: Product[];
}

export default function ProductDashboard({ products }: ProductDashboardProps) {
	// const searchParams = useSearchParams();

	// const edit = searchParams.get("edit");

	// let product: Product | undefined = undefined;
	// if (edit) {
	// 	product = products.find((x) => x.id == edit);

	// 	if (product) {
	// 	}
	// }

	// const [currentProduct, setProduct] = useState<Product | undefined>(product);

	// useEffect(() => {
	// 	setProduct(product);
	// }, []);

	// const ProductSetter = (product: Product | undefined) => {
	// 	scrollTo(0, 0);

	// 	if (!product) {
	// 		window.history.pushState({}, "", window.location.pathname);
	// 		setProduct(product);
	// 		return;
	// 	}

	// 	const params = new URLSearchParams(searchParams);
	// 	params.set("edit", product.id);

	// 	window.history.pushState(
	// 		{},
	// 		"",
	// 		window.location.pathname + "?" + params.toString()
	// 	);

	// 	setProduct(product);
	// };

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
