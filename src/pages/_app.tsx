import "@/styles/core.css";
import "@/styles/components.scss";
import "@/styles/utilities.css";
import "@/styles/global.scss";

import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import React from "react";

const monaSans = localFont({
	src: "../assets/fonts/Mona-Sans.woff2",
	variable: "--font-mona",
});

export default function KonfApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<div className={`${monaSans.variable} font-mona`}>
				<Component {...pageProps} />
			</div>
		</React.StrictMode>
	);
}
