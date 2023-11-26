"use client";

import { locations } from "@/lib/Utils/locationUtils";
import AutoComplete from "./AutoComplete";
import { useState } from "react";

export default function CheckoutForm() {
	const [cityOptions, setCityOptions] = useState<string[]>([]);

	return (
		<div className="flex flex-col flex-[2_2_auto] items-end gap-3">
			<span className="text-primarytext text-3xl font-bold text-right w-full h-10">
				تفاصيل العنوان
			</span>
			<AutoComplete
				label="الموقع"
				className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
				optionClassName="w-full h-full bg-white p-1 hover:brightness-90"
				placeholder="يرجى أختيار البلد"
				options={locations.map((x) => x.name)}
				onInput={(value) => {
					setCityOptions(locations.find((x) => x.name == value)?.regions ?? []);
				}}
			/>
			<AutoComplete
				label="المقاطعة"
				className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
				optionClassName="w-full h-full bg-white p-1 hover:brightness-90"
				placeholder="يرجى أختيار المقاطعة/المدينة"
				options={cityOptions}
			/>
			<AutoComplete
				label="العنوان"
				className="w-full h-10 rounded-sm placeholder:text-right text-black text-right bg-white shadow"
				placeholder="المدينة, الشارع, رقم المبنى"
			></AutoComplete>
		</div>
	);
}
