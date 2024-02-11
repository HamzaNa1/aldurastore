"use client";

import { SelectLocation } from "@/actions/GeneralActions";
import { locations } from "@/lib/Utils/locationUtils";
import { countryToFlag } from "@/lib/flags";
import { InitialCountrySelectorDict } from "@/lib/languages/types";
import { useEffect } from "react";

interface InitialCountrySelectorProps {
	dict: InitialCountrySelectorDict;
}

export default function InitialCountrySelector({
	dict,
}: InitialCountrySelectorProps) {
	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "visible";
		};
	}, []);

	return (
		<div className="absolute inset-0 bg-black/30 z-[99] flex justify-center items-center">
			<div className="max-w-md w-full py-12 px-4 bg-white my-auto rounded-md mx-2 text-center space-y-8">
				<h3 className="text-zinc-800 font-medium text-3xl">{dict.select}</h3>

				<form className="w-full h-full flex justify-center items-center gap-4 flex-wrap">
					{locations.map((x) => (
						<button
							key={x.code}
							formAction={async () => {
								await SelectLocation(x.code);
							}}
							className="w-12"
						>
							{countryToFlag(x.code, { className: "drop-shadow-lg" })}
						</button>
					))}
				</form>
			</div>
		</div>
	);
}
