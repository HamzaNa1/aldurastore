import Hero from "@/components/Hero";
import ProductView from "@/components/ProductView";
import { Product } from "@/lib/schema";
import Link from "next/link";

export default function Home() {
	const images = ["/test.png", "/test2.png", "/test.png", "/test2.png"];
	const product: Product = {
		id: "1",
		name: "اسم المنتج",
		description: "وصف المنتج",
		imageURL: "/test.png",
		showOnMain: true,
		activated: true,
	};

	return (
		<main className="w-screen bg-secondary">
			<div className="w-full h-fit flex flex-col items-center pb-10">
				<div className="container max-h-screen aspect-video bg-[#777777]">
					<Hero images={images} />
				</div>
			</div>
			<div className="w-full h-fit bg-primary p-10 flex flex-col items-center gap-6">
				<span className="text-7xl">منتجاتنا</span>
				<div className="flex flex-row justify-center gap-10">
					<ProductView product={product}></ProductView>
					<ProductView product={product}></ProductView>
					<ProductView product={product}></ProductView>
				</div>

				<Link
					href="/"
					className="w-64 h-16 bg-white text-[#646464] rounded-3xl flex items-center justify-center drop-shadow-lg"
				>
					<span className="text-2xl">عرض الجميع</span>
				</Link>
			</div>
		</main>
	);
}
