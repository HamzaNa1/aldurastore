"use client";

import SignUp from "@/actions/auth/SignUp";
import { useEffect, useRef, useState } from "react";
import { RegisterFormDict } from "@/lib/languages/types";

import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

interface RegisterFormProps {
	dict: RegisterFormDict;
	sitekey: string;
}

export default function RegisterForm({ dict, sitekey }: RegisterFormProps) {
	const [errors, setErrors] = useState<string[]>([]);
	const [state, setState] = useState<string>("default");
	const [formData, setFormData] = useState<FormData | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const router = useRouter();

	const pending = state != "default";

	useEffect(() => {
		if (!token) {
			return;
		}

		setState("submitting");
		Submit(token).finally(() => setState("default"));
	}, [token]);

	async function Submit(token: string) {
		if (!formData) {
			return;
		}

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const error = await SignUp({ name, email, password, token });

		if (!error) {
			return;
		}

		if (error.unexpectedError) {
			router.push("/register");
			return;
		}

		// @ts-ignore
		window.grecaptcha.reset();

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
	}

	return (
		<>
			<form
				className="container flex flex-col w-64 justify-center items-center gap-6"
				action={(formData: FormData) => {
					setFormData(formData);

					recaptchaRef.current?.execute();
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
				<button
					disabled={pending}
					type="submit"
					className="w-full h-10 p-1 rounded-sm drop-shadow-md bg-primary text-white disabled:bg-primarytext transition duration-500"
				>
					{dict.register}
				</button>

				{errors.length > 0 &&
					errors.map((error, i) => (
						<label key={i} className="text-sm text-red-500 w-full mb-4">
							{error}
						</label>
					))}
			</form>
			<ReCAPTCHA
				ref={recaptchaRef}
				size="invisible"
				sitekey={sitekey}
				onChange={(token: string | null) => {
					setToken(token);
				}}
			/>
		</>
	);
}
