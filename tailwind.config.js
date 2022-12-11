const aspectRatio = require("@tailwindcss/aspect-ratio");
const {
	fontFamily,
	transitionTimingFunction,
} = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,tsx,scss,mdx}"],
	theme: {
		extend: {
			transitionTimingFunction: {
				DEFAULT: transitionTimingFunction.out,
			},
			fontFamily: {
				mona: ["var(--font-mona)", ...fontFamily.sans],
			},
		},
	},
	plugins: [aspectRatio],
};
