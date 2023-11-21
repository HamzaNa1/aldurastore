"use client";

import {
	DashboardAddProductSettings,
	DashboardDeleteProductSettings,
} from "@/actions/GeneralActions";
import { ProductSettings } from "@/lib/schema";
import { useState } from "react";

interface ProductSettingsFormProps {
	productId: string;
	productSettings: ProductSettings[];
}

export default function ProductSettingsForm({
	productId,
	productSettings,
}: ProductSettingsFormProps) {
	const [size, setSize] = useState("");

	return (
		<div className="w-full">
			<div className="flex flex-col gap-6 w-96">
				{productSettings.map((settings, i) => (
					<div key={settings.id}>
						<div className="w-full h-12 bg-zinc-300 flex flex-row items-center px-4 gap-5">
							<span>{settings.size}</span>
							<span>{settings.quantity}</span>

							<form className="ml-auto">
								<button
									formAction={async () => {
										await DashboardDeleteProductSettings(settings.id);
									}}
									className="text-primarytext underline"
								>
									Delete
								</button>
							</form>
						</div>
					</div>
				))}

				<div className="w-full flex flex-col gap-1">
					<form
						action={async (formData: FormData) => {
							const size = formData.get("size") as string;
							const quantity = Number(formData.get("quantity") as string);

							await DashboardAddProductSettings(productId, size, quantity);
							setSize("");
						}}
						className="w-full flex gap-1"
					>
						<input
							className="w-full"
							value={size}
							placeholder="size"
							name="size"
							id="size"
							onChange={(e) => setSize(e.target.value)}
						/>
						<input
							className="w-full"
							defaultValue={-1}
							placeholder="quantity"
							name="quantity"
							id="quantity"
						/>
						<button
							className="px-10 bg-zinc-300 hover:brightness-90"
							type="submit"
						>
							Add
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
