"use client";

import {
	DashboardDeleteProductImage,
	DashboardUpdateProductImageOrders,
	DashboardAddImageToProduct,
} from "@/actions/GeneralActions";
import { ProductImage } from "@/lib/schema";
import { useState } from "react";

interface ProductImagesFormProps {
	productId: string;
	productImages: ProductImage[];
}

export default function ProductImagesForm({
	productId,
	productImages,
}: ProductImagesFormProps) {
	const [newImage, setNewImage] = useState("");

	return (
		<div className="w-full">
			<div className="flex flex-col gap-6 w-96">
				{productImages.map((image, i) => (
					<div key={image.id}>
						<div className="w-full h-24 bg-zinc-300 flex flex-row">
							<div className="h-full aspect-square bg-white">
								<img
									src={image.imageURL}
									className="h-full object-contain object-center m-auto"
								></img>
							</div>

							<div>
								<form className="flex flex-row flex-wrap gap-2 p-1">
									<button
										formAction={async () => {
											for (let j = productImages.length - 1; j > i; j--) {
												productImages[j].order--;
											}

											await DashboardDeleteProductImage(
												image.id,
												productImages
											);
										}}
										className="text-primarytext underline"
									>
										Delete
									</button>
									<button
										formAction={async () => {
											if (i == 0) {
												return;
											}

											for (let j = 0; j < i; j++) {
												productImages[j].order++;
											}
											productImages[i].order = 0;

											await DashboardUpdateProductImageOrders(productImages);
										}}
										className="text-primarytext underline"
									>
										Move to Top
									</button>
									<button
										formAction={async () => {
											if (i == 0) {
												return;
											}

											productImages[i].order--;
											productImages[i - 1].order++;

											await DashboardUpdateProductImageOrders([
												productImages[i],
												productImages[i - 1],
											]);
										}}
										className="text-primarytext underline"
									>
										Move Up
									</button>
									<button
										formAction={async () => {
											if (i == productImages.length - 1) {
												return;
											}

											productImages[i].order++;
											productImages[i + 1].order--;

											await DashboardUpdateProductImageOrders([
												productImages[i],
												productImages[i + 1],
											]);
										}}
										className="text-primarytext underline"
									>
										Move Down
									</button>
									<button
										formAction={async () => {
											if (i == productImages.length - 1) {
												return;
											}

											for (let j = productImages.length - 1; j > i; j--) {
												productImages[j].order--;
											}
											productImages[i].order = productImages.length - 1;

											await DashboardUpdateProductImageOrders(productImages);
										}}
										className="text-primarytext underline"
									>
										Move to Bottom
									</button>
								</form>
							</div>
						</div>
					</div>
				))}

				<div className="w-full flex flex-col gap-1">
					<form
						action={async (formData: FormData) => {
							const url = formData.get("url") as string;

							await DashboardAddImageToProduct(
								productId,
								url,
								productImages.length
							);

							setNewImage("");
						}}
						className="w-full flex gap-1"
					>
						<input
							className="w-full"
							value={newImage}
							name="url"
							id="url"
							autoComplete={undefined}
							onChange={(e) => setNewImage(e.target.value)}
						/>
						<button
							className="px-10 bg-zinc-300 hover:brightness-90"
							type="submit"
						>
							Add
						</button>
					</form>
					<div className="w-24 h-24 bg-white">
						<img
							src={newImage}
							className="h-full object-contain object-center m-auto"
						></img>
					</div>
				</div>
			</div>
		</div>
	);
}
