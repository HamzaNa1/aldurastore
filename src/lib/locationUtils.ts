import { ProductPrice } from "./schema";

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

export function localizePrice(price: ProductPrice) {
	return `${currencies[price.country]} ${price.cost.toFixed(2)}`;
}

export function localizePrices(prices: ProductPrice[]) {
	if (prices.length == 0) {
		return "0.00";
	}

	return `${currencies[prices[0].country]} ${prices
		.reduce((acc, x) => acc + x.cost, 0)
		.toFixed(2)}`;
}
