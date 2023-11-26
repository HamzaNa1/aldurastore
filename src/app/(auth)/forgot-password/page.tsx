import ConfirmationEmail from "@/lib/emails";

export default function ForgotPassword() {
	return (
		<ConfirmationEmail code="123456" />
		// <div className="w-full bg-secondary flex flex-col justify-center items-center gap-5">
		// 	<span className="text-primarytext text-4xl">نسيت كلمة السر؟</span>
		// 	<p className="text-zinc-800 text-lg">
		// 		<span>
		// 			!لإسترجاع كلمة السر <span> example@email.com </span>يمكنك التواصل معنا
		// 			بستخدام الأيميل
		// 		</span>
		// 	</p>
		// </div>
	);
}
