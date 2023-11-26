export const countries = ["ae", "bh", "kw", "om", "qa", "sa"];
export const currencies: { [id: string]: string } = {
	ae: "AED",
	bh: "BHD",
	kw: "KWD",
	om: "OMR",
	qa: "QR",
	sa: "SR",
};

export const locations: { [id: string]: { regions: string[] } } = {
	ae: {
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
	bh: { regions: ["العاصمة", "الشمالية", "الجنوبية", "المحرق"] },
	kw: {
		regions: [
			"الأحمدي",
			"العاصمة",
			"الفروانية",
			"حولي",
			"الجهراء",
			"مبارك الكبير",
		],
	},
	om: {
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
	qa: {
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
	sa: {
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
};

export function localizePrice(price: number, country: string) {
	return `${currencies[country] ?? ""} ${price.toFixed(2)}`;
}

export function localizePrices(prices: number[], country: string) {
	return `${currencies[country] ?? ""} ${prices
		.reduce((acc, x) => acc + x, 0)
		.toFixed(2)}`;
}
