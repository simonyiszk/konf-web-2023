const aspectRatio = require("@tailwindcss/aspect-ratio");
const lineClamp = require("@tailwindcss/line-clamp");
const {
	fontFamily,
	transitionTimingFunction,
} = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,tsx,scss,mdx}"],
	theme: {
		extend: {
			animation: {
				text: "text 3s ease infinite",
			},
			keyframes: {
				text: {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
			},
			transitionTimingFunction: {
				DEFAULT: transitionTimingFunction.out,
			},
			fontFamily: {
				mona: ["Mona Sans", ...fontFamily.sans],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"hero-pattern": "url('/assets/bg/pattern.svg')",
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
	plugins: [aspectRatio, lineClamp],
};
