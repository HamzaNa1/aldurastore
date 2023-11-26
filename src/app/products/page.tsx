import ProductView, { ProductViewSkeleton } from "@/components/ProductView";
import getCountry from "@/lib/country";
import db from "@/lib/db";
import { Suspense } from "react";

export default async function Products() {
	return (
		<div className="productsContainer h-fit bg-secondary flex flex-row flex-wrap justify-center gap-1 md:gap-5 px-1 py-10">
			<Suspense fallback={<ProductSkeleton />}>
				<ProductSection />
			</Suspense>
		</div>
	);
}

async function ProductSection() {
	const country = getCountry();

	const products = await db.query.products.findMany({
		where: (product, { and, eq }) => and(eq(product.activated, true)),
		with: {
			productPrices: {
				where: (productPrice, { eq }) => eq(productPrice.country, country),
			},
		},
	});

	return (
		<>
			{products.map((product, i) => (
				<div key={i} className="w-[47%] max-w-[375px]">
					<ProductView product={product}></ProductView>
				</div>
			))}
		</>
	);
}

async function ProductSkeleton() {
	return (
		<>
			<div className="w-[47%] max-w-[375px]">
				<ProductViewSkeleton />
			</div>
			<div className="w-[47%] max-w-[375px]">
				<ProductViewSkeleton />
			</div>
			<div className="w-[47%] max-w-[375px]">
				<ProductViewSkeleton />
			</div>
		</>
	);
}
