import Hero from "@/components/Hero";
import ProductView, { ProductViewSkeleton } from "@/components/ProductView";
import db from "@/lib/db";
import { Product } from "@/lib/schema";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
	return (
		<main className="w-screen bg-secondary">
			<div className="w-full h-fit flex flex-col items-center pb-10">
				<div className="container max-h-screen aspect-video bg-[#777777]">
					<Suspense fallback={<HeroSkeleton />}>
						<HeroSection />
					</Suspense>
				</div>
			</div>
			<div className="w-full h-fit bg-primary py-10 flex justify-center">
				<div className="container flex flex-col items-center gap-6">
					<span className="text-7xl">منتجاتنا</span>
					<div className="flex flex-row justify-center gap-10">
						<Suspense fallback={<ProductSkeleton />}>
							<ProductSection />
						</Suspense>
					</div>
					<Link
						href="/products"
						className="w-64 h-16 bg-white text-[#646464] rounded-3xl flex items-center justify-center drop-shadow-lg brightness-100 hover:brightness-90 transition duration-300"
					>
						<span className="text-2xl">عرض الجميع</span>
					</Link>
				</div>
			</div>
		</main>
	);
}

async function HeroSection() {
	const images = await db.query.heroImages.findMany({});

	return <Hero images={images.map((x) => x.imageURL)} />;
}

async function HeroSkeleton() {
	return <div className="w-full h-full bg-zinc-400 animate-pulse"></div>;
}

async function ProductSection() {
	const products = await db.query.products.findMany({
		where: (product, { eq }) =>
			eq(product.showOnMain, true) && eq(product.activated, true),
	});

	return (
		<>
			{products.map((product, i) => (
				<ProductView key={i} product={product}></ProductView>
			))}
		</>
	);
}

async function ProductSkeleton() {
	return (
		<>
			<ProductViewSkeleton />
			<ProductViewSkeleton />
			<ProductViewSkeleton />
		</>
	);
}
