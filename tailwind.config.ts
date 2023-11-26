import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			backgroundClip: {
				text: "text",
			},
			colors: {
				primary: "#336A6D",
				secondary: "#ECECEC",
				primarytext: "#145654",
				secondarytext: "#909090",
			},
			boxShadow: {
				inside: "inset 0px 0px 10px rgb(0 0 0 / 0.05)",
			},
		},
	},
	variants: {
		extend: {
			backgroundImage: ["hover", "focus"],
			backgroundClip: ["hover", "focus"],
		},
	},
	plugins: [],
};
export default config;
