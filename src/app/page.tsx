import Hero from "@/components/Hero";
import ProductView from "@/components/ProductView";
import db from "@/lib/db";
import Link from "next/link";

export default async function Home() {
	const images = await db.query.heroImages.findMany({});
	const products = await db.query.products.findMany({
		where: (product, { eq }) =>
			eq(product.showOnMain, true) && eq(product.activated, true),
	});

	return (
		<main className="w-screen bg-secondary">
			<div className="w-full h-fit flex flex-col items-center pb-10">
				<div className="container max-h-screen aspect-video bg-[#777777]">
					<Hero images={images.map((x) => x.imageURL)} />
				</div>
			</div>
			<div className="w-full h-fit bg-primary p-10 flex flex-col items-center gap-6">
				<span className="text-7xl">منتجاتنا</span>
				<div className="flex flex-row justify-center gap-10">
					{products.map((product, i) => (
						<ProductView key={i} product={product}></ProductView>
					))}
				</div>

				<Link
					href="/products"
					className="w-64 h-16 bg-white text-[#646464] rounded-3xl flex items-center justify-center drop-shadow-lg"
				>
					<span className="text-2xl">عرض الجميع</span>
				</Link>
			</div>
		</main>
	);
}
