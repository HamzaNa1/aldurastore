"use client";
import { IoIosGlobe } from "react-icons/io";

export default function CountrySelector() {
	return (
		<button className="group mx-5 h-full flex flex-row gap-2 justify-center items-center p-2 z-10">
			<IoIosGlobe className="w-full h-full fill-zinc-800 group-hover:fill-primary group-focus:fill-primary transition duration-300" />
		</button>
	);
}
