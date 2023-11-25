import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { getServerSession } from "@/lib/userUtils";
import CartCount from "./ui/CartCount";
import { Suspense } from "react";
import CountrySelector from "./ui/CountrySelector";
import getCountry from "@/lib/country";

export default async function Navbar() {
	const user = getServerSession();
	const country = getCountry();

	return (
		<div className="w-full h-16 bg-secondary flex flex-row px-4 py-1">
			<Link
				href="/"
				className="relative self-start aspect-square h-full p-1 z-10"
			>
				<Image src="/logo.png" alt="" fill className="h-full object-contain" />
			</Link>
			<CountrySelector country={country} />
			<div className="h-full flex-1">
				<div className="absolute top-0 py-1 w-screen h-16 flex gap-12 left-[50%] -translate-x-[50%] justify-center items-center text-black text-xl select-none">
					<Link href="/products">
						<span className="hover:text-primarytext transition">
							جميع المنتجات
						</span>
					</Link>
					<Link href="/">
						<span className="hover:text-primarytext transition">
							الصفحة الرئيسية
						</span>
					</Link>
				</div>
			</div>
			<div className="w-fit h-full p-2 flex flex-row gap-4 justify-center flex-shrink-0 z-10">
				{user?.admin && (
					<div className="flex justify-center items-center h-full text-zinc-800">
						<Link href="/dashboard">Dashboard</Link>
					</div>
				)}

				<Link
					href="/cart"
					className="flex flex-row items-center group space-x-[-6px]"
				>
					<Suspense fallback={<></>}>
						<CartCount></CartCount>
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
