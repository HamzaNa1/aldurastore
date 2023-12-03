import { Language } from "../languages/dictionaries";
import { Product } from "../schema";

export default function SetProductLanguage(
	product: Product,
	language: Language
) {
	if (language == "en") {
		product.name = product.nameEN ?? product.name;
		product.description = product.descriptionEN ?? product.description;
	}
}
