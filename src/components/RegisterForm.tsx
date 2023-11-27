"use client";

import SignUp from "@/actions/auth/SignUp";
import { useState } from "react";
import { SubmitButton } from "./ui/SubmitButton";

export default function LoginForm() {
	const [errors, setErrors] = useState<string[]>([]);

	return (
		<form
			className="container flex flex-col w-64 justify-center items-center gap-6"
			action={async (formData: FormData) => {
				const name = formData.get("name") as string;
				const email = formData.get("email") as string;
				const password = formData.get("password") as string;

				const error = await SignUp({ name, email, password });

				if (!error) {
					return;
				}

				let errors: string[] = [];
				if (error.invalidEmail) {
					errors = [...errors, "البريد الألكتروني غير صحيح"];
				}
				if (error.invalidPassword) {
					errors = [
						...errors,
						"كلمة المرور يجب ان تكون مكونة من 8 رموز كحد أدنى",
					];
				} else if (error.emailUsed) {
					errors = [...errors, "البريد الألكتروني مستخدم من قبل"];
				}

				setErrors(errors);
			}}
		>
			<input
				className="w-full h-10 p-1 rounded-sm placeholder:text-right text-black"
				placeholder="الأسم"
				type="text"
				name="name"
				required
			/>
			<input
				className="w-full h-10 p-1 rounded-sm placeholder:text-right text-black"
				placeholder="البريد الألكتروني"
				type="email"
				name="email"
				required
			/>
			<input
				className="w-full h-10 p-1 rounded-sm placeholder:text-right text-black"
				placeholder="كلمة السر"
				type="password"
				name="password"
				required
			/>
			<SubmitButton
				className="w-full h-10 p-1 rounded-sm drop-shadow-md bg-primary text-white disabled:bg-primarytext transition duration-500"
				fallback={null}
			>
				تسجيل
			</SubmitButton>

			{errors.length > 0 &&
				errors.map((error) => (
					<label className="text-sm text-red-500 w-full text-right mb-4">
						{error}
					</label>
				))}
		</form>
	);
}
