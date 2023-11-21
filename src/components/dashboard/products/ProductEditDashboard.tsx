"use client";

import { DashboardUpdateProduct } from "@/actions/GeneralActions";
import {
	Product,
	ProductImage,
	ProductSettings,
	productSettings,
} from "@/lib/schema";
import Link from "next/link";
import { useState } from "react";
import ProductImagesForm from "./ProductImagesForm";
import ProductSettingsForm from "./ProductSettingsForm";

interface ProductEditDashboardProps {
	product: Product;
	productImages: ProductImage[];
	productSettings: ProductSettings[];
}

export default function ProductEditDashboard({
	product,
	productImages,
	productSettings,
}: ProductEditDashboardProps) {
	const [imageURL, setImageURL] = useState(product.imageURL);

	return (
		<div className="w-full flex flex-row justify-between gap-32">
			<form className="w-full flex flex-col gap-6">
				<div className="flex flex-col gap-2 text-zinc-800">
					<label>ID</label>
					<input className="w-96 px-1" defaultValue={product.id} readOnly />
				</div>
				<div className="flex flex-col gap-2 text-zinc-800">
					<label>Name</label>
					<textarea
						className="w-96 h-20 px-1"
						name="name"
						defaultValue={product.name}
						required
					/>
				</div>
				<div className="flex flex-col gap-2 text-zinc-800">
					<label>Description</label>
					<textarea
						className="w-96 h-32 px-1"
						name="description"
						defaultValue={product.description}
						required
					/>
				</div>
				<div className="flex flex-col gap-2 text-zinc-800">
					<label>Cost</label>
					<input
						className="w-96 h-30 px-1"
						name="cost"
						type="number"
						defaultValue={product.cost}
						required
					/>
				</div>
				<div className="flex flex-col gap-2 text-zinc-800">
					<label>Active</label>
					<input
						className="w-96 px-1 invalid:border invalid:border-red-400"
						name="active"
						pattern="^(true|false)$"
						defaultValue={String(product.activated)}
						required
					/>
				</div>
				<div className="flex flex-col gap-2 text-zinc-800">
					<label>Show On Main</label>
					<input
						className="w-96 px-1 invalid:border invalid:border-red-400"
						name="showOnMain"
						pattern="^(true|false)$"
						defaultValue={String(product.showOnMain)}
						required
					/>
				</div>
				<div className="flex flex-col gap-2 text-zinc-800">
					<label>Image</label>
					<input
						className="w-96 px-1"
						name="image"
						onChange={(e) => setImageURL(e.target.value)}
						defaultValue={product.imageURL}
						required
					/>
					<div className="w-96 aspect-square">
						<img src={imageURL} className="h-full object-contain m-auto"></img>
					</div>
				</div>
				<div className="w-96 flex flex-row gap-1">
					<button
						type="submit"
						formAction={async (formData: FormData) => {
							let newProduct: Product = {
								id: product.id,
								name: formData.get("name") as string,
								description: formData.get("description") as string,
								cost: Number(formData.get("cost")),
								activated: Boolean(formData.get("active")),
								showOnMain: Boolean(formData.get("showOnMain")),
								imageURL: formData.get("image") as string,
							};

							await DashboardUpdateProduct(newProduct);
						}}
						className="bg-zinc-300 hover:brightness-90 flex-1"
					>
						Update
					</button>
					<button
						onClick={() => {}}
						className="bg-zinc-300 hover:brightness-90 flex-1"
					>
						Back
					</button>
					<Link
						href={"/dashboard/products/delete/" + product.id}
						className="bg-red-300 hover:brightness-90 flex-1 w-full flex justify-center items-center"
					>
						Delete
					</Link>
				</div>
			</form>

			<ProductImagesForm productId={product.id} productImages={productImages} />
			<ProductSettingsForm
				productId={product.id}
				productSettings={productSettings}
			/>
		</div>
	);
}
