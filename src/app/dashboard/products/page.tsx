import { DashboardCreateProduct } from "@/actions/DashboardActions";
import Slider from "@/components/dashboard/Slider";
import db from "@/lib/db";
import { Product } from "@/lib/schema";
import { getServerSession } from "@/lib/Utils/userUtils";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function ManageProducts() {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	const products = await db.query.products.findMany();

	return (
		<div
			dir="ltr"
			className="container max-h-screen flex flex-col m-10 gap-1 text-zinc-800"
		>
			<form className="w-full">
				<button
					formAction={async () => {
						"use server";

						const newProduct = await DashboardCreateProduct();
						redirect("/dashboard/products/edit/" + newProduct?.id);
					}}
					type="submit"
					className="w-full h-full bg-zinc-300 hover:brightness-90 "
				>
					Add Product
				</button>
			</form>
			<div className="w-full h-full">
				<Slider>
					{products.map((product, i) => (
						<div key={i} className="flex-[0_0_20%]">
							<ProductBanner product={product}></ProductBanner>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}

interface ProductBannerProps {
	product: Product;
}

function ProductBanner({ product }: ProductBannerProps) {
	return (
		<div className="flex w-full h-full bg-zinc-300">
			<div className="relative h-full bg-white aspect-square select-none">
				<img
					src={product.imageURL}
					alt={product.name}
					className="absolute w-full h-full object-center object-contain"
				/>
			</div>

			<div className="flex flex-col p-2 w-full justify-start items-end text-zinc-700">
				<span className="text-primarytext text-xl font-bold">
					{product.name}
				</span>

				<span className="text-md font-bold self-start">
					Is Active: {`${product.activated}`}
				</span>
				<span className="text-md font-bold self-start">
					Show On Main: {`${product.showOnMain}`}
				</span>
				<div className="self-start mt-auto flex gap-2">
					<Link
						className="text-primarytext underline disabled:cursor-pointer"
						href={"/dashboard/products/edit/" + product.id}
					>
						Edit
					</Link>
				</div>
			</div>
		</div>
	);
}
