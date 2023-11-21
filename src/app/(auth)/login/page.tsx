import SignIn from "@/actions/auth/SignIn";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { getServerSession } from "@/lib/userUtils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
	const user = getServerSession();

	if (user) {
		redirect("/");
	}

	async function login(formData: FormData) {
		"use server";
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		await SignIn({ email, password });
	}

	return (
		<div className="w-full flex flex-col justify-center items-center bg-secondary gap-2">
			<form
				className="container flex flex-col w-64 justify-center items-center gap-6"
				action={login}
			>
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
					تسجيل الدخول
				</SubmitButton>
			</form>
			<Link className="text-black text-right w-64" href="/register">
				تسجيل حساب جديد
			</Link>
			<Link className="text-black text-right w-64" href="/forgot-password">
				نسيت كلمة السر؟
			</Link>
		</div>
	);
}
