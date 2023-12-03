import Hero from "@/components/Hero";
import ProductView, { ProductViewSkeleton } from "@/components/ProductView";
import getCountry from "@/lib/country";
import db from "@/lib/db";
import { getDictionary } from "@/lib/languages/dictionaries";
import getLanguage from "@/lib/languages/language";
import { ProductViewDict } from "@/lib/languages/types";
import { products } from "@/lib/schema";
import { sql } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
	const language = getLanguage();
	const dict = await getDictionary(language);
	const mainDict = dict.main;

	return (
		<main className="w-screen bg-secondary">
			<div className="flex items-center justify-center py-20">
				<div className="w-full h-full max-w-5xl px-1">
					<Suspense fallback={<HeroSkeleton />}>
						<HeroSection />
					</Suspense>
				</div>
			</div>
			<div className="w-full h-fit bg-primary py-10 flex justify-center">
				<div className="container flex flex-col items-center gap-6 p-2">
					<span className="text-7xl">{mainDict.products}</span>
					<div className="productsContainer h-fit flex flex-row flex-wrap justify-center gap-1 md:gap-5 px-1 py-10">
						<Suspense fallback={<ProductSkeleton />}>
							<ProductSection dict={dict.productView} />
						</Suspense>
					</div>
					<Link
						href="/products"
						className="w-64 h-16 bg-white text-[#646464] rounded-3xl flex items-center justify-center drop-shadow-lg brightness-100 hover:brightness-90 transition duration-300"
					>
						<span className="text-2xl">{mainDict.showAll}</span>
					</Link>
				</div>
			</div>
		</main>
	);
}

async function HeroSection() {
	const images = await db.query.heroImages.findMany({});

	return (
		<Hero
			images={images.sort((a, b) => a.order - b.order).map((x) => x.imageURL)}
		/>
	);
}

async function HeroSkeleton() {
	return (
		<div className="aspect-video w-full">
			<div className="relative w-full h-full bg-[#B9B9B9] overflow-hidden drop-shadow-lg rounded-lg"></div>
		</div>
	);
}

async function ProductSection({ dict }: { dict: ProductViewDict }) {
	const country = getCountry();

	const language = getLanguage();

	const mainProducts = await db.query.products.findMany({
		extras:
			language == "en"
				? {
						name: sql<string>`${products.nameEN}`.as("name"),
				  }
				: undefined,
		where: (product, { and, eq }) =>
			and(eq(product.showOnMain, true), eq(product.activated, true)),
		with: {
			productPrices: {
				where: (productPrice, { eq }) => eq(productPrice.country, country),
			},
		},
	});

	return (
		<>
			{mainProducts.map((product, i) => (
				<div key={i} className="w-[47%] max-w-[375px]">
					<ProductView product={product} dict={dict}></ProductView>
				</div>
			))}
		</>
	);
}

async function ProductSkeleton() {
	return (
		<>
			<div className="w-[47%] max-w-[375px]">
				<ProductViewSkeleton />
			</div>
			<div className="w-[47%] max-w-[375px]">
				<ProductViewSkeleton />
			</div>
			<div className="w-[47%] max-w-[375px]">
				<ProductViewSkeleton />
			</div>
		</>
	);
}
