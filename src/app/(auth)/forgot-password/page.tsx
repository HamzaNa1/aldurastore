export default function ForgotPassword() {
	return (
		<div className="w-full bg-secondary flex flex-col justify-center items-center gap-5 px-1">
			<span className="text-primarytext text-2xl sm:text-3xl md:text-4xl">
				نسيت كلمة السر؟
			</span>
			<p
				dir="rtl"
				className="text-zinc-800 text-sm sm:text-base md:text-lg text-center"
			>
				لإسترجاع كلمة السر, يمكنك التواصل معنا على البريد الألكتروني:
				info@aldurastore.com
			</p>
		</div>
	);
}
