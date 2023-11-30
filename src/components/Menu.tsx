"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoReturnDownBack } from "react-icons/io5";

export default function Menu() {
	const [show, setShow] = useState(false);

	return (
		<>
			<button className="w-full h-full" onClick={() => setShow(true)}>
				<GiHamburgerMenu className="w-full h-full fill-zinc-800 rounded-full" />
			</button>
			{show && <DropdownMenu handleClick={() => setShow(false)} />}
		</>
	);
}

function DropdownMenu({ handleClick }: { handleClick: () => void }) {
	return (
		<div className="fixed flex h-screen w-screen left-0 top-0 bg-black/30 z-[99]">
			<div className="shrink-0 min-w-fit w-[70%] bg-secondary">
				<div className="flex-col w-full h-full items-center justify-center text-zinc-800 text-right">
					<div className="text-center shadow">
						<span className="w-full text-lg text-primary whitespace-nowrap">
							متجر الدرة
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
							<div className="w-full">الصفحة الرئيسية</div>
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
							<div className="w-full">جميع المنتجات</div>
						</Link>
					</div>
					<div className="px-2">
						<div className="border-b border-b-zinc-400"></div>
					</div>
				</div>
			</div>
			<div onClick={() => handleClick()} className="w-full h-full"></div>
		</div>
	);
}
