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
				mona: ["Mona Sans", ...fontFamily.sans],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			colors: {
				konf: {
					primary: {
						blue: "#42B4E5",
						green: "#77B16A",
						white: "#ffffff",
					},
					accent: {
						yellow: "#FFD73A",
					},
					overlay: {
						blue: "#122538",
					},
					background: {
						blue: "#001429",
						"white-lowOpacity": "rgba(255, 255, 255, 0.07000000029802322)",
					},
				},
			},
		},
	},
	plugins: [aspectRatio],
};
