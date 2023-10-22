import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
export default function Footer() {
	return (
		<>
			<div className="flex flex-col w-full h-full bg-white items-center justify-center ">
				<div className="flex flex-row-reverse p-32 gap-40  ">
					<div>
						<img className="h-48 w-48" src="logoNobg.png" alt="" />
						<div className="text-black flex flex-row gap-5 p-3 items-center justify-center">
							<BsFacebook size={40} />
							<BsInstagram size={40} />
							<BsWhatsapp size={40} />
						</div>
					</div>

					<div className=" text-black flex flex-col gap-4">
						<span className="font-bold">الصفحات</span>
						<span>الصفحة الرئيسية</span>
						<span>جميع المنتجات</span>
						<span>السلة</span>
						<span>الحساب</span>
						<span>English | عربي</span>
					</div>

					<div className=" text-black flex flex-col gap-4">
						<span className="font-bold">تواصل</span>
						<span>البريد الألكتروني</span>
						<span>رقم الجوال</span>
						<span>الموقع</span>
					</div>
				</div>
			</div>
		</>
	);
}
