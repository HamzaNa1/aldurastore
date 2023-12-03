import "server-only";

export type Language = "ar" | "en";

const dictionaries = {
	ar: () => import("./dictionaries/ar.json").then((module) => module.default),
	en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Language) => dictionaries[locale]();
