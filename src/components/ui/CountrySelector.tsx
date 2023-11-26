"use client";
import { SelectLocation } from "@/actions/GeneralActions";
import { countries, currencies } from "@/lib/locationUtils";
import React, { useRef, useState } from "react";
import { IoIosGlobe } from "react-icons/io";

interface CountrySelectorProps {
	country: string;
}

export default function CountrySelector({ country }: CountrySelectorProps) {
	const [hover, setHover] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={ref}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			tabIndex={0}
			className="group mx-5 relative h-full flex flex-row gap-2 justify-center items-center p-2 z-10"
		>
			<button className="group w-full h-full">
				<IoIosGlobe className="group w-full h-full fill-zinc-800 group-hover:fill-primary group-focus:fill-primary transition duration-300" />
			</button>
			{hover && (
				<div className="absolute flex flex-col gap-2 top-full bg-secondary drop-shadow-md border border-zinc-400/10 p-2 text-right">
					<span className="w-full text-zinc-800">العملات</span>
					<DropdownMenu setHover={setHover} country={country} />
				</div>
			)}
		</div>
	);
}

function DropdownMenu({
	setHover,
	country,
}: {
	setHover: React.Dispatch<React.SetStateAction<boolean>>;
	country: string;
}) {
	const [select, setSelect] = useState(
		countries.findIndex((x) => x == country) ?? 0
	);
	const [show, setShow] = useState(false);

	return (
		<>
			<div className="relative w-48 h-10">
				<button
					onClick={() => setShow(true)}
					className="w-full h-full bg-zinc-100 text-zinc-800"
				>
					{currencies[countries[select]]}
				</button>
				{show && (
					<div className="top-0 absolute w-full bg-zinc-100 drop-shadow-lg">
						<form className="flex flex-col px-4 ">
							{countries.map((x, i) => (
								<button
									key={i}
									formAction={async () => {
										await SelectLocation(x);
										setShow(false);
										setSelect(i);
										setHover(false);
									}}
									className={
										"w-full h-10 bg-zinc-100 text-zinc-800 border-t first:border-t-0 border-zinc-400 " +
										(select == i && "font-bold")
									}
								>
									{currencies[x]}
								</button>
							))}
						</form>
					</div>
				)}
			</div>
		</>
	);
}
