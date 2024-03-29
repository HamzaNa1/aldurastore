export interface ProductViewDict {
	showProduct: string;
}

export interface AddToCartFormDict {
	size: string;
	cart: string;
	nostock: string;
}

export interface LoginFormDict {
	email: string;
	password: string;
	login: string;
	toast: string;
	error: string;
}

export interface RegisterFormDict {
	username: string;
	email: string;
	password: string;
	register: string;
	invalidEmail: string;
	invalidPassowrd: string;
	emailUsed: string;
}

export interface ConfirmFormDict {
	code: string;
	confirm: string;
}

export interface CheckoutFormDict {
	name: string;
	lastName: string;
	phoneNumber: string;
	location: string;
	locationLabel: string;
	region: string;
	regionLabel: string;
	area: string;
	areaLabel: string;
	address: string;
	addressLabel: string;
	lable1: string;
	label2: string;
	label3: string;
	buy: string;
	fail: string;
}

export interface MenuDict {
	home: string;
	products: string;
	aldurastore: string;
}

export interface CountryDict {
	currencies: string;
}

interface CartTableDict {
	product: string;
	size: string;
	price: string;
	nostock: string;
}

export interface InitialCountrySelectorDict {
	select: string;
}
