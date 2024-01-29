"use client";

import { MenuDict } from "@/lib/languages/types";
import Link from "next/link";
import { useState } from "react";
import { IoMenuSharp, IoReturnDownBack } from "react-icons/io5";

interface MenuProps {
	dict: MenuDict;
	dir: "rtl" | "ltr";
}

export default function Menu({ dict, dir }: MenuProps) {
	const [show, setShow] = useState(false);

	const ShowSetter = (value: boolean) => {
		setShow(value);

		if (value) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	};

	return (
		<>
			<button className="w-full h-full" onClick={() => ShowSetter(true)}>
				<IoMenuSharp className="w-full h-full fill-zinc-800 rounded-full" />
			</button>
			{show && (
				<div
					dir="ltr"
					className="fixed flex h-screen w-full left-0 top-0 bg-black/30 z-[99]"
				>
					<div
						dir={dir}
						className="shrink-0 min-w-fit w-[70%] h-full bg-secondary z-[98]"
					>
						<DropdownMenu handleClick={() => ShowSetter(false)} dict={dict} />
					</div>
					<div
						onClick={() => ShowSetter(false)}
						className="absolute w-full h-full"
					></div>
				</div>
			)}
		</>
	);
}

function DropdownMenu({
	handleClick,
	dict,
}: {
	handleClick: () => void;
	dict: MenuDict;
}) {
	return (
		<>
			<div className="flex-col w-full h-full items-center justify-center text-zinc-800">
				<div className="text-center shadow">
					<span className="w-full text-lg text-primary whitespace-nowrap">
						{dict.aldurastore}
					</span>
				</div>
				<button className="w-full h-10 p-2" onClick={() => handleClick()}>
					<div className="mx-auto h-full aspect-square">
						<IoReturnDownBack className="h-full w-full" />
					</div>
				</button>
				<div className="px-2">
					<div className="border-b border-b-zinc-400"></div>
				</div>
				<div className="w-full p-2">
					<Link
						className="w-full h-full selection:bg-white no_highlights"
						onClick={() => handleClick()}
						href="/"
					>
						<div className="w-full">{dict.home}</div>
					</Link>
				</div>
				<div className="px-2">
					<div className="border-b border-b-zinc-400"></div>
				</div>
				<div className="w-full p-2">
					<Link
						className="w-full h-full selection:bg-white no_highlights"
						onClick={() => handleClick()}
						href="/products"
					>
						<div className="w-full">{dict.products}</div>
					</Link>
				</div>
				<div className="px-2">
					<div className="border-b border-b-zinc-400"></div>
				</div>
			</div>
		</>
	);
}
