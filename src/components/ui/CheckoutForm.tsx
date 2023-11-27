"use client";

import { locations } from "@/lib/Utils/locationUtils";
import AutoComplete from "./AutoComplete";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { CreateOrder } from "@/actions/GeneralActions";

export default function CheckoutForm() {
	const [cityOptions, setCityOptions] = useState<string[]>([]);

	return (
		<form
			action={async (formData: FormData) => {
				const firstName = formData.get("firstname") as string;
				const lastName = formData.get("lastname") as string;
				const phonenumber = formData.get("phonenumber") as string;
				const location = formData.get("location") as string;
				const region = formData.get("region") as string;
				const address = formData.get("address") as string;

				await CreateOrder({
					firstName: firstName,
					lastName: lastName,
					phoneNumber: phonenumber,
					location: location,
					region: region,
					address: address,
				});
			}}
			className="flex flex-col flex-[2_2_auto] items-end gap-6"
		>
			<span className="text-primarytext text-3xl font-bold text-right w-full h-10">
				تفاصيل العنوان
			</span>
			<div className="flex flex-col gap-3 w-full">
				<div className="w-full flex flex-row-reverse gap-1">
					<AutoComplete
						id="firstname"
						label="الاسم"
						className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
						inputDir="rtl"
					></AutoComplete>
					<AutoComplete
						id="lastname"
						label="اسم الأسرة"
						className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
						inputDir="rtl"
					></AutoComplete>
				</div>
				<AutoComplete
					id="phonenumber"
					label=" رقم الهاتف (WhatsApp)"
					className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
					type="phonenumber"
					labelDir="rtl"
					inputDir="ltr"
					inputAlign="text-right"
				></AutoComplete>
				<AutoComplete
					id="location"
					label="الموقع"
					className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
					optionClassName="w-full h-full bg-white p-1 hover:brightness-90"
					placeholder="يرجى أختيار البلد"
					inputDir="rtl"
					options={locations.map((x) => x.name)}
					onInput={(value) => {
						setCityOptions(
							locations.find((x) => x.name == value)?.regions ?? []
						);
					}}
				/>
				<AutoComplete
					id="region"
					label="المقاطعة"
					className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
					optionClassName="w-full h-full bg-white p-1 hover:brightness-90"
					placeholder="يرجى أختيار المقاطعة/المدينة"
					inputDir="rtl"
					options={cityOptions}
				/>
				<AutoComplete
					id="address"
					label="العنوان"
					className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
					placeholder="المدينة, المنطقة, الشارع, رقم المبنى"
					inputDir="rtl"
				></AutoComplete>
			</div>
			<div dir="rtl" className="flex flex-col gap-1 text-xs text-zinc-500">
				<span>*سيتم التواصل معك عن طريق الـ WhatsApp للتأكد من العنوان</span>
				<span>*التوصيل مجاني لجميع دول الخليج</span>
				<span>*يتم الدفع عند التوصيل</span>
			</div>
			<SubmitButton className="w-full bg-primary p-1 rounded-md drop-shadow-lg hover:brightness-90 disabled:brightness-90">
				شراء
			</SubmitButton>
		</form>
	);
}
