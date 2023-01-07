import "@/styles/global.scss";

import type { AppProps } from "next/app";
import React from "react";

export default function KonfApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<Component {...pageProps} />
		</React.StrictMode>
	);
}
