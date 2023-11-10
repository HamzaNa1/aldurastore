import ProductView from "@/components/ProductView";
import db from "@/lib/db";

export default async function Products() {
	const products = await db.query.products.findMany({
		where: (product, { eq }) => eq(product.activated, true),
	});

	return (
		<>
			<div className="w-full h-fit bg-secondary flex flex-row flex-wrap justify-start gap-10 px-80 py-10">
				{products.map((product, i) => (
					<ProductView key={i} product={product}></ProductView>
				))}
			</div>
		</>
	);
}

function Filter(filterName: string) {
	return (
		<button className="w-24 py-2 bg-white rounded-full text-black">
			{filterName}
		</button>
	);
}
