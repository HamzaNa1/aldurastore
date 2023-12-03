"use client";

import SignUp from "@/actions/auth/SignUp";
import { useState } from "react";
import { SubmitButton } from "./ui/SubmitButton";
import { RegisterFormDict } from "@/lib/languages/types";

interface RegisterFormProps {
	dict: RegisterFormDict;
}

export default function RegisterForm({ dict }: RegisterFormProps) {
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
					errors = [...errors, dict.invalidEmail];
				}
				if (error.invalidPassword) {
					errors = [...errors, dict.invalidPassowrd];
				} else if (error.emailUsed) {
					errors = [...errors, dict.emailUsed];
				}

				setErrors(errors);
			}}
		>
			<input
				className="w-full h-10 p-1 rounded-sm text-black"
				placeholder={dict.username}
				type="text"
				name="name"
				required
			/>
			<input
				className="w-full h-10 p-1 rounded-sm text-black"
				placeholder={dict.email}
				type="email"
				name="email"
				required
			/>
			<input
				className="w-full h-10 p-1 rounded-sm text-black"
				placeholder={dict.password}
				type="password"
				name="password"
				required
			/>
			<SubmitButton
				className="w-full h-10 p-1 rounded-sm drop-shadow-md bg-primary text-white disabled:bg-primarytext transition duration-500"
				fallback={null}
			>
				{dict.register}
			</SubmitButton>

			{errors.length > 0 &&
				errors.map((error) => (
					<label className="text-sm text-red-500 w-full mb-4">{error}</label>
				))}
		</form>
	);
}
