export function isEmailValid(email: string) {
	const emailRegex =
		/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

	if (!email || email.length > 254) {
		return false;
	}

	var valid = emailRegex.test(email);
	if (!valid) {
		return false;
	}

	var parts = email.split("@");
	if (parts[0].length > 64) return false;

	var domainParts = parts[1].split(".");
	if (
		domainParts.some(function (part) {
			return part.length > 63;
		})
	) {
		return false;
	}

	return true;
}

export function getNextYear() {
	const date = new Date();
	return date.setFullYear(date.getFullYear() + 1);
}

export function sortClothingSizes(sizeA: string, sizeB: string) {
	const order = [
		"3XS",
		"2XS",
		"XS",
		"S",
		"M",
		"L",
		"XL",
		"2XL",
		"3XL",
		"4XL",
		"5XL",
		"6XL",
		"7XL",
		"8XL",
		"9XL",
	];

	return order.indexOf(sizeA) - order.indexOf(sizeB);
}
