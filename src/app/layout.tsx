import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import Renewer from "@/components/Renewer";
import getLanguage, { getDirection } from "@/lib/languages/language";
import Banner from "@/components/Banner";
import Script from "next/script";
import InitialCountrySelector from "@/components/InitialCountrySelector";
import { cookies } from "next/headers";

const inter = Cairo({ subsets: ["arabic", "latin"] });

// export const metadata: Metadata = {
// 	title: "Aldura Store",
// 	description: "",
// };

export async function generateMetadata(): Promise<Metadata> {
	const lang = getLanguage();

	return {
		title: lang == "ar" ? "متجر الدرة" : "Aldura Store",
		metadataBase: new URL("https://aldurastore.com"),
		applicationName: lang == "ar" ? "متجر الدرة" : "Aldura Store",
		referrer: "origin-when-cross-origin",
		category: "store",
		publisher: "Deveopix",
		openGraph: {
			images: [{ url: "/opengraph-image.png" }],
		},
	};
}

export const viewport: Viewport = {
	themeColor: "#e5e7eb",
	colorScheme: "only light",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const lang = getLanguage();
	const dir = getDirection();
	const cookieStore = cookies();

	return (
		<html dir={dir} lang={lang}>
			<Toaster
				richColors
				position={dir == "rtl" ? "bottom-right" : "bottom-left"}
			/>
			<body className={inter.className + " no-scrollbar text-white"}>
				<div className="min-h-screen flex flex-col">
					{!cookieStore.get("country") && <InitialCountrySelector />}
					<Banner />
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
			</body>
			<Script src="https://www.googletagmanager.com/gtag/js?id=AW-11394477421" />
			<Script id="google-ads">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'AW-11394477421');
        `}
			</Script>
		</html>
	);
}
