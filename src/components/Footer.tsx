import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
export default function Footer() {
	return (
		<>
			<div className="flex flex-col w-full h-full bg-white items-center justify-center ">
				<div className="flex flex-row p-32 gap-40  ">
					<div className=" text-black flex flex-col gap-4">
						<span className="font-bold">تواصل</span>
						<span>البريد الألكتروني</span>
						<span>رقم الجوال</span>
						<span>الموقع</span>
					</div>

					<div className=" text-black flex flex-col gap-4">
						<span className="font-bold">الصفحات</span>
						<span>الصفحة الرئيسية</span>
						<span>جميع المنتجات</span>
						<span>السلة</span>
						<span>الحساب</span>
						<span>English | عربي</span>
					</div>

					<div>
						<img className="h-48 w-48" src="logoNobg.png" alt="" />
						<div className="text-black flex flex-row gap-5 p-3 items-center justify-center">
							<Link
								href="https://www.facebook.com/aldurrastore?mibextid=LQQJ4d"
								rel="noopener noreferrer"
								target="_blank"
								className="group"
							>
								<BsFacebook
									size={40}
									className="fill-black  group-hover:fill-primary transition duration-200"
								/>
							</Link>

							<Link
								href="https://instagram.com/aldurrastore?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
								rel="noopener noreferrer"
								target="_blank"
								className="group"
							>
								<BsInstagram
									size={40}
									className="fill-black  group-hover:fill-primary transition duration-200"
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
									className="fill-black  group-hover:fill-primary transition duration-200"
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
