import Hero from "@/components/Hero";
import ProductView from "@/components/ProductView";
import Link from "next/link";

export default function Home() {
	return (
		<main className="w-screen bg-secondary">
			<div className="w-full h-fit flex flex-col items-center pb-10">
				<Hero />
			</div>
			<div className="w-full h-fit bg-primary p-10 flex flex-col items-center gap-6">
				<span className="text-7xl">منتجاتنا</span>
				<div className="flex flex-row justify-center gap-10">
					<ProductView></ProductView>
					<ProductView></ProductView>
					<ProductView></ProductView>
				</div>

				<Link
					href="/"
					className="w-64 h-16 bg-white text-[#646464] rounded-3xl flex items-center justify-center drop-shadow-lg"
				>
					<span className="text-2xl">عرض الجميع</span>
				</Link>
			</div>
		</main>
	);
}
