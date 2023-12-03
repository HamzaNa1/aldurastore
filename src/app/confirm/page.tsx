import ConfirmForm from "@/components/ConfirmForm";
import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";

export default async function ConfirmPage() {
	const language = getLanguage();
	const confirmDict = (await getDictionary(language)).confirm;

	return (
		<div className="flex min-h-[50vh] justify-center items-center px-1">
			<div className="container flex flex-col gap-10">
				<div className="flex flex-col gap-5">
					<span className="text-primarytext text-2xl sm:text-3xl md:text-4xl">
						{confirmDict.confirmEmail}
					</span>
					<span className="text-zinc-400 text-xs sm:text-sm md:text-base">
						{confirmDict.codeSent}
					</span>
				</div>
				<form className="flex flex-col gap-5">
					<ConfirmForm dict={confirmDict.confirmForm} />
				</form>
			</div>
		</div>
	);
}
