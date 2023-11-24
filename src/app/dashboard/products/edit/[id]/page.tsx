import ProductEditDashboard from "@/components/dashboard/products/ProductEditDashboard";
import db from "@/lib/db";
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
	});

	if (!product) {
		notFound();
	}

	const productImages = await db.query.productImages.findMany({
		where: (image, { eq }) => eq(image.productId, productId),
	});
	const productSettings = await db.query.productSettings.findMany({
		where: (setting, { eq }) => eq(setting.productId, productId),
	});

	return (
		<ProductEditDashboard
			product={product}
			productImages={productImages
				.filter((x) => x.productId == product.id)
				.sort((a, b) => a.order - b.order)}
			productSettings={productSettings}
		/>
	);
}
