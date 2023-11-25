import { DashboardUpdateProductPrice } from "@/actions/DashboardActions";
import { ProductPrice } from "@/lib/schema";
import { useRef } from "react";

interface ProductPriceEditorProps {
	price: ProductPrice;
}

export default function ProductPriceEditor({ price }: ProductPriceEditorProps) {
	const form = useRef<HTMLFormElement>(null);

	return (
		<form ref={form} className="ml-auto flex gap-2">
			<input
				placeholder="cost"
				className="w-16 pl-1"
				id="cost"
				name="cost"
				defaultValue={0}
			/>

			<button
				formAction={async (formData: FormData) => {
					const cost = Number(formData.get("cost") as string);

					if (isNaN(cost)) {
						form.current?.reset();
						return;
					}

					await DashboardUpdateProductPrice(price.id, cost);
					form.current?.reset();
				}}
				className="text-primarytext underline"
			>
				Update
			</button>
		</form>
	);
}
