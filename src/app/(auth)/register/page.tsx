import RegisterForm from "@/components/RegisterForm";
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
	const registerDict = (await getDictionary(language)).register;

	return (
		<div className="w-full flex flex-col justify-center items-center bg-secondary gap-2 py-10">
			<RegisterForm
				dict={registerDict.registerForm}
				sitekey={process.env.RECAPTCHA_PUBLIC_KEY ?? ""}
			/>
			<Link className="text-black w-64" href="/login">
				{registerDict.alreadyRegistered}
			</Link>
		</div>
	);
}
