import ProductView, { ProductViewSkeleton } from "@/components/ProductView";
import db from "@/lib/db";
import { Suspense } from "react";

export default async function Products() {
	return (
		<div className="w-full flex justify-center items-center">
			<div className="productsContainer h-fit bg-secondary flex flex-row flex-wrap justify-start gap-10 px-2 py-10">
				<Suspense fallback={<ProductSkeleton />}>
					<ProductSection />
				</Suspense>
			</div>
		</div>
	);
}

async function ProductSection() {
	const products = await db.query.products.findMany({
		where: (product, { eq }) => eq(product.activated, true),
	});

	return (
		<>
			{products.map((product, i) => (
				<ProductView key={i} product={product}></ProductView>
			))}
		</>
	);
}

async function ProductSkeleton() {
	return (
		<>
			<ProductViewSkeleton />
			<ProductViewSkeleton />
			<ProductViewSkeleton />
		</>
	);
}
