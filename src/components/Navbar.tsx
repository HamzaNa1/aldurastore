import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { getServerSession } from "@/lib/Utils/userUtils";
import CartCount from "./ui/CartCount";
import { Suspense } from "react";
import CountrySelector from "./ui/CountrySelector";
import getCountry from "@/lib/country";
import Menu from "./Menu";

export default async function Navbar() {
	const user = getServerSession();
	const country = getCountry();

	return (
		<div className="w-full h-16 flex flex-row relative p-1 bg-secondary md:px-2 lg:px-8">
			<Link
				href="/"
				className="absolute md:relative max-md:left-1/2 max-md:top-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 min-w-fit aspect-square h-full"
			>
				<Image
					src="/logo.png"
					alt=""
					fill
					className="absolute w-full h-full object-center object-contain p-1 md:p-0"
				/>
			</Link>
			<div className="flex justify-center items-center p-2 md:p-0 gap-1 self-start h-full">
				<div className="aspect-square h-full md:hidden">
					<Menu />
				</div>
				<CountrySelector country={country} />
			</div>
			<div className="hidden md:block h-full flex-1">
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

	// return (
	// 	<div className="relative w-full h-16 bg-secondary flex flex-row px-1 md:px-4 py-1">
	// 		<div className="absolute md:static w-screen md:w-auto h-full">
	// 			<Link href="/" className="aspect-square h-full p- z-10">
	// 				<Image
	// 					src="/logo.png"
	// 					alt=""
	// 					fill
	// 					className="h-full object-contain"
	// 				/>
	// 			</Link>
	// 		</div>
	// 		<CountrySelector country={country} />
	// <div className="hidden md:block h-full flex-1">
	// 	<div className="absolute top-0 py-1 w-screen h-16 flex gap-12 left-[50%] -translate-x-[50%] justify-center items-center text-black text-xl select-none">
	// 		<Link href="/products">
	// 			<span className="hover:text-primarytext transition">
	// 				جميع المنتجات
	// 			</span>
	// 		</Link>
	// 		<Link href="/">
	// 			<span className="hover:text-primarytext transition">
	// 				الصفحة الرئيسية
	// 			</span>
	// 		</Link>
	// 	</div>
	// </div>
	// 		<div className="w-fit h-full py-2 md:p-2 flex flex-row gap-4 justify-center ml-auto flex-shrink-0 z-10">
	// 			{user?.admin && (
	// 				<div className="flex justify-center items-center h-full text-zinc-800">
	// 					<Link href="/dashboard">Dashboard</Link>
	// 				</div>
	// 			)}

	// 			<Link
	// 				href="/cart"
	// 				className="flex flex-row items-center group space-x-[-6px]"
	// 			>
	// 				<Suspense fallback={<></>}>
	// 					<CartCount></CartCount>
	// 				</Suspense>
	// 				<div className="w-full h-full aspect-square">
	// 					<AiOutlineShoppingCart className="fill-zinc-800 w-full h-full group-hover:fill-primary transition" />
	// 				</div>
	// 			</Link>
	// 			<div className="h-full aspect-square overflow-hidden whitespace-normal">
	// 				<Link href={user ? "/account" : "/login"} className="w-full h-full">
	// 					<VscAccount className="fill-zinc-800 w-full h-full hover:fill-primary transition" />
	// 				</Link>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
}
