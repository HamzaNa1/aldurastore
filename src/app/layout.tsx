import "./globals.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";

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
			<body className={inter.className}>{children}</body>
			<body className={inter.className + " no-scrollbar"}>
			</body>
		</html>
	);
}
