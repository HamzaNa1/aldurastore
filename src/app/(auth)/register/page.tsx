import SignUp from "@/actions/auth/SignUp";
import { getServerSession } from "@/lib/userUtils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
	const user = getServerSession();

	if (user) {
		redirect("/");
	}

	async function register(formData: FormData) {
		"use server";
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		console.log(await SignUp({ name, email, password }));
	}

	return (
		<div className="w-full flex flex-col items-center bg-secondary p-32 gap-2">
			<form
				className="container flex flex-col w-64 justify-center items-center gap-6"
				action={register}
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
				<button
					className="w-full h-10 p-1 rounded-sm drop-shadow-md bg-primary disabled:bg-primarytext text-white"
					type="submit"
				>
					تسجيل
				</button>
			</form>
			<Link className="text-black text-right w-64" href="/login">
				لديك حساب؟
			</Link>
		</div>
	);
}
