import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
	title: "Aldura Store",
	description: "",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className + " no-scrollbar"}>
				<div className="min-h-screen w-full flex flex-col">
					<div className="h-fit w-full justify-self-start flex-shrink-0">
						<Navbar />
					</div>
					<div className="flex-grow flex justify-center bg-secondary">
						{children}
					</div>
					<div className="h-fit w-full justify-self-start flex-shrink-0">
						<Footer />
					</div>
				</div>
			</body>
		</html>
	);
}
