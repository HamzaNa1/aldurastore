import LoginForm from "@/components/ui/LoginForm";
import { getServerSession } from "@/lib/Utils/userUtils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
	const user = getServerSession();

	if (user) {
		redirect("/");
	}

	return (
		<div className="container flex flex-col justify-center items-center bg-secondary gap-2 p-10">
			<LoginForm />
			<Link className="text-black text-right w-64" href="/register">
				تسجيل حساب جديد
			</Link>
			<Link className="text-black text-right w-64" href="/forgot-password">
				نسيت كلمة السر؟
			</Link>
		</div>
	);
}
