import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "@/lib/Utils/userUtils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
	const user = getServerSession();

	if (user) {
		redirect("/");
	}

	return (
		<div className="w-full flex flex-col justify-center items-center bg-secondary gap-2 py-10">
			<RegisterForm />
			<Link className="text-black text-right w-64" href="/login">
				لديك حساب؟
			</Link>
		</div>
	);
}
