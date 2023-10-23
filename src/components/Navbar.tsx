import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
export default function Navbar() {
	return (
		<div className="w-full h-16 bg-secondary flex flex-row px-4 py-1">
			<Link href="/" className="relative self-start aspect-square h-full p-1">
				<Image src="/logo.png" alt="" fill className="h-full object-contain" />
			</Link>
			<div className="relative h-full flex-1">
				<div className="absolute h-full flex gap-5 left-[50%] -translate-x-[50%] items-center">
					<Link href="/products">
						<span className="text-black text-xl select-none">
							جميع المنتجات
						</span>
					</Link>
					<Link href="/">
						<span className="text-black text-xl select-none">
							الصفحة الرئيسية
						</span>
					</Link>
				</div>
			</div>
			<div className="w-fit h-full p-2 flex flex-row gap-4">
				<Link href="/cart" className="w-full h-full aspect-square">
					<AiOutlineShoppingCart className="fill-zinc-800 w-full h-full" />
				</Link>
				<Link href="/login" className="w-full h-full aspect-square">
					<VscAccount className="fill-zinc-800 w-full h-full" />
				</Link>
			</div>
		</div>
	);
}
