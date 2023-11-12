import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { getServerSession } from "@/lib/userUtils";

export default function Navbar() {
	const user = getServerSession();

	return (
		<div className="w-full h-16 bg-secondary flex flex-row px-4 py-1">
			<Link href="/" className="relative self-start aspect-square h-full p-1">
				<Image src="/logo.png" alt="" fill className="h-full object-contain" />
			</Link>
			<div className="relative h-full flex-1">
				<div className="absolute h-full flex gap-12 left-[50%] -translate-x-[50%] items-center text-black text-xl select-none">
					<Link href="/products">
						<span className="hover:text-primarytext">جميع المنتجات</span>
					</Link>
					<Link href="/">
						<span className="hover:text-primarytext">الصفحة الرئيسية</span>
					</Link>
				</div>
			</div>
			<div className="w-fit h-full p-2 flex flex-row gap-4">
				<Link href="/cart" className="w-full h-full aspect-square">
					<AiOutlineShoppingCart className="fill-zinc-800 w-full h-full hover:fill-primary" />
				</Link>
				<div className="w-full h-full aspect-square overflow-hidden whitespace-normal">
					<Link href={user ? "/account" : "/login"} className="w-full h-full">
						<VscAccount className="fill-zinc-800 w-full h-full hover:fill-primary" />
					</Link>
				</div>
			</div>
		</div>
	);
}
