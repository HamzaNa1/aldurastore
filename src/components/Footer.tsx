import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { SelectLanguage } from "@/actions/GeneralActions";
import getLanguage from "@/lib/languages/language";
import { getDictionary } from "@/lib/languages/dictionaries";
import Image from "next/image";
import logo from "@/images/logobg.jpg";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export default async function Footer() {
	const language = getLanguage();
	const footerDict = (await getDictionary(language)).footer;

	return (
		<>
			<div className="w-full flex justify-center items-center bg-white">
				<div className="flex flex-col productsContainer h-full bg-white items-center justify-center">
					<div className="w-full flex flex-row py-16 lg:py-40 px-5 gap-y-16 gap-x-8 flex-wrap justify-center">
						<div className="flex justify-center flex-1">
							<div className="flex flex-col w-48 shrink ">
								<div className="relative w-full aspect-square">
									<Image
										src={logo}
										alt="aldurastore"
										className="absolute"
										fill
									/>
								</div>
								<div className="flex flex-row gap-5 p-3 items-center justify-center">
									<Link
										href="https://www.facebook.com/aldurrastore?mibextid=LQQJ4d"
										rel="noopener noreferrer"
										target="_blank"
										className="group"
									>
										<BsFacebook
											size={40}
											className="fill-zinc-800  group-hover:fill-primary transition duration-200"
										/>
									</Link>

									<Link
										href="https://www.instagram.com/aldurra.store?igsh=eWhyd3VzMm40aGgx"
										rel="noopener noreferrer"
										target="_blank"
										className="group"
									>
										<BsInstagram
											size={40}
											className="fill-zinc-800  group-hover:fill-primary transition duration-200"
										/>
									</Link>

									<Link
										href="https://api.whatsapp.com/send?phone=96877468122"
										rel="noopener noreferrer"
										target="_blank"
										className="group"
									>
										<BsWhatsapp
											size={40}
											className="fill-zinc-800  group-hover:fill-primary transition duration-200"
										/>
									</Link>

									<Link
										href="https://www.tiktok.com/@aldurra_store?_t=8jzczFVESyj&_r=1"
										rel="noopener noreferrer"
										target="_blank"
										className="group"
									>
										<FaTiktok
											size={40}
											className="fill-zinc-800  group-hover:fill-primary transition duration-200"
										/>
									</Link>
								</div>
							</div>
						</div>
						<div className="flex justify-center flex-1">
							<div className="text-black flex flex-col gap-4 whitespace-nowrap">
								<span className="font-bold">{footerDict.pages}</span>
								<Link href="/" prefetch={true}>
									{footerDict.home}
								</Link>
								<Link href="/products" prefetch={true}>
									{footerDict.products}
								</Link>
								<Link href="/cart" prefetch={true}>
									{footerDict.cart}
								</Link>
								<Link href="/account" prefetch={true}>
									{footerDict.account}
								</Link>
								<span>
									<form>
										<button
											formAction={async () => {
												"use server";
												await SelectLanguage("en");
											}}
										>
											English
										</button>{" "}
										|{" "}
										<button
											formAction={async () => {
												"use server";
												await SelectLanguage("ar");
											}}
										>
											عربي
										</button>
									</form>
								</span>
							</div>
						</div>
						<div className="flex justify-center flex-1">
							<div className="text-black flex flex-col gap-4">
								<span className="font-bold">{footerDict.contact}</span>
								<div className="flex items-center gap-2">
									<IoMdMail size={20} />
									<span>info@aldurastore.com</span>
								</div>
								<div>
									<div className="flex items-center gap-2">
										<FaPhoneAlt size={20} />
										<span dir="ltr">+968 77468122</span>
									</div>
								</div>
								<div>
									<Link
										className="flex items-center gap-2"
										href="https://maps.app.goo.gl/XGifRSxKHNknFvyL6"
										rel="noopener noreferrer"
										target="_blank"
									>
										<FaLocationDot size={20} />
										<span dir="ltr">OMAN SALALAH ALWADI </span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
