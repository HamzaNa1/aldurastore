import {
	DashboardUpdateProductSettings,
	DashboardDeleteProductSettings,
} from "@/actions/DashboardActions";
import { ProductSettings } from "@/lib/schema";
import { useRef } from "react";

interface ProductSettingsEditorProps {
	settings: ProductSettings;
}

export default function ProductSettingsEditor({
	settings,
}: ProductSettingsEditorProps) {
	const form = useRef<HTMLFormElement>(null);

	return (
		<form ref={form} className="ml-auto flex gap-2">
			<input
				placeholder="quantity"
				className="w-16 pl-1"
				id="quantity"
				name="quantity"
				defaultValue={0}
			/>

			<button
				formAction={async (formData: FormData) => {
					const quantity = Number(formData.get("quantity") as string);

					if (isNaN(quantity)) {
						form.current?.reset();
						return;
					}

					await DashboardUpdateProductSettings(settings.id, quantity);
					form.current?.reset();
				}}
				className="text-primarytext underline"
			>
				Update
			</button>
			<button
				formAction={async () => {
					await DashboardDeleteProductSettings(settings.id);
				}}
				className="text-primarytext underline"
			>
				Delete
			</button>
		</form>
	);
}
