"use client";

import SignIn from "@/actions/auth/SignIn";
import { SubmitButton } from "./ui/SubmitButton";
import { toast } from "sonner";
import { useState } from "react";
import { LoginFormDict } from "@/lib/languages/types";

interface LoginFormProps {
	dict: LoginFormDict;
}

export default function LoginForm({ dict }: LoginFormProps) {
	const [showError, setShowError] = useState(false);
	const [password, setPassword] = useState("");

	return (
		<form
			className="container flex flex-col w-64 justify-center items-center gap-6"
			action={async (formData: FormData) => {
				const email = formData.get("email") as string;
				const password = formData.get("password") as string;

				const user = await SignIn({ email, password });

				if (user) {
					toast.success(<span className="w-full">{dict.toast}</span>);
				} else {
					setPassword("");
					setShowError(true);
				}
			}}
		>
			<input
				className="w-full h-10 p-1 rounded-sm text-black"
				placeholder={dict.email}
				type="email"
				name="email"
				onReset={(e) => {
					e.preventDefault();
				}}
				required
			/>
			<input
				className="w-full h-10 p-1 rounded-sm text-black"
				placeholder={dict.password}
				type="password"
				name="password"
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
				required
			/>
			<SubmitButton
				className="w-full h-10 p-1 rounded-sm drop-shadow-md bg-primary text-white disabled:bg-primarytext transition duration-500"
				fallback={null}
			>
				{dict.login}
			</SubmitButton>
			<label className="text-sm text-red-500 w-full mb-4" hidden={!showError}>
				{dict.error}
			</label>
		</form>
	);
}
