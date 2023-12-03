import LoginForm from "@/components/LoginForm";
import { getServerSession } from "@/lib/Utils/userUtils";
import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
	const user = getServerSession();

	if (user) {
		redirect("/");
	}

	const language = getLanguage();
	const loginDict = (await getDictionary(language)).login;

	return (
		<div className="container flex flex-col justify-center items-center bg-secondary gap-2 p-10">
			<LoginForm dict={loginDict.loginForm} />
			<Link className="text-black w-64" href="/register">
				{loginDict.register}
			</Link>
			<Link className="text-black w-64" href="/forgot-password">
				{loginDict.forgetPassword}
			</Link>
		</div>
	);
}
