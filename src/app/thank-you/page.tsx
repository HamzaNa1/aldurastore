import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";
import Link from "next/link";

export default async function ThankYouPage() {
	const language = getLanguage();
	const thankyouDict = (await getDictionary(language)).thankyou;

	return (
		<div className="flex flex-col container justify-center items-center px-1 gap-7">
			<div className="flex flex-col gap-3 items-center">
				<IconCheckCircle className="text-green-500 w-16 h-16 drop-shadow-lg"></IconCheckCircle>
				<h1 className="text-zinc-800 text-5xl font-bold">
					{thankyouDict.thankyou}
				</h1>
				<span className="text-zinc-500 text-lg">{thankyouDict.message}</span>
			</div>
			<Link
				className="text-center bg-primary w-full max-w-sm rounded-md p-1 hover:brightness-90 drop-shadow-lg"
				href="/"
			>
				{thankyouDict.homepage}
			</Link>
		</div>
	);
}

function IconCheckCircle(props: { className?: string }) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
			<polyline points="22 4 12 14.01 9 11.01" />
		</svg>
	);
}
