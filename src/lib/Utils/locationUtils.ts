type Location = {
	name: string;
	code: string;
	currency: string;
	countryCode: string;
	regions: string[];
};

export const locations: Location[] = [
	{
		name: "الإمارات",
		code: "ae",
		currency: "AED",
		countryCode: "+971",
		regions: [
			"أبو ظبي",
			"عجمان",
			"الشارقة",
			"دبي",
			"الفجيرة",
			"رأس الخيمة",
			"أم القيوين",
		],
	},
	{
		name: "البحرين",
		code: "bh",
		currency: "BHD",
		countryCode: "+973",
		regions: ["العاصمة", "الشمالية", "الجنوبية", "المحرق"],
	},
	{
		name: "السعودية",
		code: "sa",
		currency: "SR",
		countryCode: "+966",
		regions: [
			"الرياض",
			"مكة",
			"المنطقة الشرقية",
			"المدينة",
			"الباحة",
			"الجوف",
			"الحدود الشمالية",
			"القصيم",
			"حائل",
			"تبوك",
			"'عسير",
			"جازان",
			"نجران",
		],
	},
	{
		name: "عمان",
		code: "om",
		currency: "OMR",
		countryCode: "+968",
		regions: [
			"الداخلية",
			"الظاهرة",
			"شمال الباطنة",
			"جنوب الباطنة",
			"البريمي",
			"الوسطى",
			"شمال الشرقية",
			"جنوب الشرقية",
			"ظفار",
			"مسقط",
			"مسندم",
		],
	},
	{
		name: "قطر",
		code: "qa",
		currency: "QR",
		countryCode: "+974",
		regions: [
			"الدوحة",
			"الريان",
			"أم صلال",
			"الخور والذخيرة",
			"الوكرة",
			"الضعاين",
			"الشمال",
			"الشحانية",
		],
	},
	{
		name: "الكويت",
		code: "kw",
		currency: "KWD",
		countryCode: "+965",
		regions: [
			"الأحمدي",
			"العاصمة",
			"الفروانية",
			"حولي",
			"الجهراء",
			"مبارك الكبير",
		],
	},
];

export const countryToLocation: {
	[id: string]: { loc: Location } | undefined;
} = {
	ae: { loc: locations[0] },
	bh: { loc: locations[1] },
	sa: { loc: locations[2] },
	om: { loc: locations[3] },
	qa: { loc: locations[4] },
	kw: { loc: locations[5] },
};

export function localizePrice(price: number, country: string) {
	return `${countryToLocation[country]?.loc.currency ?? ""}${price.toFixed(2)}`;
}

export function localizePrices(prices: number[], country: string) {
	return `${countryToLocation[country]?.loc.currency ?? ""}${prices
		.reduce((acc, x) => acc + x, 0)
		.toFixed(2)}`;
}
