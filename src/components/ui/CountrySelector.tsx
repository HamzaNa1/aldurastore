"use client";
import { SelectLocation } from "@/actions/GeneralActions";
import { locations } from "@/lib/Utils/locationUtils";
import { countryToFlag } from "@/lib/flags";
import { CountryDict } from "@/lib/languages/types";
import React, { useEffect, useRef, useState } from "react";
import { IoIosGlobe } from "react-icons/io";

interface CountrySelectorProps {
	country: string;
	dict: CountryDict;
}

export default function CountrySelector({
	country,
	dict,
}: CountrySelectorProps) {
	const [hover, setHover] = useState(false);
	const [focus, setFocus] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	function handleResize() {
		if (!ref.current) {
			return;
		}

		var parentDiv = ref.current.offsetParent;
		var rect = ref.current.getBoundingClientRect();
		var parentRect = parentDiv!.getBoundingClientRect();

		if (rect.left < 0) {
			ref.current.style.left = -parentRect.left + "px";
		}
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, [ref, hover, focus]);

	return (
		<div
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => setHover(false)}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			tabIndex={0}
			className="group relative h-full aspect-square flex flex-row gap-2 md:p-2 justify-center items-center z-10"
		>
			<button className="group w-full h-full">
				{countryToFlag(country, { className: "drop-shadow-lg" }) ?? (
					<IoIosGlobe className="group w-full h-full fill-zinc-800 group-hover:fill-primary group-focus:fill-primary transition duration-300" />
				)}
			</button>
			{(hover || focus) && (
				<div
					ref={ref}
					className="absolute flex flex-col gap-2 top-full bg-secondary drop-shadow-md border border-zinc-400/10 p-2 text-right"
				>
					<DropdownMenu
						setHover={setHover}
						setFocus={setFocus}
						country={country}
						dict={dict}
					/>
				</div>
			)}
		</div>
	);
}

function DropdownMenu({
	setHover,
	setFocus,
	country,
	dict,
}: {
	setHover: React.Dispatch<React.SetStateAction<boolean>>;
	setFocus: React.Dispatch<React.SetStateAction<boolean>>;
	country: string;
	dict: CountryDict;
}) {
	const [select, setSelect] = useState(
		locations.findIndex((x) => x.code == country) ?? 0
	);
	const [show, setShow] = useState(false);

	return (
		<>
			<div className="relative w-48 h-10">
				<button
					onClick={() => setShow(true)}
					className="w-full h-full bg-zinc-100 text-zinc-800"
				>
					<span className="w-full text-zinc-800">{dict.currencies}</span>
				</button>
				{show && (
					<div className="top-0 absolute w-full bg-zinc-100 drop-shadow-lg">
						<form className="flex flex-col px-4 ">
							{locations.map((x, i) =>
								select != i ? (
									<button
										key={x.code}
										formAction={async () => {
											await SelectLocation(x.code);
											setShow(false);
											setSelect(i);
											setHover(false);
											setFocus(false);
										}}
										className={
											"w-full h-10 bg-zinc-100 text-zinc-800 border-t first:border-t-0 border-zinc-400 flex justify-center "
										}
									>
										<div className="h-full aspect-square flex">
											{countryToFlag(x.code, { className: "drop-shadow-lg" })}
										</div>
									</button>
								) : undefined
							)}
						</form>
					</div>
				)}
			</div>
		</>
	);
}
