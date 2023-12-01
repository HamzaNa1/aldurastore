import { DashboardDeleteProduct } from "@/actions/DashboardActions";
import { SubmitButton } from "@/components/ui/SubmitButton";
import db from "@/lib/db";
import { getServerSession } from "@/lib/Utils/userUtils";
import { notFound, redirect } from "next/navigation";

interface DeleteProductPageProps {
	params: { id: string };
}

export default async function DeleteProductPage({
	params,
}: DeleteProductPageProps) {
	const user = getServerSession();

	if (!user || !user.admin) {
		notFound();
	}

	const product = await db.query.products.findFirst({
		where: (p, { eq }) => eq(p.id, params.id),
	});

	if (!product) {
		notFound();
	}

	return (
		<div className="container inset-0 flex justify-center items-center">
			<form
				action={async (formData: FormData) => {
					"use server";

					const id = formData.get("id") as string;

					if (product.id != id) {
						return;
					}

					await DashboardDeleteProduct(product.id);
					redirect("/dashboard/products");
				}}
				className="flex flex-col text-zinc-800 justify-center gap-4"
			>
				<label>{"Product Name: " + product.name}</label>
				<label className="select-none">{"Product ID: " + product.id}</label>
				<label className="select-none">
					{"PRODUCT ID: " + product.id.toUpperCase()}
				</label>
				<input
					id="id"
					name="id"
					className="px-1"
					placeholder="Enter product ID"
					required
					autoComplete="off"
				></input>
				<SubmitButton
					className="w-full bg-red-400 hover:brightness-95 disabled:brightness-50"
					fallback={undefined}
				>
					DELETE
				</SubmitButton>
			</form>
		</div>
	);
}
