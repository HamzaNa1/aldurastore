import ProductView, { ProductViewSkeleton } from "@/components/ProductView";
import getCountry from "@/lib/country";
import db from "@/lib/db";
import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";
import { products } from "@/lib/schema";
import { sql } from "drizzle-orm";
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
	const language = getLanguage();
	const dict = (await getDictionary(language)).productView;

	const activeProducts = await db.query.products.findMany({
		extras:
			language == "en"
				? {
						name: sql<string>`${products.nameEN}`.as("name"),
				  }
				: undefined,
		where: (product, { and, eq }) => and(eq(product.activated, true)),
		with: {
			productPrices: {
				where: (productPrice, { eq }) => eq(productPrice.country, country),
			},
		},
	});

	return (
		<>
			{activeProducts.map((product, i) => (
				<div key={i} className="w-[47%] max-w-[375px]">
					<ProductView product={product} dict={dict}></ProductView>
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
