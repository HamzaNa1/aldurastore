import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";

export default async function ForgotPassword() {
	const language = getLanguage();
	const forgotPasswordDict = (await getDictionary(language)).forgotPassword;

	return (
		<div className="w-full bg-secondary flex flex-col justify-center items-center gap-5 px-1">
			<span className="text-primarytext text-2xl sm:text-3xl md:text-4xl">
				{forgotPasswordDict.forgot}
			</span>
			<p className="text-zinc-800 text-sm sm:text-base md:text-lg text-center">
				{forgotPasswordDict.label}
			</p>
		</div>
	);
}
