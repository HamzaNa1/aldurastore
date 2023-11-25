import ProductEditDashboard from "@/components/dashboard/products/ProductEditDashboard";
import db from "@/lib/db";
import {
	Product,
	ProductImage,
	ProductPrice,
	ProductSettings,
} from "@/lib/schema";
import { getServerSession } from "@/lib/userUtils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface EditProductPageProps {
	params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function EditProductPage({
	params,
}: EditProductPageProps) {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	return (
		<div className="container flex flex-col m-10 gap-1 text-zinc-800">
			<Suspense fallback={<h1 className="m-auto text-4xl">LOADING...</h1>}>
				<EditDashboard productId={params.id} />
			</Suspense>
		</div>
	);
}

async function EditDashboard({ productId }: { productId: string }) {
	const product = await db.query.products.findFirst({
		where: (product, { eq }) => eq(product.id, productId),
		with: {
			productImages: true,
			productSettings: true,
			productPrices: true,
		},
	});

	if (!product) {
		notFound();
	}

	return <ProductEditDashboard product={product} />;
}

export type FullProduct = Product & {
	productImages: ProductImage[];
	productSettings: ProductSettings[];
	productPrices: ProductPrice[];
};
