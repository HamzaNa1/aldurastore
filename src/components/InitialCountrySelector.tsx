"use client";

import { SelectLocation } from "@/actions/GeneralActions";
import { locations } from "@/lib/Utils/locationUtils";
import { countryToFlag } from "@/lib/flags";
import { useEffect } from "react";

export default function InitialCountrySelector() {
	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "visible";
		};
	}, []);

	return (
		<div className="absolute inset-0 bg-black/30 z-[99] flex justify-center items-center">
			<div className="max-w-lg w-full py-12 px-2 bg-white my-auto rounded-md mx-2">
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
