import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
	return (
		<>
			<div className="w-full flex justify-center items-center bg-white">
				<div className="flex flex-col productsContainer h-full bg-white items-center justify-center">
					<div className="w-full flex flex-row py-16 lg:py-40 px-5 gap-y-16 gap-x-8 flex-wrap justify-center">
						<div className="flex justify-center flex-1">
							<div className="text-black flex flex-col gap-4 text-right">
								<span className="font-bold">تواصل</span>
								<span>info@aldurastore.com</span>
								<span>+968 77468122 </span>
							</div>
						</div>

						<div className="flex justify-center flex-1">
							<div className="text-black flex flex-col gap-4 text-right whitespace-nowrap">
								<span className="font-bold">الصفحات</span>
								<Link href="/" prefetch={true}>
									الصفحة الرئيسية
								</Link>
								<Link href="/products" prefetch={true}>
									جميع المنتجات
								</Link>
								<Link href="/cart" prefetch={true}>
									السلة
								</Link>
								<Link href="/account" prefetch={true}>
									الحساب
								</Link>
								<Link href="#">English | عربي</Link>
							</div>
						</div>

						<div className="flex justify-center flex-1">
							<div className="flex flex-col w-48 shrink ">
								<img
									className="w-full aspect-square"
									src="/High Quality white bg.jpg"
									alt="aldurastore"
								/>
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
										href="https://www.instagram.com/aldurra__store?igshid=NGVhN2U2NjQ0Yg%3D%3D"
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
