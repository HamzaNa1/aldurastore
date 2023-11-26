"use client";

import { DashboardUpdateProduct } from "@/actions/DashboardActions";
import { Product } from "@/lib/schema";
import Link from "next/link";
import { useState } from "react";
import ProductImagesForm from "./ProductImagesForm";
import ProductSettingsForm from "./ProductSettingsForm";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import ProductPricesForm from "./ProductPricesForm";
import { FullProduct } from "@/app/dashboard/products/edit/[id]/page";
import { sortClothingSizes } from "@/lib/Utils/utils";

interface ProductEditDashboardProps {
	product: FullProduct;
}

export default function ProductEditDashboard({
	product,
}: ProductEditDashboardProps) {
	const router = useRouter();
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
					<label>Type</label>
					<input
						className="w-96 px-1 invalid:border invalid:border-red-400"
						name="type"
						pattern="^(women|men)$"
						defaultValue={String(product.type)}
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
					<UpdateButton productId={product.id} />
					<button
						type="button"
						onClick={() => router.back()}
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

			<ProductImagesForm
				productId={product.id}
				productImages={product.productImages}
			/>
			<div className="flex flex-col gap-20">
				<ProductSettingsForm
					productId={product.id}
					productSettings={product.productSettings.sort((a, b) =>
						sortClothingSizes(a.size, b.size)
					)}
				/>
				<ProductPricesForm productPrices={product.productPrices} />
			</div>
		</div>
	);
}

function UpdateButton({ productId }: { productId: string }) {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			formAction={async (formData: FormData) => {
				let newProduct: Product = {
					id: productId,
					name: formData.get("name") as string,
					description: formData.get("description") as string,
					type: formData.get("type") as "women" | "men",
					activated: (formData.get("active") as string) == "true",
					showOnMain:
						(formData.get("showOnMain") as string) == "true" &&
						(formData.get("active") as string) == "true",
					imageURL: formData.get("image") as string,
				};

				await DashboardUpdateProduct(newProduct);
			}}
			className="bg-zinc-300 hover:brightness-90 flex-1 disabled:brightness-90"
			disabled={pending}
		>
			{pending ? "Updating..." : "Update"}
		</button>
	);
}
