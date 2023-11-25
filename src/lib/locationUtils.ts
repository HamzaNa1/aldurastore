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
