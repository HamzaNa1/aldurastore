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
};

export function localizePrice(price: number, country: string) {
	return `${currencies[country] ?? ""} ${price.toFixed(2)}`;
}

export function localizePrices(prices: number[], country: string) {
	return `${currencies[country] ?? ""} ${prices
		.reduce((acc, x) => acc + x, 0)
		.toFixed(2)}`;
}
