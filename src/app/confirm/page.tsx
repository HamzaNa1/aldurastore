"use client";

import ConfirmUser from "@/actions/auth/ConfirmUser";
import { notFound, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function ConfirmPage() {
	const searchParmas = useSearchParams();
	const id = searchParmas.get("id");

	if (!id || id == "") {
		notFound();
	}

	return (
		<div className="flex min-h-[50vh] justify-center items-center px-1">
			<div className="container flex flex-col text-right gap-10">
				<div className="flex flex-col gap-5">
					<span className="text-primarytext text-2xl sm:text-3xl md:text-4xl">
						تأكيد البريد الألكتروني
					</span>
					<span className="text-zinc-400 text-xs sm:text-sm md:text-base">
						تم أرسال رمز التأكيد إلى البريد الألكتروني الخاص بك
					</span>
				</div>
				<form className="flex flex-col gap-5">
					<ConfirmForm userId={id} />
				</form>
			</div>
		</div>
	);
}

function ConfirmForm({ userId }: { userId: string }) {
	const { pending } = useFormStatus();

	return (
		<>
			<div className="flex flex-col gap-2">
				<label className="text-zinc-800 text-sm md:text-base xl:text-lg">
					رمز التأكيد
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
				تأكيد
			</button>
		</>
	);
}
