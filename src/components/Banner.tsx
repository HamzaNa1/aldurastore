import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";

export default async function Banner() {
	const language = getLanguage();
	const bannerDict = (await getDictionary(language)).banner;

	return (
		<div className="w-full flex justify-center items-center bg-primary py-2">
			<div className="flex flex-row items-center gap-1 p-1">
				<span className="text-zinc-100 text-center">{bannerDict.label}</span>
			</div>
		</div>
	);
}
