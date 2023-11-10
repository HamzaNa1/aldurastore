"use client";

import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<div>
			<button
				className="w-8 h-8 outline outline-2 outline-zinc-800 rounded-full"
				onClick={() => router.back()}
			>
				<BiArrowBack className="w-full h-full fill-zinc-800" />
			</button>
		</div>
	);
}
