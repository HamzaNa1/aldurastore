import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { getServerSession } from "@/lib/Utils/userUtils";
import CartCount from "./ui/CartCount";
import { Suspense } from "react";
import CountrySelector from "./ui/CountrySelector";
import getCountry from "@/lib/country";
import Menu from "./Menu";
import getLanguage, { getDirection } from "@/lib/languages/language";
import { getDictionary } from "@/lib/languages/dictionaries";

export default async function Navbar() {
	const user = getServerSession();
	const country = getCountry();
	const language = getLanguage();
	const navbarDict = (await getDictionary(language)).navbar;
	const dir = getDirection();

	return (
		<div
			dir="ltr"
			className="w-full h-16 flex flex-row relative p-1 bg-secondary md:px-2 lg:px-8"
		>
			<Link
				href="/"
				className="absolute md:relative max-md:left-1/2 max-md:top-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 min-w-fit aspect-square h-full z-50"
			>
				<img
					src="/logo.png"
					alt=""
					className="absolute w-full h-full object-center object-contain p-1 md:p-0"
				/>
			</Link>
			<div className="flex justify-center items-center p-2 md:p-0 gap-1 self-start h-full">
				<div className="aspect-square h-full md:hidden">
					<Menu />
				</div>
				<CountrySelector country={country} />
			</div>
			<div dir={dir} className="hidden md:block h-full flex-1">
				<div className="absolute top-0 py-1 w-screen h-16 flex gap-12 left-[50%] -translate-x-[50%] justify-center items-center text-black text-xl select-none">
					<Link href="/">
						<span className="hover:text-primarytext transition">
							{navbarDict.home}
						</span>
					</Link>
					<Link href="/products">
						<span className="hover:text-primarytext transition">
							{navbarDict.products}
						</span>
					</Link>
				</div>
			</div>
			<div className="w-fit h-full p-3 sm:p-2 flex flex-row gap-4 justify-center ml-auto z-10">
				{user?.admin && (
					<div className="hidden md:flex justify-center items-center h-full text-zinc-800">
						<Link href="/dashboard">Dashboard</Link>
					</div>
				)}

				<Link
					href="/cart"
					className="flex flex-row items-center group space-x-[-6px] h-full"
				>
					<Suspense fallback={<></>}>
						<CartCount />
					</Suspense>
					<div className="w-full h-full aspect-square">
						<AiOutlineShoppingCart className="fill-zinc-800 w-full h-full group-hover:fill-primary transition" />
					</div>
				</Link>
				<div className="h-full aspect-square overflow-hidden whitespace-normal">
					<Link href={user ? "/account" : "/login"} className="w-full h-full">
						<VscAccount className="fill-zinc-800 w-full h-full hover:fill-primary transition" />
					</Link>
				</div>
			</div>
		</div>
	);
}
