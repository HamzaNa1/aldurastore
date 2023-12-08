import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata, ResolvingMetadata } from "next";
import { Cairo } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import Renewer from "@/components/Renewer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import getLanguage, { getDirection } from "@/lib/languages/language";

const inter = Cairo({ subsets: ["arabic", "latin"] });

// export const metadata: Metadata = {
// 	title: "Aldura Store",
// 	description: "",
// };

export async function generateMetadata(): Promise<Metadata> {
	const lang = getLanguage();

	return {
		title: lang == "ar" ? "متجر الدرة" : "Aldura Store",
	};
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const lang = getLanguage();
	const dir = getDirection();

	return (
		<html dir={dir} lang={lang}>
			<Toaster
				richColors
				position={dir == "rtl" ? "bottom-right" : "bottom-left"}
			/>
			<body className={inter.className + " no-scrollbar"}>
				<div className="min-h-screen w-screen flex flex-col">
					<div className="h-fit w-full justify-self-start flex-shrink-0">
						<Navbar />
					</div>
					<div className="flex-grow flex justify-center bg-secondary min-h-[300px] md:min-h-[700px]">
						{children}
					</div>
					<div className="h-fit w-full justify-self-start flex-shrink-0">
						<Footer />
					</div>
				</div>
				<Renewer />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
