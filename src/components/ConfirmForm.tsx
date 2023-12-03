"use client";

import ConfirmUser from "@/actions/auth/ConfirmUser";
import { ConfirmFormDict } from "@/lib/languages/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

interface ConfirmFormProps {
	dict: ConfirmFormDict;
}

export default function ConfirmForm({ dict }: ConfirmFormProps) {
	const router = useRouter();
	const searchParmas = useSearchParams();
	const userId = searchParmas.get("id");

	if (!userId || userId == "") {
		router.push("/login");
		return;
	}

	const { pending } = useFormStatus();

	return (
		<>
			<div className="flex flex-col gap-2">
				<label className="text-zinc-800 text-sm md:text-base xl:text-lg">
					{dict.code}
				</label>
				<input
					id="key"
					name="key"
					className="w-full h-8 rounded-md border text-zinc-800 border-zinc-300 px-1 py-5 disabled:brightness-90 focus:outline-none"
					disabled={pending}
					autoComplete="off"
					maxLength={6}
					required
				/>
			</div>
			<button
				formAction={async (formData: FormData) => {
					const key = formData.get("key") as string;

					await ConfirmUser(userId, key);
				}}
				className="w-full h-8 bg-primary rounded-md hover:brightness-90 disabled:brightness-90"
				disabled={pending}
			>
				{dict.confirm}
			</button>
		</>
	);
}
